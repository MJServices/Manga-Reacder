import axios from "axios";

export async function GET(req: Request) {
  try {
    const response = await axios.get("https://api.mangadex.org/manga");
    const mangaList = response.data;

    const headers = {
      "Access-Control-Allow-Origin": "*",  
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",  
    };

    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: {
          ...headers,
        },
      });
    }

    return new Response(JSON.stringify(mangaList), {
      status: 200,
      headers: {
        ...headers,
        "Content-Type": "application/json", 
      },
    });
  } catch (error) {
    console.error("Error fetching manga list:", error);

    return new Response("Error fetching manga list", {
      status: 500,
    });
  }
}
