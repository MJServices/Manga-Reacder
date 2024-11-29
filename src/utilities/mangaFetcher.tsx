import axios from 'axios';

export const fetchMangaList = async () => {
  const response = await axios.get("https://api.mangadex.org/manga");
  return response.data;
};