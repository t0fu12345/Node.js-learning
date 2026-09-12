const { ObjectId } = require('mongodb');
const NoteModel = require('./note.model');
const viewList = require('./views/note.view-list');
const viewAdd = require('./views/note.view-add');
const viewEdit = require('./views/note.view-edit');
const viewDelete = require('./views/note.view-delete');

const listNote = async (req, res) => {
    try {
        const data = await NoteModel.getAll();
        res.send(viewList(data));
    } catch (error) {
        console.error(error);
        res.status(500).send("Lỗi lấy danh sách note");
    }
}

const showAddForm = (req, res) => {
    res.send(viewAdd());
}

const addNote = async (req, res) => {
    try {
        const { title, thumbnail, content, status } = req.body;
        const created_at = new Date().toISOString();
        const updated_at = created_at;
        await NoteModel.create({ title, thumbnail, content, created_at, updated_at, status });
        res.redirect('/index');
    } catch (error) {
        console.error(error);
        res.status(500).send("Lỗi thêm note");
    }
}

const showEditForm = async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) return res.status(404).send("ID không hợp lệ");
        const note = await NoteModel.getById(id);
        if (note) {
            res.send(viewEdit(note));
        } else {
            res.status(500).send("Ko tìm thấy note");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Lỗi hiển thị form sửa");
    }
}

const editNote = async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) return res.status(404).send("ID không hợp lệ");
        const { title, thumbnail, content, status } = req.body;
        const updated_at = new Date().toISOString();
        await NoteModel.update(id, { title, thumbnail, content, updated_at, status });
        res.redirect('/index');
    } catch (error) {
        console.error(error);
        res.status(500).send("Lỗi sửa note");
    }
}

const showDeleteForm = async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) return res.status(404).send("ID không hợp lệ");
        const note = await NoteModel.getById(id);
        if (note) {
            res.send(viewDelete(note));
        } else {
            res.status(500).send("Ko tìm thấy note");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Lỗi hiển thị form xóa");
    }
}

const deleteNote = async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) return res.status(404).send("ID không hợp lệ");
        await NoteModel.delete(id);
        res.redirect('/index');
    } catch (error) {
        console.error(error);
        res.status(500).send("Lỗi xóa note");
    }
}

module.exports = {
    listNote,
    showAddForm,
    addNote,
    showEditForm,
    editNote,
    showDeleteForm,
    deleteNote
}