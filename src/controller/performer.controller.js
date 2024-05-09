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
    async getMusicByPerformer(req, res) {
        const id = req.params.id;
        const music = await db.query('SELECT music.id, music.name_music, users.name, albums.album_cover, albums.date_publication, music.count_auditions, music.duration_music, music.file_path_music FROM music\n' +
            '                JOIN music_in_albums ON music.id = music_in_albums.id_music\n' +
            '                JOIN albums ON music_in_albums.id_album = albums.id_album\n' +
            '                JOIN users ON music.id_performance = users.iduser\n' +
            '                WHERE music.id_performance = $1', [id])
        res.json(music.rows)
    }
    async getAlbumsByPerformer(req, res) {
        const id = req.params.id;
        const albums = await db.query('SELECT albums.id_album, albums.name_album, albums.album_cover, users.name FROM albums\n' +
            'JOIN public.users on users.iduser = albums.id_performance\n' +
            'WHERE id_performance = $1', [id])
        res.json(albums.rows)
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