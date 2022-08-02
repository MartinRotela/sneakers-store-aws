import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/users';
import JWTGen from '../helpers/jwt';

export const authUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({
            where: { email },
            attributes: ['name', ['password', 'hash'], 'id', 'role'],
        });

        if (!user) {
            return res.status(404).json({
                msg: 'Invalid username or password',
            });
        }

        const { name, id: uid, hash, role } = user.toJSON();

        const token = await JWTGen(uid, name, role);

        const validPassword = bcrypt.compareSync(password, hash);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Invalid username or password',
            });
        }

        res.json({
            user: name,
            uid,
            role,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'An unexpected error ocurred' });
    }
};

export const renewUser = async (req: Request, res: Response) => {
    const { uid, user, role } = req.body;

    try {
        const token = await JWTGen(uid, user, role);

        res.json({
            uid,
            user,
            role,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'An unexpected error ocurred' });
    }
};
