 const {Datatypes}= require('sequelize');
 const sequelize = require('../config/database');

 const Order = sequelize.define('Order', {
    id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    FirstName: {
        type: Datatypes.STRING,
        allowNull: false
    },
    LastName: {
        type: Datatypes.STRING,
        allowNull: false
    },
    Email: {
        type: Datatypes.STRING,
        allowNull: false
    },
    Phone: {
        type: Datatypes.STRING,
        allowNull: false
    },
    totalAmount: {
        type: Datatypes.DECIMAL(10, 2),
        allowNull: false
    }
});

module.exports = Order;