import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const fieldValidator = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const [err] = errors.array({ onlyFirstError: true });
        const { msg } = err;
        return res.status(400).json({
            msg,
        });
    }

    next();
};
