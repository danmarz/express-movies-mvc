import Router from 'express';
import userController from '../controllers/userController.js';

const router = Router();

router.route('/register')
      .post(userController.register);

router.route('/login')
      .post(userController.login);

export default router;