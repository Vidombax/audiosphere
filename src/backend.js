import express from 'express';
import multer from 'multer';
import path from 'path';
import userRouter from './routes/user.route.js';
import tagRouter from './routes/tag.route.js';
import performerRoute from "./routes/performer.route.js";
import settingsRoute from "./routes/settings.route.js";
import musicRoute from "./routes/music.route.js";
import albumRoute from "./routes/album.route.js";

const app = express()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/profilePictures');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const storagePlaylist = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/albumPictures');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const uploadPlaylist = multer({ storage: storagePlaylist });

app.use(express.json())

app.use('/', userRouter)
app.use('/', tagRouter)
app.use('/', performerRoute)
app.use('/', settingsRoute)
app.use('/', musicRoute)
app.use('/', albumRoute)

app.post('/upload-photo', upload.single('file'), (req, res) => {
    res.json({ filename: req.file.filename });
});

app.post('/upload-photo-playlist', uploadPlaylist.single('file'), (req, res) => {
    res.json({ filename: req.file.filename });
});

const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
