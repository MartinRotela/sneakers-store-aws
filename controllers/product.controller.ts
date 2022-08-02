import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import Product from '../models/product';
import { deleteImage, uploadImage } from '../helpers/cloudinary';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll();

        res.json({
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'An unexpected error ocurred',
        });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                msg: 'Product not found',
            });
        }
        res.json({
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'An unexpected error ocurred' });
    }
};

export const postProduct = async (req: Request, res: Response) => {
    const { body, files } = req;
    console.log(req);

    try {
        const productExists = await Product.findOne({
            where: { name: body.name },
        });
        if (productExists) {
            return res.status(400).json({ msg: 'Product already exists' });
        }

        if (!files) {
            return res.status(404).json({ msg: 'Image is necessary' });
        }

        const { tempFilePath, mimetype } = files.image as UploadedFile;

        const { public_id, url } = await uploadImage(tempFilePath, mimetype);

        body.image_public_id = public_id;
        body.image_url = url;

        const newProduct = await Product.create(body);

        return res.json({
            msg: 'Product created successfuly',
            product: newProduct,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'An unexpected error ocurred',
        });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                msg: 'Product does not exist',
            });
        }

        const { image_public_id } = product.toJSON();

        if (image_public_id) {
            await deleteImage(image_public_id);
        }

        await product.destroy();

        res.json({ msg: 'Product deleted successfuly' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'An unexpected error ocurred' });
    }
};

export const putProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body, files } = req;

    try {
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ msg: 'Product does not exist' });
        }

        const { image_public_id } = product.toJSON();

        if (files) {
            const { tempFilePath, mimetype } = files.image as UploadedFile;

            await deleteImage(image_public_id);
            const { url, public_id } = await uploadImage(
                tempFilePath,
                mimetype
            );
            body.image_public_id = public_id;
            body.image_url = url;
        }

        const newProduct = await product.update(body);

        res.json({
            msg: 'Product updated successfuly',
            product: newProduct,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'An unexpected error ocurred' });
    }
};
