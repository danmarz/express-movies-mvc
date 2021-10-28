import moviesModel from '../models/moviesModel.js';
import HttpError from 'http-errors';

const getAllMovies = async (req, res, next) => {
    const movies = await moviesModel.getMovies();

    res.json(movies);
}

const getMovieById = async (req, res, next) => {
    if (!req.params.id)
        next(HttpError(400, { error: 'no movie ID provided' }));
    const id = req.params.id;
    const movie = await moviesModel.getMovieById(id);

    res.json(movie);
}

const removeMovie = async (req, res, next) => {
    const id = req.params.id;
    await moviesModel.removeMovie(id);

    res.status(200).json({ result: 'deleted successfully' });
}

const insertMovie = async (req, res, next) => {
    try {
        const body = req.body;
        const title = body.title ?? null
        const poster = body.poster ?? null
        const synopsis = body.synopsis ?? null
        const genres = body.genres ??  null
        const year = body.year ?? null
        const director = body.director ?? null
        const actors = body.actors ?? null

        if (title != null) {
            const response = await moviesModel.insertMovie(title, poster, synopsis, genres, year, director, actors)
            res.status(201).json({ result: `Movie title ${title} added successfully with ID '${response["insertId"]}'.` })

        } else res.status(400).json({ error: "title cannot be 'null.'" })

    } catch (error) {
        next(error)
    }
}
export default {
    getAllMovies,
    getMovieById,
    removeMovie,
    insertMovie
}