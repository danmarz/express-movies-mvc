import Router from 'express';
import HttpError from 'http-errors';
const router = Router();

// router.all('/',(req,res)=>res.json({result:"no existe la ruta"}))
router.all('/',(req,res,next)=>next(HttpError(404,{message:"no existe la ruta"})));

export default router;