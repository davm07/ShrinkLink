import UrlShort from '../models/urlShort.js';

export const createShortUrl = async (req, res) => {
  const { originalUrl, userId } = req.body;

  try {
    const newUrl = await UrlShort.create({
      originalUrl: originalUrl,
      userId: userId
    });
    res.json({ shortUrl: newUrl.shortenedUrl });
  } catch (error) {
    console.error('Error creating new URL:', error);
    res.status(500).json({ error: 'Error creating new URL' });
  }
};

export const getUserUrls = async (req, res) => {
  const { userId } = req.query;

  try {
    const urls = await UrlShort.find({ userId: userId });
    res.json({ urls: urls });
  } catch (error) {
    console.error('Error getting user URLs:', error);
    res.status(500).json({ error: 'Error getting user URLs' });
  }
};

export const redirectUrl = async (req, res) => {
  const { shortUrl } = req.query; // Acceder correctamente a req.params

  try {
    // Buscar la URL acortada en la base de datos
    const urlDocument = await UrlShort.findOne({ shortenedUrl: shortUrl });

    // Si no se encuentra la URL, devolver un error 404
    if (!urlDocument) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    // Redirigir a la URL original
    res.redirect(urlDocument.originalUrl);
  } catch (error) {
    console.error('Error redirecting URL:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
