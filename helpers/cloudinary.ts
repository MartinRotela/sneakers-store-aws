import { v2 as cloudinary } from 'cloudinary';

export const uploadImage = async (filePath: string, mimetype: string) => {
    const fileType = mimetype.split('/');

    if (fileType[0] !== 'image') {
        throw new Error('Extension is not supported');
    }
    return await cloudinary.uploader.upload(filePath, {
        folder: 'sneakers',
        transformation: { width: 400, crop: 'fill' },
    });
};

export const deleteImage = async (publicId: string) => {
    return await cloudinary.uploader.destroy(publicId);
};
