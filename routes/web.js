// routes/web.js
const express = require('express');
const SiteController = require('../controllers/SiteController');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const trimmedFilename = file.originalname.trim().replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, trimmedFilename);
  },
});
const upload = multer({ storage: storage });
// Define web routes
// router.get('/', (req, res) => {
//   SiteController.index(req, res);
// });

router.get('/about', (req, res) => {
  res.send('About page');
});
router.get('/', (req, res) => {
  SiteController.uploadVideo(req, res);
});
router.post('/upload', upload.single('file'), (req, res) => {
  res.redirect(`/processVideo?file_name=${req.file.filename}`);
});
router.get('/processVideo', (req, res) => {
  SiteController.processVideo(req, res);
});

router.get('/downloadAudioFile', (req, res) => {
  var filename = req.query.filename;
  const filePath = path.join( filename);
  console.log(filePath);
  // Set the appropriate headers for a downloadable file
  res.setHeader('Content-Type', 'audio/mpeg');
  res.setHeader('Content-Disposition', 'attachment; filename='+filename);

  // Create a read stream from the file and pipe it to the response
  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
  
});
module.exports = router;
