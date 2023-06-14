import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
    const query = "SELECT * FROM users WHERE username = ?";

    db.query(query, [request.body.username], (err, data) => {
        if (err) return response.status(500).json(err);
        if (data.length === 0) return response.status(404).json("User not found!");

        //Check password
        const isPasswordCorrect = bcrypt.compareSync(
            request.body.password,
            data[0].password
        );

        if (!isPasswordCorrect)
            return response.status(400).json("Wrong username or password!");

        const token = jwt.sign({ id: data[0].id }, "jwtkey");
        const { password, ...other } = data[0];

        response
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json(other);
    });
};

export const logout = (request, response) => {

};