import db from '../db.js';

class MusicController {
    async createMusic(req, res) {

    }
    async getMusic(req, res) {
        const music = await db.query('SELECT * FROM music');
        res.json(music.rows);
    }
    async getOneMusic(req, res) {
        const id = req.params.id;
        const music = await db.query('SELECT * FROM music WHERE id = $1', [id]);
        res.json(music.rows[0]);
    }
    async getPopularMusic(req, res) {
        const music = await db.query('SELECT music.name_music,\n' +
            '       music.file_path_music,\n' +
            '       music.count_auditions,\n' +
            '       music.count_likes,\n' +
            '       albums.album_cover,\n' +
            '       users.name AS name_performance\n' +
            'FROM music\n' +
            '         INNER JOIN albums ON music.id = albums.id_music\n' +
            '         INNER JOIN users ON albums.id_performance = users.iduser\n' +
            'ORDER BY music.count_auditions DESC, music.count_likes DESC \n' +
            'LIMIT 5;')
        res.json(music.rows)
    }
    async updateMusic(req, res) {

    }
    async deleteMusic(req, res) {
        const id = req.params.id;
        const music = await db.query('DELETE FROM music WHERE id = $1', [id]);
        res.json(music.rows[0]);
    }
}

export default new MusicController();