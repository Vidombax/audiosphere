import db from '../db.js';

class PerformerController {
    async createPerformer(req, res) {

    }
    async getSubPerformers(req, res) {
        const performers = await db.query('SELECT * FROM users where is_performance = true')
        res.json(performers.rows);
    }
    async getPopularPerformers(req, res) {
        const performers = await db.query('SELECT * FROM users where is_performance = true ORDER BY users.count_follower DESC')
        res.json(performers.rows);
    }
    async getNewPerformers(req, res) {
        const performers = await db.query('SELECT * FROM users WHERE is_performance = true ' +
            'ORDER BY iduser DESC');
        res.json(performers.rows);
    }
    async getMusicByPerformer(req, res) {
        const id = req.params.id;
        const music = await db.query('SELECT music.id, music.name_music, users.iduser, users.name, albums.album_cover, albums.date_publication, music.count_auditions, music.duration_music, music.file_path_music FROM music\n' +
            '                JOIN music_in_albums ON music.id = music_in_albums.id_music\n' +
            '                JOIN albums ON music_in_albums.id_album = albums.id_album\n' +
            '                JOIN users ON music.id_performance = users.iduser\n' +
            '                WHERE music.id_performance = $1 AND albums.is_playlist = false', [id])
        res.json(music.rows)
    }
    async getAlbumsByPerformer(req, res) {
        const id = req.params.id;
        const albums = await db.query('SELECT albums.id_album, albums.name_album, albums.album_cover, users.name, users.iduser FROM albums\n' +
            'JOIN public.users on users.iduser = albums.id_performance\n' +
            'WHERE id_performance = $1 AND albums.is_playlist = false', [id])
        res.json(albums.rows)
    }
    async getOnePerformer(req, res) {
        const id = req.params.id;
        const performer = await db.query('SELECT * FROM users WHERE id = $1 AND is_performance = true', [id]);
        res.json(performer.rows[0]);
    }
    async updatePerformer(req, res) {
        const id = req.body.id;
        const performer = await db.query('UPDATE users SET is_performance = true WHERE iduser = $1', [id]);
        res.json('user updated');
    }
    async countFollowers(req, res) {
        const id = req.params.id;
        const count = await db.query('SELECT COUNT(*) FROM followings WHERE id_following = $1;', [id]);
        res.json(count.rows[0]);
    }
    async deletePerformer(req, res) {
        const id = req.params.id;
        const performer = await db.query('DELETE FROM users WHERE id = $1 AND is_performance = true', [id]);
        res.json(performer.rows[0]);
    }
    async getApplications(req, res) {
        const applications = await db.query('SELECT performer_application.id, performer_application.date_application, performer_application.application_status, users.name, users.mail, performer_application.id_user FROM performer_application JOIN users on users.iduser = performer_application.id_user ORDER BY performer_application.application_status DESC');
        res.json(applications.rows);
    }
    async getApplicationsBySelector(req, res) {
        const type = req.params.type;
        const applications = await db.query('SELECT performer_application.id, performer_application.date_application, performer_application.application_status, users.name, users.mail, performer_application.id_user FROM performer_application JOIN users on users.iduser = performer_application.id_user ORDER BY performer_application.application_status = $1 DESC', [type]);
        res.json(applications.rows);
    }
    async approveApplication(req, res) {
        const status = req.body.status;
        const id = req.body.id;
        const application = await db.query('UPDATE performer_application SET application_status = $1 WHERE id_user = $2', [status, id]);
        res.json('status updated');
    }
    async removePerformerStatus(req, res) {
        const id = req.params.id;
        const performer = await db.query('UPDATE users SET is_performance = false WHERE iduser = $1', [id]);
        res.json('user updated');
    }
}

export default new PerformerController();