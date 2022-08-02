import { Sequelize } from 'sequelize';

const dbName = process.env.DATABASE_NAME || '';
const dbUser = process.env.DATABASE_USER || '';
const dbPassword = process.env.DATABASE_PASSWORD || '';
const dbUrl = process.env.DATABASE_URL || '';

const db = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbUrl,
    dialect: 'mysql',
    logging: false,
});

export default db;
