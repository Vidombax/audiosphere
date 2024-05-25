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
        const music = await db.query('SELECT music.id, music.name_music, music.id_performance, music.count_auditions, music.count_likes, albums.album_cover, albums.name_album, users.name, music.duration_music, music.file_path_music\n' +
            'FROM music\n' +
            '         JOIN music_in_albums ON music.id = music_in_albums.id_music\n' +
            '         JOIN albums ON music_in_albums.id_album = albums.id_album\n' +
            '         JOIN users ON music.id_performance = users.iduser\n' +
            'WHERE albums.is_playlist = false ' +
            'ORDER BY music.count_auditions DESC, music.count_likes DESC\n' +
            'LIMIT 5')
        res.json(music.rows)
    }
    async getPopularMusicToPlayer(req, res) {
        const music = await db.query('SELECT music.id, music.name_music, music.count_auditions, music.id_performance, music.count_likes, albums.album_cover, albums.name_album, users.name, music.duration_music, music.file_path_music\n' +
            'FROM music\n' +
            '         JOIN music_in_albums ON music.id = music_in_albums.id_music\n' +
            '         JOIN albums ON music_in_albums.id_album = albums.id_album\n' +
            '         JOIN users ON music.id_performance = users.iduser\n' +
            'WHERE albums.is_playlist = false ' +
            'ORDER BY music.count_auditions DESC, music.count_likes DESC')
        res.json(music.rows)
    }
    async getNewestMusic(req, res) {
        const music = await db.query('SELECT music.id, music.name_music, music.id_performance, users.name, albums.album_cover, albums.date_publication, music.count_auditions, music.duration_music, music.file_path_music FROM music\n' +
            '    JOIN music_in_albums ON music.id = music_in_albums.id_music\n' +
            '    JOIN albums ON music_in_albums.id_album = albums.id_album\n' +
            '    JOIN users ON music.id_performance = users.iduser\n' +
            '    WHERE EXTRACT(MONTH FROM date_publication) = EXTRACT(MONTH FROM CURRENT_DATE) AND albums.is_playlist = false\n' +
            'ORDER BY music.count_auditions DESC');
        res.json(music.rows[0]);
    }
    async getMusicByTag(req, res) {
        const tag = req.params.tag;
        const music = await db.query('SELECT music.id, music.name_music, music.id_performance, music.count_auditions, music.count_likes, albums.album_cover, albums.name_album, users.name, music.duration_music, music.file_path_music, music.id_tag\n' +
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
            '    music.count_auditions,\n' +
            '    music.duration_music,' +
            '    music.id_performance,' +
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
            '    following_to_music.id_user = $1' +
            ' AND albums.is_playlist = false;', [id])
        res.json(music.rows)
    }
    async updateMusicAuditions(req, res) {
        const id = req.body.id;
        const newCount = req.body.newCount;
        const music = await db.query('UPDATE music SET count_auditions = $1 WHERE id = $2', [newCount, id])
        const getAlbumId = await db.query('SELECT id_album FROM music_in_albums WHERE id_music = $1', [id])
        const album = await db.query('UPDATE albums\n' +
            'SET count_auditions = count_auditions + 1\n' +
            'WHERE id_album = $1 AND EXISTS (\n' +
            '    SELECT 1\n' +
            '    FROM music_in_albums\n' +
            '    WHERE id_album = $1 AND id_music = $2\n' +
            ')', [getAlbumId.rows[0].id_album, id])
        res.json(music.rows[0])
    }
    async deleteMusic(req, res) {
        const id = req.params.id;
        const music = await db.query('DELETE FROM music WHERE id = $1', [id]);
        res.json(music.rows[0]);
    }
    async getMusicBySearch(req, res) {
        const search = req.params.search;
        const music = await db.query('SELECT music.name_music, users.name, music.id_performance, music.id, music.file_path_music, music.duration_music, albums.id_album, albums.album_cover, albums.name_album FROM music\n' +
            '    JOIN music_in_albums ON music.id = music_in_albums.id_music\n' +
            '    JOIN albums ON music_in_albums.id_album = albums.id_album\n' +
            '    JOIN users ON music.id_performance = users.iduser\n' +
            'WHERE LOWER(music.name_music) LIKE LOWER($1) AND albums.is_playlist = false', ['%' + search + '%']);
        res.json(music.rows);
    }
}

export default new MusicController();