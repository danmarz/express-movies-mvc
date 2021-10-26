// import users from '../data/users.js';
import connection from '../mysql/dbManager.js';
import HttpError from "http-errors";

class User {

    async login(username, password) {
        const result = await connection.query(
            `select check_user(?,?)`,
            [username, password])
        return result[0]['check_user(?,?)'];
    }

    async createUser(user) {
        try {
            const result = await connection.query(
                // `call insert_user(?, ?,'user',@result); select @result;`, [user.username, user.password], (err,rows) => {
                //     if(err) throw err;
                //     console.log(rows);
                // }
                'call insert_user(?,?,?,@result)', [user.username, user.password, user.role], (err, rows) => { throw err }
            )
            return result;
        } catch (error) {
            console.log(error);
        }
        //     connection.query(
        //         `call insert_user(?,?,?)`,
        //         [user,password,role] 
        //     )
        //     users.push(user);
        //     return users.find(element => element.username == user.username);
    }
    async getUser(user) {
        return await connection.query(
            'select user_id from user where username = ?', [user.username]
        )
    }
}

export default new User();