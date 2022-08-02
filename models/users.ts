import { DataTypes } from 'sequelize';
import db from '../database/connection';

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Name can not be empty' },
            len: {
                args: [3, 50],
                msg: 'Name should be at least 3 characterss',
            },
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Email can not be empty' },
            isEmail: { msg: 'Invalid Email' },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Password can not be empty' },
        },
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
            notNull: { msg: 'Role can not be empty' },
            isIn: {
                args: [['SALES_ROLE', 'ADMIN_ROLE']],
                msg: 'Is not a valid role',
            },
        },
    },
});

export default User;
