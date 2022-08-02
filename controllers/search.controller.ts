import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Product from '../models/product';

export const search = async (req: Request, res: Response) => {
    const { search } = req.params;

    const products = await Product.findAll({
        where: {
            name: { [Op.like]: '%' + search + '%' },
        },
    });

    return res.json({
        products,
    });
};
