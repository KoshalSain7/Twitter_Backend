//Imports
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { ConnectDB } from './config/database.js';
import { cloudinaryConnect } from './config/cloudinary.js';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';

//Configuration
dotenv.config({
    path: 'src/config/variables.env'
});

const app = express();


//Middlewares
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    limits: { fileSize: 50 * 1024 * 1024 },
}
));
app.use(morgan('dev'));
app.use(cookieParser());


//APIs
import apiRoutes from './routes/index.js';
app.use('/api', apiRoutes);

//Home Route
app.get('/', (req, res) => {
    res.send('Home')
})

const systemStart = async () => {
    try {
        app.listen(process.env.PORT, () => {
            console.log(`Server(${process.env.PORT}) Started.`);
        })
        ConnectDB();
        setTimeout(() => { cloudinaryConnect() }, 500);
    } catch (error) {
        console.log(`Error In Starting System: ${error}`);
    }
}
systemStart();