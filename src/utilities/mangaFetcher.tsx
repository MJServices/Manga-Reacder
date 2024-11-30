import axios from "axios";

export const fetchMangaList = async () => {
  const targetUrl = 'https://api.mangadex.org/manga';
  const response = await axios.get(targetUrl);
  const data = response.data;
  return data;
};
