import { NextFunction, Request, Response } from 'express';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.role) {
        return res.status(500).json({
            msg: 'Se quiere verificar role sin validar token',
        });
    }

    const { role, userName } = req.body;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${userName} is not admin`,
        });
    }
    next();
};
