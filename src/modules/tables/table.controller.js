const tableService = require('./table.service');
const tableView = require('./table.view');

const getTablesPage = async (req, res, next) => {
    try {
        const tables = await tableService.getAllTables();
        res.send(tableView.renderTables(tables, req.user));
    } catch (error) {
        next(error);
    }
};

const createTable = async (req, res, next) => {
    try {
        await tableService.createTable(req.body);
        res.redirect('/manage/tables');
    } catch (error) {
        next(error);
    }
};

const updateTableStatus = async (req, res, next) => {
    try {
        await tableService.updateTableStatus(req.params.id, req.body.status);
        res.redirect('/manage/tables');
    } catch (error) {
        next(error);
    }
};

module.exports = { getTablesPage, createTable, updateTableStatus };
