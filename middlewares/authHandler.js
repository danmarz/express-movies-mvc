import HttpError from "http-errors";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";



const encryptPassword = async (req, res, next) => {
    try {
        const saltRounds = 10;

        const passwordHash = await bcrypt.hash(req.body.password, saltRounds);
        req.body.password = passwordHash;
        // console.log(passwordHash);
        next();
    } catch (error) {
        next(error);
    }
}

// const decryptPassword = async (req, res, next) => {
//     try {
//         const passwordCorrect = await bcrypt.compare(req.body.password, user.password)
//         if(passwordCorrect){
//             next()
//         }
//     }
//     catch(error){
//         next(error);
//     }

const getTokenFrom = request => {
    const authorization = request.get('authorization');

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        
        return authorization.substring(7);
    } else {
        return null;
    }
}


const tokenVerify = token => jwt.verify(token, process.env.SECRET);

const authUser = async (req, res, next) => {

    const token = getTokenFrom(req);

    const decodedToken = await tokenVerify(token);

    if (!token || !decodedToken.username) {
        next(HttpError(401, { message: 'token invalid or missing' }))
    } else {
        const user = userModel.getUser({username:decodedToken.username});
        user === undefined ? next(HttpError(401, { message: 'El token no es correcto' })) :
            next();
    }

}

const generateToken = username => {

    return jwt.sign({username: username},process.env.SECRET);
  

}


export default {
    authUser,
    encryptPassword,
    generateToken
};