const express = require('express');
const router = express.Router();
const tableController = require('./table.controller');
const { requireLogin, authorize } = require('../../core/middlewares/auth.middleware');

router.get('/manage/tables', requireLogin, authorize('STAFF', 'ADMIN'), tableController.getTablesPage);
router.post('/manage/tables', requireLogin, authorize('STAFF', 'ADMIN'), tableController.createTable);
router.patch('/manage/tables/:id/status', requireLogin, authorize('STAFF', 'ADMIN'), tableController.updateTableStatus);

module.exports = router;
