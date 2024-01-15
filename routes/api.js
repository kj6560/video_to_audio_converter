// routes/web.js
const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });
// Define web routes
router.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});

router.get('/about', (req, res) => {
  res.send('About page');
});

router.post('/upload', upload.single('file'), (req, res) => {
  console.log('File uploaded:', req.file);
  res.status(200).json({ message: 'File uploaded successfully!' });
});

module.exports = router;
