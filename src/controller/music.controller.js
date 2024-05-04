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
        const music = await db.query('SELECT music.name_music, music.count_auditions, music.count_likes, albums.album_cover, users.name\n' +
            'FROM music\n' +
            '         JOIN music_in_albums ON music.id = music_in_albums.id_music\n' +
            '         JOIN albums ON music_in_albums.id_album = albums.id_album\n' +
            '         JOIN users ON music.id_performance = users.iduser\n' +
            'ORDER BY music.count_auditions DESC, music.count_likes DESC\n' +
            'LIMIT 5')
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