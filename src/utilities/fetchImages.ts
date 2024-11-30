import axios from 'axios';

export const fetchRandomImage = async () => {
    const uniqueImages = [];
    for (let i = 0; i < 10; i++) {
      try {
        const response = await axios.get(`https://api.waifu.pics/sfw/kill`);
        const image = response.data;
        console.log(image);
        uniqueImages.push(image.url);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    }

    return uniqueImages;
  };