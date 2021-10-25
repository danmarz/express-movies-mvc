// import users from '../data/users.js';
import MySqlManager from '../mysql/dbManager.js';

class User{

    login(user){
        MySqlManager._createConnection.query(
            `select check_user(?,?)`,
            [user.username, user,password])
    }
    

    createUser(user){

        connection.query(
            `call insert_user(?,?,?)`,
            [user,password,role] 
        )
        users.push(user);
        return users.find(element => element.username == user.username);
    }
    getUser(user){
        return users.find(element => (element.username == user.username))
    }
}

export default new User();