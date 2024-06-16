import Router from 'express';
import TagController from "../controller/tag.controller.js";

const router = new Router();

router.post("/tag", TagController.createTag);
router.get("/tag", TagController.getTags);
router.get("/tags", TagController.getTagsNoLimit);
router.get("/tag/:id", TagController.getOneTag);
router.get('/newest-tag', TagController.getNewestTag);
router.get('/genres-by-search/:search', TagController.getTagsBySearch);
router.put("/tag", TagController.updateTag);
router.delete("/tag/:id", TagController.deleteTag);

export default router;