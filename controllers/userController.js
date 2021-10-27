import HttpError from "http-errors";
import userModel from "../models/userModel.js";
import authHandler from "../middlewares/authHandler.js";

const register = async (req, res, next) => {

    try {
        const body = req.body;

        if (!body.username || !body.password) {
            next(HttpError(400, { message: 'Error en los parámetros de entrada' }))
        } else {
            const user = { username: body.username, password: body.password, role: body.role };

            const result = await userModel.createUser(user);
            res.status(201).json({ result: "user ID '" + result[0][0]["user_id"] + "' created successfully" });
        }
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {

    try {
        const body = await req.body;

        if (!body.username || !body.password) {
            next(HttpError(400, { message: 'Error en los parámetros de entrada' }))
        } else {
            const result = await userModel.login(body.username, body.password)
            if (result === 1) {
                const token = await authHandler.generateToken(body.username);
                res.status(200).json({ token: token });
            }
            else {
                next(HttpError(401, { message: 'Username or Password incorrect' }));
            }
        }
    }
    catch (error) {
        next(error);
    }
}

export default {
    register,
    login
}