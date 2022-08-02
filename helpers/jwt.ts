import jwt from 'jsonwebtoken';

const JWTGen = (uid: string, user: string, role: string) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, user, role };
        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY!,
            {
                expiresIn: '2h',
            },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject('token error');
                } else {
                    resolve(token);
                }
            }
        );
    });
};

export default JWTGen;
