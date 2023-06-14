import { db } from "../db.js";
import bcrypt from "bcryptjs";

export const register = (request, response) => {
    const query = "SELECT * FROM users WHERE email = ? OR username = ?";

    db.query(query, [request.body.email, request.body.username], (err, data) => {
        if (err) return response.status(500).json(err);
        if (data.length) return response.status(409).json("User already exists!");

        //Hash the password and create a user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(request.body.password, salt);

        const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
        const values = [request.body.username, request.body.email, hash];

        db.query(q, [values], (err, data) => {
            if (err) return response.status(500).json(err);
            return response.status(200).json("User has been created.");
        });
    });
};

export const login = (request, response) => {

};

export const logout = (request, response) => {

};