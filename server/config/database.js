const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Atlas Connection Error: ${error.message}`);
    console.log('Falling back to local in-memory database for immediate testing...');
    
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      
      const conn = await mongoose.connect(mongoUri);
      console.log(`MongoDB Memory Server Connected: ${conn.connection.host}`);
      console.log('NOTE: Data will be lost when the server restarts since this is an in-memory fallback.');
    } catch (fallbackError) {
      console.error(`MongoDB Memory Server Error: ${fallbackError.message}`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
