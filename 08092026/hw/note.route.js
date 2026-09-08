const express = require('express');
const router = express.Router();
const noteController = require('./note.controller');

router.get('/index', noteController.listNote);

router.get('/add', noteController.showAddForm);
router.post('/add', noteController.addNote);

router.get('/edit/:id', noteController.showEditForm);
router.post('/edit/:id', noteController.editNote);

router.get('/delete/:id', noteController.showDeleteForm);
router.post('/delete/:id', noteController.deleteNote);

module.exports = router;