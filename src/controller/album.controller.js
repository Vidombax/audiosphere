import db from '../db.js';

class AlbumController {
    async createAlbum(req, res) {
        const name = req.body.nameAlbum;
        const albumPictures = req.body.albumPictures;
        const idPerformer = req.body.idPerformer;
        const newAlbum = await db.query('INSERT INTO albums (name_album, album_cover, count_followers, count_auditions, is_playlist, id_performance, date_publication) VALUES ($1, $2, 0, 0, false, $3, CURRENT_DATE) RETURNING id_album', [name, albumPictures, idPerformer]);
        res.json(newAlbum.rows[0]);
    }
    async createPlaylist(req, res) {
        const name = req.body.name;
        const albumCover = req.body.cover;
        const idPerformer = req.body.id;
        const newPlaylist = await db.query('INSERT INTO albums (name_album, album_cover, count_followers, count_auditions, is_playlist, id_performance, date_publication) VALUES ($1, $2, 0, 0, true, $3, CURRENT_DATE) RETURNING *', [name, albumCover, idPerformer]);
        res.json(newPlaylist.rows[0]);
    }
    async addMusicToPlaylist(req, res) {
        const idMusic = req.body.id_music;
        const idAlbum = req.body.id_album;
        const add = await db.query('INSERT INTO music_in_albums (id_music, id_album) VALUES ($1, $2) RETURNING *', [idMusic, idAlbum])
        res.json(add.rows[0]);
    }
    async getPlaylistsByUser(req, res) {
        const id = req.params.id;
        const playlists = await db.query('SELECT * FROM albums WHERE id_performance = $1 AND is_playlist = true', [id]);
        res.json(playlists.rows);
    }
    async getPlaylists(req, res) {
        const id = req.params.id;
        const playlists = await db.query('SELECT albums.id_album, albums.name_album, albums.album_cover, albums.id_performance, users.name FROM albums JOIN users ON albums.id_performance = users.iduser WHERE is_playlist = true ORDER BY id_album DESC LIMIT 2');
        res.json(playlists.rows);
    }
    async getAlbums(req, res) {
        const albums = await db.query('SELECT albums.id_album, albums.name_album, users.name, albums.date_publication, albums.is_playlist FROM albums JOIN users ON albums.id_performance = users.iduser ORDER BY albums.id_album ASC');
        res.json(albums.rows);
    }
    async getAlbumsSelector(req, res) {
        const type = Boolean(req.params.type);
        if (type === true) {
            const albums = await db.query('SELECT albums.id_album, albums.name_album, users.name, albums.date_publication, albums.is_playlist FROM albums JOIN users ON albums.id_performance = users.iduser ORDER BY albums.is_playlist DESC');
            res.json(albums.rows);
        }
        else {
            const albums = await db.query('SELECT albums.id_album, albums.name_album, users.name, albums.date_publication, albums.is_playlist FROM albums JOIN users ON albums.id_performance = users.iduser ORDER BY albums.is_playlist = false');
            res.json(albums.rows);
        }
    }
    async getOneAlbum(req, res) {
        const id = req.params.id;
        const user = await db.query('SELECT * FROM albums WHERE id_album = $1', [id]);
        res.json(user.rows[0]);
    }
    async getNewAlbums(req, res) {
        const albums = await db.query('SELECT albums.id_album, albums.name_album, albums.album_cover, users.name, users.iduser FROM albums\n' +
            '    JOIN users ON albums.id_performance = users.iduser\n' +
            'WHERE is_playlist = false ORDER BY albums.id_album DESC')
        res.json(albums.rows);
    }
    async getMusicByAlbum(req, res) {
        const id = req.params.id;
        const music = await db.query('SELECT music.id, music.name_music, users.name, albums.album_cover, albums.date_publication, music.count_auditions, music.duration_music, music.id_performance, music.file_path_music FROM music\n' +
            '                JOIN music_in_albums ON music.id = music_in_albums.id_music\n' +
            '                JOIN albums ON music_in_albums.id_album = albums.id_album\n' +
            '                JOIN users ON music.id_performance = users.iduser\n' +
            '                WHERE albums.id_album = $1', [id])
        res.json(music.rows)
    }
    async getPopularAlbums(req, res) {
        const albums = await db.query('SELECT albums.id_album, albums.name_album, albums.album_cover, users.name, users.iduser, albums.count_auditions, albums.count_followers FROM albums\n' +
            '             JOIN users ON albums.id_performance = users.iduser WHERE is_playlist = false\n' +
            '            ORDER BY albums.count_auditions DESC, albums.count_followers DESC')
        res.json(albums.rows)
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