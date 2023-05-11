const { Router } = require('express');
const NotesController = require('../controllers/NotesController');
const notesRoutes = Router();
const ensureAuth = require('../middlewares/ensureAuth');


const notesController = new NotesController();

notesRoutes.use(ensureAuth);

notesRoutes.post("/", notesController.create);
notesRoutes.get("/", notesController.index);
notesRoutes.get("/:id", notesController.show);
notesRoutes.delete("/:id", notesController.delete);

module.exports = notesRoutes