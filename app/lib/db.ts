import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    process.env.DB_NAME || 'minaglitzy',
    process.env.DB_USER || 'root',
    process.env.DB_PASS || 'root',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        port: parseInt(process.env.DB_PORT || '3306'),
        logging: false,
    }
);

export default sequelize;
