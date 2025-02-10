import connectDB from '../lib/db';
import { getUserUrls } from '../controllers/urlController';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    return getUserUrls(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
