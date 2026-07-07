const mongoose = require('mongoose');

async function connectDB() {
  try {
    if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI 未設定');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB 已連線');
  } catch (err) {
    console.error('❌ MongoDB 連線失敗', err);
    process.exit(1);
  }
}
module.exports = connectDB;
