import connectDB from '../lib/db';
import { createShortUrl } from '../controllers/urlController';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'POST') {
    return createShortUrl(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
