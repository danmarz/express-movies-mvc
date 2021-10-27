// import movies from '../data/movies.js';
import connection from '../mysql/dbManager.js';

class MoviesModel {
    async getMovies() {
        try {
            const result = await connection.query(
                `select movie_id, title, poster, synopsis, genres, year, director, actors from movie;`
            )
            return result;
        } catch (error) {

        }
    }
    async getMovieById(id) {
        try {
            const result = await connection.query(
                'select movie_id, title, poster, synopsis, genres, year, director, actors from movie where movie_id = ?', [id]
            )
            return result;
        } catch (error) {
            console.log(error);
        }
    }
    async removeMovie(id) {
        try {
            const result = await connection.query(
                'delete from movie where movie_id = ?', [id]
            )
            return result;
        } catch (error) {
            console.log(error);
        }
    }
}

export default new MoviesModel()