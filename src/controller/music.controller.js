import db from '../db.js';
import {json} from "express";

class MusicController {
    async createMusic(req, res) {
        const nameMusic = req.body.nameMusic;
        const fileMusic = req.body.fileMusic;
        const durationMusic = req.body.durationMusic;
        const idPerformance = req.body.idPerformance;
        const idTag = req.body.idTag;
        const music = await db.query('INSERT INTO music (name_music, file_path_music, id_performance, count_auditions, count_likes, count_comments, id_tag, duration_music) VALUES ($1, $2, $3, 0, 0, 0, $4, $5) RETURNING id', [nameMusic, fileMusic, idPerformance, idTag, durationMusic]);
        res.json(music.rows[0]);
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
    async getMusicForAdmin(req, res) {
        const music = await db.query('SELECT music.id, music.name_music, music.count_auditions, users.name, music.duration_music, tags.name_tag FROM users JOIN music ON users.iduser = music.id_performance JOIN tags ON music.id_tag = tags.id ORDER BY music.id ASC');
        res.json(music.rows);
    }
    async getMusicBySelector(req, res) {
        const type = req.params.type;
        if (type === '1') {
            const music = await db.query('SELECT music.id, music.name_music, music.count_auditions, users.name, music.duration_music, tags.name_tag FROM users JOIN music ON users.iduser = music.id_performance JOIN tags ON music.id_tag = tags.id ORDER BY music.count_auditions DESC');
            res.json(music.rows);
        }
        else {
            const music = await db.query('SELECT music.id, music.name_music, music.count_auditions, users.name, music.duration_music, tags.name_tag FROM users JOIN music ON users.iduser = music.id_performance JOIN tags ON music.id_tag = tags.id ORDER BY music.id ASC');
            res.json(music.rows);
        }
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
            '    WHERE albums.is_playlist = false\n' +
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
    async getCommentsFromMusic(req, res) {
        const id = req.params.id;
        const comments = await db.query('SELECT comments.id_user, comments.id_music, comments.comment, users.profile_picture, users.name FROM comments JOIN users ON comments.id_user = users.iduser WHERE comments.id_music = $1 ORDER BY id ASC', [id]);
        res.json(comments.rows);
    }
    async createComment(req, res) {
        const id_music = req.body.idMusic;
        const comment = req.body.comment;
        const id_user = req.body.idUser;
        const new_comment = await db.query('INSERT INTO comments (id_user, id_music, comment) VALUES ($1, $2, $3)', [id_user, id_music, comment]);
        res.json('comment create');
    }
    async createReport(req, res) {
        const report = req.body.report;
        const id_user = req.body.user;
        const id_music = req.body.music;
        let text = '';
        switch (report) {
            case 'copyright':
                text = 'Нарушение авторских прав';
                const report_copyright = await db.query('INSERT INTO complaints (reason_complaint, id_user, id_music) VALUES ($1, $2, $3)', [text, id_user, id_music]);
                res.json('');
                break;
            case 'notMusic':
                text = 'Аудиофайл не содержит музыки';
                const report_notMusic = await db.query('INSERT INTO complaints (reason_complaint, id_user, id_music) VALUES ($1, $2, $3)', [text, id_user, id_music]);
                res.json('');
                break;
            case 'notPlay':
                text = 'Музыка не воспроизводится';
                const report_notPlay = await db.query('INSERT INTO complaints (reason_complaint, id_user, id_music) VALUES ($1, $2, $3)', [text, id_user, id_music]);
                res.json('');
                break;
        }
    }
    async getReports(req, res) {
        const reports = await db.query('SELECT complaints.id, complaints.reason_complaint, users.name, music.name_music FROM complaints JOIN music ON complaints.id_music = music.id JOIN users ON complaints.id_user = users.iduser ORDER BY complaints.id ASC');
        res.json(reports.rows);
    }
    async denyReport(req, res) {
        const id = req.params.id;
        const report = await db.query('DELETE FROM complaints WHERE id = $1', [id]);
        res.json('');
    }
}

export default new MusicController();