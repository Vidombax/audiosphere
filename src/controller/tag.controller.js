import db from '../db.js';

class TagController {
    async createTag(req, res) {

    }
    async getTags(req, res) {
        const tags = await db.query('SELECT * FROM tags LIMIT 10')
        res.json(tags.rows);
    }
    async getOneTag(req, res) {
        const id = req.params.id;
        const tag = await db.query('SELECT * FROM tags WHERE id = $1', [id]);
        res.json(tag.rows[0]);
    }
    async getNewestTag(req, res) {
        const tag = await db.query('SELECT * FROM tags ORDER BY id DESC');
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