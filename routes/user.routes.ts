import { Router } from 'express';
import { check } from 'express-validator';
import {
    deleteUser,
    getUsers,
    putUser,
    postUser,
    getUser,
} from '../controllers/user.controller';
import { validateJWT } from '../middlewares/jwt-validate';
import { fieldValidator } from '../middlewares/field-validator';
import { isAdmin } from '../middlewares/admin-validator';
const router = Router();
router.use(validateJWT);
router.use(isAdmin);
router.get('/', getUsers);
router.put('/:id', putUser);
router.delete('/:id', deleteUser);
router.post(
    '/new',
    [
        check('name', 'name should be at least 3 characters').isLength({
            min: 3,
        }),
        check('email', 'Invalid email').isEmail(),
        check('password', 'Password should be at least 6 characters').isLength({
            min: 6,
        }),
        fieldValidator,
    ],
    postUser
);
router.get('/:id', getUser);

export default router;
