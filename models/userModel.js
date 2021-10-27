import connection from '../mysql/dbManager.js';

class User {

    async login(username, password) {
        const result = await connection.query(
            `select check_user(?,?)`,
            [username, password])
        return result;
    }

    async createUser(user) {
        try {
            const result = await connection.query(
                'call insert_user(?,?,?)', [user.username, user.password, user.role], (err, rows) => { if (err) throw err }
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