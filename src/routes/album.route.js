import Router from 'express';
import AlbumController from "../controller/album.controller.js";

const router = new Router();

router.post("/album", AlbumController.createAlbum);
router.get("/album", AlbumController.getAlbums);
router.get("/album/:id", AlbumController.getOneAlbum);
router.get("/new-albums", AlbumController.getNewAlbums);
router.get("/popular-albums", AlbumController.getPopularAlbums);
router.get("/music-album/:id", AlbumController.getMusicByAlbum);
router.put("/album", AlbumController.updateAlbum);
router.delete("/album/:id", AlbumController.deleteAlbum);

export default router;