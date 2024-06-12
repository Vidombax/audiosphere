import Router from 'express';
import UserController from '../controller/user.controller.js';

const router = new Router();

router.post("/user", UserController.createUser);
router.post("/user-application", UserController.createApplication);
router.get("/user", UserController.getUsers);
router.get("/users-by-select/:type", UserController.getUsersBySelect);
router.get("/users-by-nick/:name", UserController.getUserByNickname);
router.get("/user/:id", UserController.getOneUser);
router.get("/user/:username/:password", UserController.checkUserAuthorization);
router.put("/update-user", UserController.updateUser);
router.put("/update-user-photo", UserController.updateUserPhoto);
router.delete("/user/:id", UserController.deleteUser);
router.post("/add-favourite", UserController.addToFavourite);
router.delete("/del-favourite/:user/:music", UserController.removeFromFavourite);
router.post("/sub-performer", UserController.subToPerformer);
router.delete("/unsub-performer/:user/:performer", UserController.unsubToPerformer);
router.get("/subscribe-performer/:user/:performer", UserController.getSubscribes);
router.get("/subscribes-performer/:user", UserController.getSubscribesPerformerToProfile);
router.get("/subscribes-user/:user", UserController.getSubscribesUserToProfile);

export default router;