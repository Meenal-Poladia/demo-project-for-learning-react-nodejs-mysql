import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (request, response) => {
    const q = request.query.cat
        ? "SELECT * FROM posts WHERE cat=?"
        : "SELECT * FROM posts";

    db.query(q, [request.query.cat], (err, data) => {
        if (err) return response.status(500).send(err);

        return response.status(200).json(data);
    });
};

export const getPost = (request, response) => {
    const q =
        "SELECT p.id, `username`, `title`, `description`, p.image, u.image AS userImage, `date`,`cat` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";

    db.query(q, [request.params.id], (err, data) => {
        if (err) return response.status(500).json(err);

        return response.status(200).json(data[0]);
    });
};

export const addPost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const postId = req.params.id;
        const q =
            "UPDATE posts SET `title`=?,`description`=?,`image`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";

        const values = [req.body.title, req.body.description, req.body.image, req.body.cat];

        db.query(q, [...values, postId, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("Post has been updated.");
        });
    });
};

export const deletePost = (request, response) => {
    const token = request.cookies.access_token;
    if (!token) return response.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return response.status(403).json("Token is not valid!");

        const postId = request.params.id;
        const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

        db.query(q, [postId, userInfo.id], (err, data) => {
            if (err) return response.status(403).json("You can delete only your post!");

            return response.json("Post has been deleted!");
        });
    });
};

export const updatePost = (request, response) => {
    response.json("from controller");
};


