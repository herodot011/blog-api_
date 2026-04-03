import dotenv from 'dotenv';
dotenv.config();

import helmet from 'helmet';
import cors from 'cors';

import express from 'express';
import postsRouter from './routes/posts';
import categoriesRouter from './routes/categories';
import authRouter from './routes/auth';
import errorHandler from './middlewares/errorHandler';
import notFound from './middlewares/notFound';

import './models/user';
import './models/post';
import './models/category';

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());

app.use('/posts', postsRouter);
app.use('/categories', categoriesRouter);
app.use('/auth', authRouter);

app.use(notFound);
app.use(errorHandler);

export default app;