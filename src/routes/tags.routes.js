const { Router } = require("express");
const TagsController = require("../controllers/TagsController");
const tagsRoutes = Router();
const ensureAuth = require('../middlewares/ensureAuth');


const tagsControler = new TagsController();

tagsRoutes.use("/", ensureAuth, tagsControler.index);

module.exports = tagsRoutes;