import Router from 'express';
import MusicController from "../controller/music.controller.js";

const router = new Router();

router.post("/music", MusicController.createMusic);
router.get("/music", MusicController.getMusic);
router.get("/music/:id", MusicController.getOneMusic);
router.get("/popular-music", MusicController.getPopularMusic);
router.get("/popular-music-player", MusicController.getPopularMusicToPlayer);
router.get("/subscribe-music/:id", MusicController.getSubscribesMusic);
router.get("/afisha-music", MusicController.getNewestMusic);
router.get("/music-tag/:tag", MusicController.getMusicByTag);
router.put("/music", MusicController.updateMusic);
router.delete("/music/:id", MusicController.deleteMusic);

export default router;