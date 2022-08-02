import { Router } from 'express';
import { check } from 'express-validator';
import { fieldValidator } from '../middlewares/field-validator';
import { authUser, renewUser } from '../controllers/auth.controller';
import { validateJWT } from '../middlewares/jwt-validate';

const router = Router();

router.post(
    '/',
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Password should be at least 6 characters').isLength({
            min: 6,
        }),
        fieldValidator,
    ],
    authUser
);
router.get('/renew', validateJWT, renewUser);

export default router;
