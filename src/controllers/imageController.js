const Image = require('../models/Image');
const path = require('path');
const fs = require('fs');

exports.createImage = async (req, res) => {
  try {
    const { imageName, category, instagramLink } = req.body;
    if (!req.file) return res.status(400).json({ message: 'Image required' });

    const fileName = req.file.filename;
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${fileName}`;

    const image = await Image.create({
      imageName, category, instagramLink, fileName, fileUrl, status: 'inactive', createdBy: req.admin._id
    });
    res.json(image);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

  
exports.deleteImage = async (req, res) => {
  try {
    const img = await Image.findById(req.params.id);
    if (!img) return res.status(404).json({ message: 'Not found' });
 
    const filePath = path.join(__dirname, '../../uploads', img.fileName);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
 
    await img.deleteOne(); 

    res.json({ success: true, message: 'Image deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
 

exports.updateStatus = async (req, res) => {
  try {
    const { status, category } = req.body;

    if (status && !['active', 'inactive'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    // Build the update object dynamically
    const updateData = {};
    if (status) updateData.status = status;
    if (category) updateData.category = category;
 
    const img = await Image.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!img) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.json(img);
  } catch (err) {
    console.error('Error updating image:', err);
    res.status(500).json({ message: err.message });
  }
};


exports.getAll = async (req, res) => {
  const { category, status, page = 1, limit = 50 } = req.query;
  const query = {};
  if (category) query.category = category;
  if (status) query.status = status;
  const images = await Image.find(query).sort({ createdAt: -1 }).skip((page-1)*limit).limit(parseInt(limit));
  res.json(images);
};



exports.userGetAll = async (req, res) => {
  const { category, status, page = 1, limit = 50 } = req.query;
  const query = {};
  if (category) query.category = category;
  if (status) query.status = status;
  const images = await Image.find(query).sort({ createdAt: -1 }).skip((page-1)*limit).limit(parseInt(limit));
  res.json(images);
};
