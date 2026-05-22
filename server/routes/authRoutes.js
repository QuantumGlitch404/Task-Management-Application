const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { register, login, getProfile } = require('../controllers/authController');
const protect = require('../middleware/auth');

router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required')
      .isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters'),
    body('email').trim().isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('confirmPassword').notEmpty().withMessage('Confirm password is required')
  ],
  register
);

router.post(
  '/login',
  [
    body('email').trim().isEmail().withMessage('Please enter a valid email'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  login
);

router.get('/profile', protect, getProfile);

module.exports = router;
