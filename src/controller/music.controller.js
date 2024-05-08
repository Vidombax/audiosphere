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
        const music = await db.query('SELECT music.id, music.name_music, music.count_auditions, music.count_likes, albums.album_cover, albums.name_album, users.name, music.duration_music, music.file_path_music\n' +
            'FROM music\n' +
            '         JOIN music_in_albums ON music.id = music_in_albums.id_music\n' +
            '         JOIN albums ON music_in_albums.id_album = albums.id_album\n' +
            '         JOIN users ON music.id_performance = users.iduser\n' +
            'ORDER BY music.count_auditions DESC, music.count_likes DESC\n' +
            'LIMIT 5')
        res.json(music.rows)
    }
    async getPopularMusicToPlayer(req, res) {
        const music = await db.query('SELECT music.id, music.name_music, music.count_auditions, music.count_likes, albums.album_cover, albums.name_album, users.name, music.duration_music, music.file_path_music\n' +
            'FROM music\n' +
            '         JOIN music_in_albums ON music.id = music_in_albums.id_music\n' +
            '         JOIN albums ON music_in_albums.id_album = albums.id_album\n' +
            '         JOIN users ON music.id_performance = users.iduser\n' +
            'ORDER BY music.count_auditions DESC, music.count_likes DESC')
        res.json(music.rows)
    }
    async getNewestMusic(req, res) {
        const music = await db.query('SELECT music.id, music.name_music, users.name, albums.album_cover, albums.date_publication, music.count_auditions, music.duration_music, music.file_path_music FROM music\n' +
            '    JOIN music_in_albums ON music.id = music_in_albums.id_music\n' +
            '    JOIN albums ON music_in_albums.id_album = albums.id_album\n' +
            '    JOIN users ON music.id_performance = users.iduser\n' +
            '    WHERE EXTRACT(MONTH FROM date_publication) = EXTRACT(MONTH FROM CURRENT_DATE)\n' +
            'ORDER BY music.count_auditions DESC');
        res.json(music.rows[0]);
    }
    async getMusicByTag(req, res) {
        const tag = req.params.tag;
        const music = await db.query('SELECT music.id, music.name_music, music.count_auditions, music.count_likes, albums.album_cover, albums.name_album, users.name, music.duration_music, music.file_path_music, music.id_tag\n' +
            'FROM music\n' +
            '         JOIN music_in_albums ON music.id = music_in_albums.id_music\n' +
            '         JOIN albums ON music_in_albums.id_album = albums.id_album\n' +
            '         JOIN users ON music.id_performance = users.iduser\n' +
            'WHERE music.id_tag = $1', [tag])
        res.json(music.rows)
    }
    async getSubscribesMusic(req, res) {
        const id = req.params.id;
        const music = await db.query('SELECT\n' +
            '    music.id,\n' +
            '    albums.album_cover,\n' +
            '    music.name_music,\n' +
            '    users.name,\n' +
            '    music.duration_music,' +
            '    music.file_path_music\n' +
            'FROM\n' +
            '    following_to_music\n' +
            '        JOIN\n' +
            '    music ON following_to_music.id_music = music.id\n' +
            '        JOIN\n' +
            '    users ON music.id_performance = users.iduser\n' +
            '        LEFT JOIN\n' +
            '    music_in_albums ON music.id = music_in_albums.id_music\n' +
            '        LEFT JOIN\n' +
            '    albums ON music_in_albums.id_album = albums.id_album\n' +
            'WHERE\n' +
            '    following_to_music.id_user = $1;', [id])
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