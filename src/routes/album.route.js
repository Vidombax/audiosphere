import Router from 'express';
import AlbumController from "../controller/album.controller.js";

const router = new Router();

router.post("/album", AlbumController.createAlbum);
router.post("/add-playlist", AlbumController.createPlaylist);
router.post("/add-music-playlist", AlbumController.addMusicToPlaylist);
router.get("/get-playlists/:id", AlbumController.getPlaylistsByUser);
router.get("/get-playlists", AlbumController.getPlaylists);
router.get("/album", AlbumController.getAlbums);
router.get("/album/:id", AlbumController.getOneAlbum);
router.get("/new-albums", AlbumController.getNewAlbums);
router.get("/popular-albums", AlbumController.getPopularAlbums);
router.get("/music-album/:id", AlbumController.getMusicByAlbum);
router.put("/album", AlbumController.updateAlbum);
router.delete("/album/:id", AlbumController.deleteAlbum);

export default router;