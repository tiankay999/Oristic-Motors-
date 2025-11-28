const {Datatypes}= require('sequelize');
const {sequelize}= require('../config/database');


const Admin = sequelize.define('Admin', {
    id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Datatypes.STRING,
        allowNull: false
    },
    email: {
        type: Datatypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Datatypes.STRING,
        allowNull: false
    }
});

module.exports = Admin;
