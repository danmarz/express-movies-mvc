import Router from 'express';
import moviesController from '../controllers/moviesController.js';
import authHandler from '../middlewares/authHandler.js';
const router = Router();

// router.use(authHandler.authUser);

router.route('/')
         .get(moviesController.getAllMovies)
         .delete(moviesController.removeMovie)
        //  .post(moviesController.insertMovie)

 router.route('/:id')
         .get(moviesController.getMovieById)
//         .put(moviesController.updateMovie)
//         .delete(moviesController.deleteMovi)

// movieRoutes.get('/', moviesController.getAllMovies);
// movieRoutes.post('U')
export default router;