import moviesModel from '../models/moviesModel.js';
import HttpError from 'http-errors';

const getAllMovies = async (req,res) =>{
    const movies = await moviesModel.getMovies();
    res.json(movies);
}

const getMovieById = (req,res,next)=>{
    if(!req.params.id)
        next(HttpError(400,{message:'no parameter found'}));
    const id = req.params.id;

    const movie = moviesModel.getMovieById(id);
    res.json(movie);
}

const removeMovie = (req,res,next)=>{
    const id = req.body.id;

    moviesModel.removeMovie(id);
    res.json({result:'ok'});
}


export default {
    getAllMovies,
    getMovieById,
    removeMovie
}