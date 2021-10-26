import HttpError from "http-errors";
import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import authHandler from "../middlewares/authHandler.js";

// const checkUserPassword = (req,res)

// const encrypt = (password)=>{
//     const saltRounds = 10;

//     return bcrypt.hash(password, saltRounds)
// }

const register = async (req, res, next) => {

    try {
        const body = req.body;

        if (!body.username || !body.password) {
            next(HttpError(400, { message: 'Error en los parámetros de entrada' }))
        } else {

            // const passwordHash = await encrypt(body.password);

            const user = { username: body.username, password: body.password, role: body.role };

            const result = await userModel.createUser(user);
            if (result != undefined) {
                res.status(201).json({ result: 'user created successfully' });
            } else next(HttpError(400, { message: 'username already exists' }))
        }

    } catch (error) {
        next(error);
    }



}

const login = async (req, res, next) => {

    try {
        const body = await req.body;

        if (!body.username || !body.password) {
            next(HttpError(400, { message: 'Error en los parámetros de entrada' }))
        } else {
            // const user_id = await userModel.getUser({ username: body.username });
            const result = await userModel.login(body.username, body.password)
            // const passwordCorrect = await bcrypt.compare(body.password, result.password);
            if ( result === 1) {
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