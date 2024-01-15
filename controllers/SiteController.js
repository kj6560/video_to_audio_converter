const ffmpeg = require('ffmpeg');
const SiteController = {
    index: (req, res) => {
        return res.render('index', { "name": "keshav" });
    },

    uploadVideo: (req, res) => {

        return res.render('uploadVideo');
    },

    processVideo: (req, res) => {
        try {
            var msg = "";
            var done = req.query.done;
            if (done != 1) {
                var filename = req.query.file_name;
                var process = new ffmpeg('./uploads/' + filename);
                process.then(function (video) {
                    video.fnExtractSoundToMP3('./uploads/output_' + filename + '.mp3', function (error, file) {
                        if (!error) {
                            // Redirect to the same route with done=1 and output parameter
                            res.redirect('/processVideo?done=1&output=' + file);
                        } else {
                            console.log('Error extracting sound: ' + error);
                            // Handle the error appropriately, you might want to send an error response
                            res.status(500).send('Error processing video.');
                        }
                    });
                }, function (err) {
                    console.log('Error processing video: ' + err);
                    // Handle the error appropriately, you might want to send an error response
                    res.status(500).send('Error processing video.');
                });
            } else {
                var output = req.query.output;
                
                // If done is 1, render the view with the message
                //res.redirect('/downloadAudioFile?filename='+output);
                res.render('processVideo',output);
            }
        } catch (e) {
            console.log(e.code);
            console.log(e.msg);
            // Handle the error appropriately, you might want to send an error response
            res.status(500).send('Internal Server Error.');
        }
    }

}
module.exports = SiteController;