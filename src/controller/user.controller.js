import db from '../db.js';

class UserController {
    async createUser(req, res) {
        const name = req.body.name
        const mail = req.body.mail
        const password = req.body.password
        const newUser = await db.query('INSERT INTO users (name, mail, password, count_following, count_follower, date_registration, profile_picture, is_performance) VALUES ($1, $2, $3, 0, 0, CURRENT_DATE, \'/profilePictures/defaultProfilePicture.png\', false) RETURNING *', [name, mail, password])
        res.json(newUser.rows[0])
    }
    async getUsers(req, res) {
        const users = await db.query('SELECT * FROM users');
        res.json(users.rows);
    }
    async getOneUser(req, res) {
        const id = req.params.id;
        const user = await db.query('SELECT * FROM users WHERE iduser = $1', [id]);
        res.json(user.rows[0]);
    }
    async checkUserAuthorization(req, res) {
        const username = req.params.username;
        const password = req.params.password;
        const user = await db.query('SELECT * FROM users WHERE name = $1 AND password = $2', [username, password]);
        res.json(user.rows[0]);
    }
    async updateUser(req, res) {

    }
    async deleteUser(req, res) {
        const id = req.params.id;
        const user = await db.query('DELETE FROM users WHERE id = $1', [id]);
        res.json(user.rows[0]);
    }
}

export default new UserController();