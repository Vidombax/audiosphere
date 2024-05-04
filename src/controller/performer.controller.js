import db from '../db.js';

class PerformerController {
    async createPerformer(req, res) {

    }
    async getSubPerformers(req, res) {
        const performers = await db.query('SELECT * FROM users where is_performance = true LIMIT 4')
        res.json(performers.rows);
    }
    async getPopularPerformers(req, res) {
        const performers = await db.query('SELECT * FROM users where is_performance = true ORDER BY users.count_follower LIMIT 4')
        res.json(performers.rows);
    }
    async getNewPerformers(req, res) {
        const performers = await db.query('SELECT * FROM users WHERE is_performance = true AND ' +
            'EXTRACT(MONTH FROM date_registration) = EXTRACT(MONTH FROM CURRENT_DATE) ' +
            'ORDER BY iduser DESC LIMIT 4');
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