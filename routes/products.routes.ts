import { Router } from 'express';
import { check } from 'express-validator';
import {
    getProducts,
    getProductById,
    postProduct,
    putProduct,
    deleteProduct,
} from '../controllers/product.controller';
import { fieldValidator } from '../middlewares/field-validator';
import { validateJWT } from '../middlewares/jwt-validate';
import { isAdmin } from '../middlewares/admin-validator';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post(
    '/new',
    [
        validateJWT,
        isAdmin,
        check('name', 'Name should be at least 3 characters').isLength({
            min: 3,
        }),
        check('price', 'Price can not be empty').notEmpty(),
        check('price', 'Price should be a number').isFloat(),
        check('BrandId', 'Brand is needed').isNumeric(),
        fieldValidator,
    ],
    postProduct
);
router.put(
    '/:id',
    [
        validateJWT,
        check('name', 'Name should be at least 3 characters').isLength({
            min: 3,
        }),
        check('price', 'Price can not be empty').notEmpty(),
        check('price', 'Price should be a number').isFloat(),
        check('BrandId', 'Brand is needed').isNumeric(),
        fieldValidator,
    ],
    putProduct
);
router.delete('/:id', [validateJWT, isAdmin], deleteProduct);

export default router;
