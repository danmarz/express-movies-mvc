import HttpError from "http-errors"

export const clientErrorHandler = (error,req,res,next)=>{
    if(error instanceof HttpError.HttpError)
        res.status(error.statusCode).json({ERROR: error.message})
    next(error);
}

export const dbErrorHandler = (error,req,res,next)=>{
    if(error.sqlMessage == "Username already exists")
        res.status(500).json({ "db error": "User already exists in the database" })
    next(error);
}

export const genericErrorHandler = (error, req, res, next)=>{
    res.status(500).json("Generic error" + error.message)
}