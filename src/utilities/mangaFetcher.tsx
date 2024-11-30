// Example for fetchMangaList()
export const fetchMangaList = async () => {
  try {
    const response = await fetch("https://api.mangadex.org/manga");
    if (!response.ok) {
      throw new Error("Failed to fetch manga data");
    }
    const data = await response.json();
    return data; // return the entire response or the specific data you need
  } catch (error) {
    console.error("Error fetching manga:", error);
    throw error;
  }
};
