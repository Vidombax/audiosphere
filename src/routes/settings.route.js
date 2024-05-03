import Router from 'express';
import SettingsController from "../controller/settings.controller.js";

const router = new Router();

router.get("/settings/:id", SettingsController.getOneUserSettings);
router.put("/settings", SettingsController.updateUserSettings);
router.delete("/settings/:id", SettingsController.deleteUserProfilePicture);

export default router;