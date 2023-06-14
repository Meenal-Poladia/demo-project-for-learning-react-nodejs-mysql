import express from 'express';
import router from './routes/posts.js';

const app = express();

app.use(express.json());

app.use("/api/posts", router);

app.listen(8000, () => {
    console.log(`Connected`);
})