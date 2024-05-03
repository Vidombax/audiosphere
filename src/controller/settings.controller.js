import db from '../db.js';

class SettingsController {
    async getOneUserSettings(req, res) {
        const id = req.params.id;
        const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        res.json(user.rows[0]);
    }
    async updateUserSettings(req, res) {

    }
    async deleteUserProfilePicture(req, res) {

    }
}

export default new SettingsController();