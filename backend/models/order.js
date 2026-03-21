const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Order = sequelize.define('order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    items: {
        type: DataTypes.JSON,
        allowNull: true
    },
    // Delivery fields
    deliveryMode: {
        type: DataTypes.ENUM('pickup', 'delivery'),
        allowNull: false,
        defaultValue: 'pickup'
    },
    deliveryLocation: {
        type: DataTypes.ENUM('accra', 'outside-accra'),
        allowNull: true,
        defaultValue: null
    },
    deliveryStatus: {
        type: DataTypes.ENUM('processing', 'dispatched', 'in-transit', 'delivered'),
        allowNull: false,
        defaultValue: 'processing'
    }
});

module.exports = Order;