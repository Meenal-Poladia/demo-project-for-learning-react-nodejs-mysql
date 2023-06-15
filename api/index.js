import express from 'express';
import cookieParser from "cookie-parser";
import multer from "multer";

import postRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

const uploads = multer({dest: "./uploads/"})

app.post('/api/upload', uploads.single('file'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    res.status(200).json("'Image has been uploaded");
})

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postRoutes);

app.listen(8000, () => {
    console.log(`Connected`);
})