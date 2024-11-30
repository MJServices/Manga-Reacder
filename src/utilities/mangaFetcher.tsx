import axios from "axios";

export const fetchMangaList = async () => {
  const targetUrl = 'https://api.mangadex.org/manga';
  const response = await axios.get('https://api.mangadex.org/manga', {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  }
  );
  const data = response.data;
  console.log(data)
  return data;
};
