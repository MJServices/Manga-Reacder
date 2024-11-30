export const fetchMangaList = async () => {
  const targetUrl = 'https://api.mangadex.org/manga';
  const response = await fetch(targetUrl);
  const data = await response.json();
  return data;
};
