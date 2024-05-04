import db from '../db.js';

class AlbumController {
    async createAlbum(req, res) {
        //const name = req.body.name
        //const newUser = await db.query('INSERT INTO albums () VALUES () RETURNING *', [])
        //res.json(newUser.rows[0])
    }
    async getAlbums(req, res) {
        const users = await db.query('SELECT * FROM albums');
        res.json(users.rows);
    }
    async getOneAlbum(req, res) {
        const id = req.params.id;
        const user = await db.query('SELECT * FROM albums WHERE id = $1', [id]);
        res.json(user.rows[0]);
    }
    async getNewAlbums(req, res) {
        const albums = await db.query('SELECT name_album, album_cover\n' +
            'FROM albums\n' +
            'WHERE EXTRACT(MONTH FROM date_publication) = EXTRACT(MONTH FROM CURRENT_DATE) LIMIT 4;\n')
        res.json(albums.rows);
    }
    async updateAlbum(req, res) {

    }
    async deleteAlbum(req, res) {
        const id = req.params.id;
        const user = await db.query('DELETE FROM albums WHERE id = $1', [id]);
        res.json(user.rows[0]);
    }
}

export default new AlbumController();