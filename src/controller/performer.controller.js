import db from '../db.js';

class PerformerController {
    async createPerformer(req, res) {

    }
    async getPerformers(req, res) {
        const performers = await db.query('SELECT * FROM users where is_performance = true')
        res.json(performers.rows);
    }
    async getOnePerformer(req, res) {
        const id = req.params.id;
        const performer = await db.query('SELECT * FROM users WHERE id = $1 AND is_performance = true', [id]);
        res.json(performer.rows[0]);
    }
    async updatePerformer(req, res) {

    }
    async deletePerformer(req, res) {
        const id = req.params.id;
        const performer = await db.query('DELETE FROM users WHERE id = $1 AND is_performance = true', [id]);
        res.json(performer.rows[0]);
    }
}

export default new PerformerController();