const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// CORS - allow local dev and any Vercel deployment
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://taskly-ebon.vercel.app',
  /\.vercel\.app$/
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow curl/postman
    const isAllowed =
      allowedOrigins.some(o =>
        typeof o === 'string' ? o === origin : o.test(origin)
      );
    isAllowed ? callback(null, true) : callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);

// Health check
app.get('/api/v1/health', (req, res) => {
  res.json({ success: true, message: 'TaskFlow API is running' });
});

// Error handler
app.use(errorHandler);

// Connect to DB then start server (local dev only)
connectDB().then(() => {
  if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5005;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
});

// Export for Vercel serverless
module.exports = app;
