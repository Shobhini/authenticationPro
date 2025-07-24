import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/error.middleware.js';
import connectDB from './config/db.js';
import userRoutes from './routes/user.route.js';


const port = process.env.PORT || 5000;
connectDB();

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cookieParser()); // for parsing cookies
app.use('/api/users', userRoutes);

app.get('/', (req, res) => res.send('Hello, World!'));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));