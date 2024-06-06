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
router.put("/music-auditions", MusicController.updateMusicAuditions);
router.delete("/music/:id", MusicController.deleteMusic);
router.get("/music-search/:search", MusicController.getMusicBySearch);
router.get("/get-comments/:id", MusicController.getCommentsFromMusic);
router.post("/create-comment", MusicController.createComment);

export default router;