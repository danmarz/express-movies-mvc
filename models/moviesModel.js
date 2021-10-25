// import movies from '../data/movies.js';
import connection from '../mysql/dbManager.js';

class MoviesModel{
    async getMovies(){
        try {
            const result = await connection.query(
                `select * from movie`
            )
            return result;
        } catch (error) {
            
        }
        // return movies;        
    }
    async getMovieById(id){
        try {
            const result = await connection.query(
                'select * from movie where movie_id = ?', [id]
            )
            return result;
        } catch (error) {
            console.log(error);
        }
        // return movies.find(element => element.id ==id);
    }
    async removeMovie(id){
        try {
            const result = await connection.query(
                
            )
        } catch (error) {
            console.log(error);
        }
        // const index = movies.findIndex(element => element.id ==id);
        // movies.splice(index,1);
        // return;
    }
}

export default new MoviesModel()