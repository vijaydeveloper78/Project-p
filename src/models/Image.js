const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  imageName: { type: String, required: true },
  fileName: { type: String, required: true },     
  fileUrl: { type: String, required: true },     
  category: { type: String, required: true },      
  instagramLink: { type: String },
  status: { type: String, enum: ['active','inactive'], default: 'active' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
}, { timestamps: true });

module.exports = mongoose.model('Image', imageSchema);
