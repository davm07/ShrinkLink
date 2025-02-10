import connectDB from '../lib/db.js';
import { redirectUrl } from '../controllers/urlController.js';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    return redirectUrl(req, res);
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
