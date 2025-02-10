import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const urlShortSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true
    },
    shortenedUrl: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(10)
    },
    userId: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { collection: 'urlShort' }
);

const UrlShort =
  mongoose.models.UrlShort || mongoose.model('UrlShort', urlShortSchema);

export default UrlShort;
