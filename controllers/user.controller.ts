import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/users';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.json({
            users,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'An unexpected error ocurred' });
    }
};
export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const usuario = await User.findByPk(id);

        if (!usuario) {
            res.status(404).json({
                msg: `no existe un usuario con el id ${id}`,
            });
        }
        res.json({
            usuario,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'An unexpected error ocurred' });
    }
};

export const postUser = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        const existeEmail = await User.findOne({
            where: {
                email: body.email,
            },
        });

        if (existeEmail) {
            return res.status(400).json({
                msg: 'Email already taken',
            });
        }

        const user = { ...req.body };
        const salt = bcrypt.genSaltSync();

        user.password = bcrypt.hashSync(body.password, salt);

        await User.create(user);

        res.json({
            msg: 'User created succesfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'An unexpected error ocurred',
        });
    }
};

export const putUser = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const usuario = await User.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                msg: 'User does not exist',
            });
        }

        await usuario.update(body);

        res.json({
            usuario,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'An unexpected error ocurred',
        });
    }
};
export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const usuario = await User.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                msg: 'User does not exist',
            });
        }

        await usuario.destroy();
        res.json({
            msg: 'User deleted succesfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'An unexpected error ocurred',
        });
    }
};
