/* eslint-disable no-undef */
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './lib/db.js';
import cors from 'cors';
import {
  createShortUrl,
  redirectUrl,
  getUserUrls
} from './controllers/urlController.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/shrink', createShortUrl);
app.get('/:shortUrl', redirectUrl);
app.get('/api/urls/:userId', getUserUrls);

const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();

export default app;
