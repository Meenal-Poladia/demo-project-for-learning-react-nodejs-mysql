import { db } from "../db.js";
// import jwt from "jsonwebtoken";

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
    response.json("from controller");
};

export const addPost = (request, response) => {
    response.json("from controller");
};

export const deletePost = (request, response) => {
    response.json("from controller");
};

export const updatePost = (request, response) => {
    response.json("from controller");
};


