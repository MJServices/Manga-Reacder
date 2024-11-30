import axios from "axios";
import { NextApiResponse } from "next";
export const fetchMangaList = async () => {
  try {
      // res.setHeader('Access-Control-Allow-Origin', '*')
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
  } catch (error) {
    console.log(error)
  }
};
