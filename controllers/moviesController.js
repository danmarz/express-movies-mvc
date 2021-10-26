import moviesModel from '../models/moviesModel.js';
import HttpError from 'http-errors';

const getAllMovies = async (req, res) => {
    const movies = await moviesModel.getMovies();

    res.json(movies);
}

const getMovieById = async (req, res, next) => {
    if (!req.params.id)
        next(HttpError(400, { message: 'no parameter found' }));
    const id = req.params.id;
    const movie = await moviesModel.getMovieById(id);

    res.json(movie);
}

const removeMovie = async (req, res, next) => {
    const id = req.params.id;
    await moviesModel.removeMovie(id);

    res.status(200).json({ result: 'deleted successfully' });
}


export default {
    getAllMovies,
    getMovieById,
    removeMovie
}