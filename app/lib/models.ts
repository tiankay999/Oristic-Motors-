import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './db';

interface ProductAttributes {
    id: number;
    name: string;
    description?: string;
    price: number;
    image?: string;
    category?: string;
    stockStatus: 'instock' | 'outstock';
    slug?: string;
    isFeatured?: boolean;
    stock?: number;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id' | 'stockStatus'> { }

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    public id!: number;
    public name!: string;
    public description!: string;
    public price!: number;
    public image!: string;
    public category!: string;
    public stockStatus!: 'instock' | 'outstock';
    public slug!: string;
    public isFeatured!: boolean;
    public stock!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
        image: {
            type: DataTypes.TEXT('long'), // Use TEXT for base64 images if needed
            allowNull: true,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        stockStatus: {
            type: DataTypes.ENUM('instock', 'outstock'),
            defaultValue: 'instock',
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: true
        },
        isFeatured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        stock: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },
    {
        sequelize,
        tableName: 'Products',
    }
);

// Sync model with database (be careful with force: true in production)
// In a real app, use migrations. For now, we'll sync if table doesn't exist.
const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('Database synced');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};

export { Product, syncDatabase };
