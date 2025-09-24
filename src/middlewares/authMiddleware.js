const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const JWT_SECRET = process.env.JWT_SECRET || 'change_this';

module.exports = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'No token' });
    const token = auth.split(' ')[1];
    const payload = jwt.verify(token, JWT_SECRET);
    req.admin = await Admin.findById(payload.id).select('-password');
    if (!req.admin) return res.status(401).json({ message: 'Invalid token' });
    next();
  } catch (err) { res.status(401).json({ message: 'Unauthorized' }); }
};
