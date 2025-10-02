const express = require('express');
const router = express.Router();
const imageCtrl = require('../controllers/imageController');
const upload = require('../middlewares/multerConfig');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/addImage', authMiddleware, upload.single('image'), imageCtrl.createImage);
router.get('/getAllImage', imageCtrl.getAll);
router.get('/userGetAll',imageCtrl.userGetAll)
router.delete('/deleteImage/:id', authMiddleware, imageCtrl.deleteImage);
router.patch('/UpdateStatus/:id', authMiddleware, imageCtrl.updateStatus);


module.exports = router;