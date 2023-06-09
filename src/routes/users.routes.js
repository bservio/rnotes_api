const { Router } = require('express');
const multer = require('multer');

const UserAvatarController = require('../controllers/UserAvatarController')
const UsersController = require('../controllers/UsersController');
const ensureAuth = require('../middlewares/ensureAuth');
const uploadConfig = require('../configs/upload');

const usersRoutes = Router();

const upload = multer(uploadConfig.MULTER);

const usersController = new UsersController();

const userAvatarController = new UserAvatarController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuth, usersController.update);
usersRoutes.patch("/avatar", ensureAuth, upload.single("avatar"), userAvatarController.update);

module.exports = usersRoutes