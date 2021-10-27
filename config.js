const env = process.env;

export const config = {

    db:{
        host: env.DB_HOST || 'localhost',
        user: env.DB_USER || 'root',
        password: env.DB_PASSWORD || 'password',
        database: env.DB_NAME || 'mydb',
        // Changed default mysql connection port from 3306 to 33061
        port: 33061
    }

}