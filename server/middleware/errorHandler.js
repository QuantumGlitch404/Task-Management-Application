const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';

  // Mongoose duplicate key error
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    const details = Object.values(err.errors).map(e => e.message);
    return res.status(statusCode).json({
      success: false,
      error: 'Validation error',
      message: details[0],
      details
    });
  }

  // Mongoose cast error (bad ObjectId)
  if (err.name === 'CastError') {
    statusCode = 404;
    message = 'Resource not found';
  }

  res.status(statusCode).json({
    success: false,
    error: statusCode === 500 ? 'Server error' : 'Request error',
    message
  });
};

module.exports = errorHandler;
