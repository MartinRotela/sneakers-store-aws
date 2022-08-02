import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { deleteImage, uploadImage } from '../helpers/cloudinary';
import Brand from '../models/brands';
import Product from '../models/product';

export const getBrands = async (req: Request, res: Response) => {
    try {
        const brands = await Brand.findAll();

        res.json({
            brands,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'An unexpected error ocurred',
        });
    }
};

export const postBrand = async (req: Request, res: Response) => {
    const { body, files } = req;

    try {
        const brandExists = await Brand.findOne({
            where: { name: body.name },
        });
        if (brandExists) {
            return res.status(400).json({ msg: 'Brand already exists' });
        }

        if (!files) {
            return res.status(404).json({ msg: 'Image is necessary' });
        }
        const { tempFilePath, mimetype } = files.image as UploadedFile;

        const { public_id, url } = await uploadImage(tempFilePath, mimetype);

        body.logo_public_id = public_id;
        body.logo_url = url;

        const newBrand = await Brand.create(body);

        return res.json({ msg: 'Brand created successfuly', brand: newBrand });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'An unexpected error ocurred',
        });
    }
};

export const deleteBrand = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const brand = await Brand.findByPk(id);

        if (!brand) {
            return res.status(404).json({
                msg: 'Brand does not exist',
            });
        }

        const { logo_public_id } = brand.toJSON();

        if (logo_public_id) {
            await deleteImage(logo_public_id);
        }

        await brand.destroy();

        res.json({ msg: 'Brand deleted successfuly' });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'An unexpected error ocurred',
        });
    }
};

export const putBrand = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body, files } = req;

    try {
        const brand = await Brand.findByPk(id);

        if (!brand) {
            return res.status(404).json({ msg: 'Brand does not exist' });
        }

        const { logo_public_id } = brand.toJSON();

        if (files) {
            const { tempFilePath, mimetype } = files.image as UploadedFile;

            await deleteImage(logo_public_id);
            const { url, public_id } = await uploadImage(
                tempFilePath,
                mimetype
            );
            body.logo_public_id = public_id;
            body.logo_url = url;
        }

        const newBrand = await brand.update(body);

        res.json({
            msg: 'Brand updated successfuly',
            brand: newBrand,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'An unexpected error ocurred',
        });
    }
};

export const getBrandByIdAndHisProducts = async (
    req: Request,
    res: Response
) => {
    const { id } = req.params;

    try {
        const brand = await Brand.findByPk(id, {
            include: { model: Product, as: 'products' },
        });

        if (!brand) {
            return res.status(404).json({ msg: 'Brand does not exist' });
        }

        res.json({
            brand,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'An unexpected error ocurred',
        });
    }
};
