import Router from 'express';
import moviesController from '../controllers/moviesController.js';
const router = Router();


router.route('/')
        .get(moviesController.getAllMovies)
        .post(moviesController.insertMovie)

router.route('/:id')
        .get(moviesController.getMovieById)
        .delete(moviesController.removeMovie)
//         .put(moviesController.updateMovie)
//         .delete(moviesController.deleteMovi)

// movieRoutes.get('/', moviesController.getAllMovies);
export default router;