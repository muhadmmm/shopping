// server.js
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const Image = require('./models/Image');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/imageUpload', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), async (req, res) => {
    const { caption, price } = req.body;
    const imagePath = req.file.path;
    const image = new Image({ caption, price, imagePath });
    await image.save();
    res.send('Image uploaded successfully');
});

app.get('/images', async (req, res) => {
    const images = await Image.find();
    res.json(images);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
