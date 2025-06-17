// db.js or inside index.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    
    await mongoose.connect('mongodb+srv://root:jenish@cluster0.2p5ehnu.mongodb.net/crud', {

    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
