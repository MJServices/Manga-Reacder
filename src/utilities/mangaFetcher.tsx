import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const MANGA_API_URL = "https://api.mangadex.org/manga";

export const fetchMangaList = async () => {
  try {
    const response = await axios.get(MANGA_API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
