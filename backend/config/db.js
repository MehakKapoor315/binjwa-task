const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/commercial_real_estate'
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.error('Server will continue running but database operations will fail.');
    console.error('Make sure MongoDB is running on mongodb://127.0.0.1:27017');
  }
};

module.exports = connectDB;
