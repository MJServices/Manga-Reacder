import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

// Use your own proxy or handle CORS properly
const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const MANGA_API_URL = "https://api.mangadex.org/manga";

export const fetchMangaList = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Make the request with a proxy (if necessary)
    const response = await axios.get(PROXY_URL + MANGA_API_URL);

    // Check if response is valid
    if (response.status === 200) {
      // Set correct headers for JSON response
      res.setHeader('Content-Type', 'application/json');

      // Return the manga list data
      res.status(200).json(response.data);
    } else {
      // If the API request fails
      res.status(response.status).json({ error: 'Failed to fetch manga list' });
    }
  } catch (error) {
    // Handle any errors during the request
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching manga data' });
  }
};
