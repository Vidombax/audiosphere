import Router from 'express';
import TagController from "../controller/tag.controller.js";

const router = new Router();

router.post("/tag", TagController.createTag);
router.get("/tag", TagController.getTags);
router.get("/tag/:id", TagController.getOneTag);
router.put("/tag", TagController.updateTag);
router.delete("/tag/:id", TagController.deleteTag);

export default router;