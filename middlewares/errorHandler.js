import HttpError from "http-errors"

const clientErrorHandler = (error,req,res,next)=>{
    if(error instanceof HttpError.HttpError)
        res.status(error.statusCode).json({ERROR: error.message})

    next(error);
}


export default clientErrorHandler;
