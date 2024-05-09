import Router from 'express';
import UserController from '../controller/user.controller.js';

const router = new Router();

router.post("/user", UserController.createUser);
router.get("/user", UserController.getUsers);
router.get("/user/:id", UserController.getOneUser);
router.get("/user/:username/:password", UserController.checkUserAuthorization);
router.put("/user", UserController.updateUser);
router.delete("/user/:id", UserController.deleteUser);
router.post("/add-favourite", UserController.addToFavourite);
router.delete("/del-favourite/:user/:music", UserController.removeFromFavourite);

export default router;