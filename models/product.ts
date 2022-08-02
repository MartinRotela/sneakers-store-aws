import { DataTypes } from 'sequelize';
import db from '../database/connection';
import Brand from './brands';

const Product = db.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: { msg: 'name is required' },
            len: { args: [3, 50], msg: 'name should be at least 3 characters' },
        },
    },
    description: {
        type: DataTypes.STRING,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Image can not be empty' },
            isUrl: { msg: 'Image should be an url' },
        },
    },
    image_public_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Image can not be empty' },
        },
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notNull: { msg: 'price is required' },
        },
    },
    BrandId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Brand,
            key: 'id',
        },
        validate: {
            notNull: { msg: 'Brand is required' },
        },
    },
});

export default Product;
