import db from '../db.js';

class TagController {
    async createTag(req, res) {

    }
    async getTags(req, res) {
        const tags = await db.query('SELECT * FROM tags')
        res.json(tags.rows);
    }
    async getOneTag(req, res) {
        const id = req.params.id;
        const tag = await db.query('SELECT * FROM tags WHERE id = $1', [id]);
        res.json(tag.rows[0]);
    }
    async updateTag(req, res) {

    }
    async deleteTag(req, res) {
        const id = req.params.id;
        const tag = await db.query('DELETE FROM tags WHERE id = $1', [id]);
        res.json(tag.rows[0]);
    }
}

export default new TagController();