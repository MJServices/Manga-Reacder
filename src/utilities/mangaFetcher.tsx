import axios from 'axios';
import { NextApiResponse } from 'next';

export const fetchMangaList = async (res: NextApiResponse) => {
  const response = await axios.get("https://api.mangadex.org/manga");
  res.setHeader('Content-Type', 'image/gif');
  return response.data;
};