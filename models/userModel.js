// import users from '../data/users.js';
import connection from '../mysql/dbManager.js';

class User {

    async login(username, password) {
        const result = await connection.query(
            `select check_user(?,?)`,
            [username, password])
        // return result[0]['check_user(?,?)'];
        return result;
    }

    async createUser(user) {
        try {
            const result = await connection.query(
                'call insert_user(?,?,?,@result)', [user.username, user.password, user.role], (err, rows) => { if (err) throw err }
            )
            return result;
        } catch (error) {
            throw error;
        }
    }
    async getUser(user) {
        try {
            return await connection.query(
                'select user_id from user where username = ?', [user.username]
            )
        } catch (error) {
            throw error;
        }
    }
}

export default new User();