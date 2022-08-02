import { Router } from 'express';
import { check } from 'express-validator';
import {
    getBrands,
    postBrand,
    putBrand,
    deleteBrand,
    getBrandByIdAndHisProducts,
} from '../controllers/brand.controller';
import { validateJWT } from '../middlewares/jwt-validate';
import { fieldValidator } from '../middlewares/field-validator';
import { isAdmin } from '../middlewares/admin-validator';

const router = Router();

router.get('/', getBrands);
router.get('/:id', getBrandByIdAndHisProducts);
router.post(
    '/new',
    [
        validateJWT,
        isAdmin,
        check('name', 'Name should have at least 3 characters').isLength({
            min: 3,
        }),
        fieldValidator,
    ],
    postBrand
);
router.put(
    '/:id',
    [
        validateJWT,
        check('name', 'Name should have at least 3 characters').isLength({
            min: 3,
        }),
        fieldValidator,
    ],
    putBrand
);
router.delete('/:id', [validateJWT, isAdmin], deleteBrand);

export default router;
