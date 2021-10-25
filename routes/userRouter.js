import Router from 'express';
import userController from '../controllers/userController.js';
import authHandler from '../middlewares/authHandler.js';

const router = Router();


// router.use('/register',authHandler.encryptPassword);

router.route('/register')
      .post(authHandler.encryptPassword)
      .post(userController.register);

router.route('/login')
       .post(userController.login);      

export default router;