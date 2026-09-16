const Table = require('./table.model');

const getAllTables = async () => {
    return await Table.find().sort({ tableName: 1 });
};

const createTable = async (data) => {
    const table = new Table(data);
    await table.save();
    return table;
};

const updateTableStatus = async (id, status) => {
    return await Table.findByIdAndUpdate(id, { status }, { new: true });
};

module.exports = { getAllTables, createTable, updateTableStatus };
