const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    images: {
        type: DataTypes.TEXT, // JSON array of up to 3 image URLs
        allowNull: true,
        get() {
            const rawValue = this.getDataValue('images');
            return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
            this.setDataValue('images', JSON.stringify(value || []));
        }
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isFeatured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    discountPercent: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    stockStatus: {
        type: DataTypes.ENUM('instock', 'outstock'),
        defaultValue: 'instock',
        allowNull: false,
    },
});

module.exports = Product;
