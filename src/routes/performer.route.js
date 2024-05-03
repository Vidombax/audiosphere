import Router from 'express';
import PerformersController from "../controller/performer.controller.js";

const router = new Router();

router.post("/performer", PerformersController.createPerformer);
router.get("/performer", PerformersController.getPerformers);
router.get("/performer/:id", PerformersController.getOnePerformer);
router.put("/performer", PerformersController.updatePerformer);
router.delete("/performer/:id", PerformersController.deletePerformer);

export default router;