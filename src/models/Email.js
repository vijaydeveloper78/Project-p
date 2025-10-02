import  mongoose from 'mongoose';
import  dotenv from 'dotenv';
dotenv.config();

const emailSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
}, { timestamps: true });
const Email = mongoose.model('Email', emailSchema);
module.exports = { Email };
