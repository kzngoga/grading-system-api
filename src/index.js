/* eslint-disable no-console */
import '@babel/polyfill';
import express from 'express';
import fileupload from 'express-fileupload';
import bodyParser from 'body-parser';
import cors from 'cors';

import dbConnect from './database';
import routes from './routes';

const app = express();
dbConnect();

app.enable('trust proxy');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileupload({ useTempFiles: true }));

app.use('/api/v1', routes);

app.get('/', (req, res) => {
  res.send('Welcome');
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
