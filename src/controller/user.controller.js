import db from '../db.js';

class UserController {
    async createUser(req, res) {
        const name = req.body.name
        const mail = req.body.mail
        const password = req.body.password
        const newUser = await db.query('INSERT INTO users (name, mail, password, count_following, count_follower, date_registration, profile_picture, is_performance) VALUES ($1, $2, $3, 0, 0, CURRENT_DATE, \'/profilePictures/defaultProfilePicture.png\', false) RETURNING *', [name, mail, password])
        res.json(newUser.rows[0])
    }
    async createApplication(req, res) {
        const id = req.body.id;
        const newApplication = await db.query('INSERT INTO performer_application (id_user, date_application) VALUES ($1, CURRENT_DATE) RETURNING *', [id]);
        res.json(newApplication.rows[0]);
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
        const id = req.body.id;
        const name = req.body.name;
        const mail = req.body.mail;
        const password = req.body.password;
        const user = await db.query('UPDATE users SET name = $1, mail = $2, password = $3 WHERE iduser = $4', [name, mail, password, id]);
        res.json('user is updated');
    }
    async updateUserPhoto(req, res) {
        const id = req.body.id;
        const photoName = req.body.photoName;
        const user = await db.query('UPDATE users SET profile_picture = $1  WHERE iduser = $2', [photoName, id]);
        res.json('photo updated');
    }
    async deleteUser(req, res) {
        const id = req.params.id;
        const user = await db.query('DELETE FROM users WHERE id = $1', [id]);
        res.json(user.rows[0]);
    }
    async addToFavourite(req, res) {
        const idUser = req.body.idUser;
        const idMusic = req.body.idMusic;
        const favourite = await db.query('INSERT INTO following_to_music (id_user, id_music, date_following) VALUES ($1, $2, CURRENT_DATE)', [idUser, idMusic]);
        res.json(favourite.rows[0])
    }
    async removeFromFavourite(req, res) {
        const idUser = req.params.user;
        const idMusic = req.params.music;
        const favourite = await db.query('DELETE FROM following_to_music WHERE id_user = $1 AND id_music = $2 RETURNING *', [idUser, idMusic])
        res.json(favourite.rows[0]);
    }
    async subToPerformer(req, res) {
        const idUser = req.body.idUser;
        const idPerformer = req.body.idPerformer;
        const subscribe = await db.query('INSERT INTO followings (id_follower, date_following, id_following) VALUES ($1, CURRENT_DATE, $2)', [idUser, idPerformer]);
        const update = await db.query('UPDATE users SET count_follower = count_follower + 1 WHERE iduser = $1 RETURNING count_follower', [idPerformer]);
        res.json(subscribe.rows[0]);
    }
    async unsubToPerformer(req, res) {
        const idUser = req.params.user;
        const idPerformer = req.params.performer;
        const subscribe = await db.query('DELETE FROM followings WHERE id_follower = $1 AND id_following = $2 RETURNING *', [idUser, idPerformer]);
        const update = await db.query('UPDATE users SET count_follower = count_follower - 1 WHERE iduser = $1', [idPerformer]);
        res.json(subscribe.rows[0]);
    }
    async getSubscribes(req, res) {
        const idUser = req.params.user;
        const idPerformer = req.params.performer;
        const subscribe = await db.query('SELECT followings.id_follower, followings.date_following, followings.id_following FROM followings WHERE id_follower = $1 AND id_following = $2', [idUser, idPerformer])
        res.json(subscribe.rows)
    }
    async getSubscribesToProfile(req, res) {
        const idUser = req.params.user;
        const subscribe = await db.query('SELECT followings.id_follower, followings.id_following, users.iduser, users.name, users.profile_picture FROM followings JOIN users on users.iduser = followings.id_following WHERE id_follower = $1', [idUser])
        res.json(subscribe.rows)
    }
}

export default new UserController();