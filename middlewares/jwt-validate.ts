import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import User from '../models/users';

type Token = {
    user: string;
    uid: string;
    role: string;
    iat: number;
    exp: number;
};

export const validateJWT = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    //x-token headers
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No token',
        });
    }

    try {
        const { user, uid, role } = jwt.verify(
            token,
            process.env.SECRETORPRIVATEKEY!
        ) as Token;

        const databaseUser = await User.findOne({
            where: { name: user, id: uid, role },
        });

        if (!databaseUser) {
            return res.status(401).json({ msg: 'Invalid token' });
        }

        req.body.user = user;
        req.body.uid = uid;
        req.body.role = role;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token',
        });
    }

    next();
};
