const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this';

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existing = await Admin.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Email exists' });
        const admin = await Admin.create({ name, email, password });
        res.json({ admin: { _id: admin._id, name: admin.name, email: admin.email } });
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
        const ok = await admin.comparePassword(password);
        if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, admin: { _id: admin._id, email: admin.email, name: admin.name } });
    } catch (err) { res.status(500).json({ message: err.message }); }
};
