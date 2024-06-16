import db from '../db.js';

class TagController {
    async createTag(req, res) {
        const name = req.body.name_tag;
        const photo = req.body.genre_photo;
        const genre = await db.query('INSERT INTO tags (name_tag, genre_photo) VALUES ($1, $2)', [name, photo]);
        res.json('tag was added');
    }
    async getTags(req, res) {
        const tags = await db.query('SELECT * FROM tags LIMIT 10')
        res.json(tags.rows);
    }
    async getTagsNoLimit(req, res) {
        const tags = await db.query('SELECT * FROM tags ORDER BY id ASC');
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
    async getTagsBySearch(req, res) {
        const text = req.params.search;
        const tags = await db.query('SELECT * FROM tags WHERE LOWER(name_tag) LIKE LOWER($1) ORDER BY id ASC', ['%' + text + '%']);
        res.json(tags.rows);
    }
    async updateTag(req, res) {
        const id = req.body.id;
        const name = req.body.name;
        const photo = req.body.photo;
        const tag = await db.query('UPDATE tags SET name_tag = $1, genre_photo = $2 WHERE id = $3', [name, photo, id]);
        res.json('tag is updated');
    }
    async deleteTag(req, res) {
        const id = req.params.id;
        const tag = await db.query('DELETE FROM tags WHERE id = $1', [id]);
        res.json(tag.rows[0]);
    }
}

export default new TagController();