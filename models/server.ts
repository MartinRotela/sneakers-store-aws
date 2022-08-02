import express, { Application } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import fileUpload from 'express-fileupload';
import userRoutes from '../routes/user.routes';
import authRoutes from '../routes/auth.routes';
import productRoutes from '../routes/products.routes';
import brandRoutes from '../routes/brand.routes';
import searchRoutes from '../routes/search.routes';
import db from '../database/connection';
import '../database/asociations';

class Server {
    private app: Application;
    private port: string;
    private apiPath = {
        users: '/api/users',
        auth: '/api/auth',
        products: '/api/products',
        brands: '/api/brands',
        search: '/api/search',
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    //db connection
    async dbConnection() {
        try {
            await db.sync();

            console.log('Database online');
        } catch (error) {
            console.log(error);
            throw new Error('An unexpected error ocurred');
        }
    }

    middlewares() {
        //Cors
        this.app.use(cors());

        //Parse
        this.app.use(express.json());

        //Image upload
        this.app.use(
            fileUpload({
                useTempFiles: true,
                tempFileDir: '/tmp/',
            })
        );

        //Image host
        this.cloudinary();

        //Public
        this.app.use(express.static('public'));
    }

    cloudinary() {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto' + this.port);
        });
    }

    routes() {
        this.app.use(this.apiPath.users, userRoutes);
        this.app.use(this.apiPath.auth, authRoutes);
        this.app.use(this.apiPath.products, productRoutes);
        this.app.use(this.apiPath.brands, brandRoutes);
        this.app.use(this.apiPath.search, searchRoutes);
    }
}

export default Server;
