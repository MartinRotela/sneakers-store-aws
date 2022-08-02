import { DataTypes } from 'sequelize';
import db from '../database/connection';

const Brand = db.define('Brand', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: { msg: 'Name is required' },
            len: { args: [3, 50], msg: 'Name should be at least 3 characters' },
        },
    },
    logo_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Logo is required' },
            isUrl: { msg: 'Logo should be an url' },
        },
    },
    logo_public_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Logo is required' },
        },
    },
});

export default Brand;
