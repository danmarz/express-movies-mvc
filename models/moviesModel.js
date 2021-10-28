import connection from '../mysql/dbManager.js';

class MoviesModel {
    async getMovies() {
        try {
            const result = await connection.query(
                `select movie_id, title, poster, synopsis, genres, year, director, actors from movie;`
            )
            return result;
        } catch (error) {
            throw error;
        }
    }
    async getMovieById(id) {
        try {
            const result = await connection.query(
                'select movie_id, title, poster, synopsis, genres, year, director, actors from movie where movie_id = ?', [id]
            )
            return result;
        } catch (error) {
            throw error;
        }
    }
    async removeMovie(id) {
        try {
            const result = await connection.query(
                'delete from movie where movie_id = ?', [id]
            )
            return result;
        } catch (error) {
            throw error;
        }
    }
    async insertMovie(title, poster, synopsis, genres, year, director, actors) {
        try {
            const result = await connection.query(
                `INSERT INTO movie (title, poster, synopsis, genres, year, director, actors) VALUES (?, ?, ?, ?, ?, ?, ?)`, [title, poster, synopsis, genres, year, director, actors]
            )
            return result;
        } catch (error) {
            throw error;
        }
    }
}

export default new MoviesModel()