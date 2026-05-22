const Task = require('../models/Task');
const { validationResult } = require('express-validator');

// @desc    Get all tasks for logged-in user
// @route   GET /api/v1/tasks
const getTasks = async (req, res, next) => {
  try {
    const { status, priority, category, search, sort, order, page = 1, limit = 10 } = req.query;

    const query = { createdBy: req.user._id };

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const sortObj = {};
    if (sort) {
      sortObj[sort] = order === 'asc' ? 1 : -1;
    } else {
      sortObj.createdAt = -1;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Task.countDocuments(query);
    const tasks = await Task.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: total,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      data: { tasks }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single task
// @route   GET /api/v1/tasks/:id
const getTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, createdBy: req.user._id });

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Not found',
        message: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { task }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create task
// @route   POST /api/v1/tasks
const createTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        message: errors.array()[0].msg,
        details: errors.array().map(e => e.msg)
      });
    }

    const task = await Task.create({
      ...req.body,
      createdBy: req.user._id,
      completed: req.body.status === 'Completed'
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: { task }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update task
// @route   PUT /api/v1/tasks/:id
const updateTask = async (req, res, next) => {
  try {
    let task = await Task.findOne({ _id: req.params.id, createdBy: req.user._id });

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Not found',
        message: 'Task not found'
      });
    }

    if (req.body.status === 'Completed') {
      req.body.completed = true;
    } else if (req.body.status && req.body.status !== 'Completed') {
      req.body.completed = false;
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: { task }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete task
// @route   DELETE /api/v1/tasks/:id
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, createdBy: req.user._id });

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Not found',
        message: 'Task not found'
      });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get task statistics
// @route   GET /api/v1/tasks/stats
const getTaskStats = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfToday = new Date(startOfToday);
    endOfToday.setDate(endOfToday.getDate() + 1);

    const [total, pending, inProgress, completed, overdue, dueToday] = await Promise.all([
      Task.countDocuments({ createdBy: userId }),
      Task.countDocuments({ createdBy: userId, status: 'Pending' }),
      Task.countDocuments({ createdBy: userId, status: 'In Progress' }),
      Task.countDocuments({ createdBy: userId, status: 'Completed' }),
      Task.countDocuments({
        createdBy: userId,
        status: { $ne: 'Completed' },
        dueDate: { $lt: now, $ne: null }
      }),
      Task.countDocuments({
        createdBy: userId,
        dueDate: { $gte: startOfToday, $lt: endOfToday }
      })
    ]);

    res.status(200).json({
      success: true,
      data: { total, pending, inProgress, completed, overdue, dueToday }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTasks, getTask, createTask, updateTask, deleteTask, getTaskStats };
