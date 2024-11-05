import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors'
import errorHandler from './utils/errorController';
import appError from './utils/appError';
import userRouter from './routes/userRouter';
import blogRouter from './routes/blogRouter';
import commentRouter from './routes/commentRouter';

import 'dotenv/config';

const app = express();

// GLOBAL MIDDLWARE

app.use(helmet()); // Helmet helps secure Express apps by setting various HTTP headers.
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRouter);
app.use('/api/blogs', blogRouter);

app.use('/api/comments', commentRouter);

app.all('*', (req, res, next) => {
  next(new appError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(errorHandler);

app.get('/', (req, res) =>
  res.status(200).send({
    message: 'welcome to The Blog API',
  }),
);
export default app;
