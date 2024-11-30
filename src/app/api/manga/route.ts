import axios from "axios";

export async function GET(req: Request) {
  try {
    // Fetch manga list from external API
    const response = await axios.get("https://api.mangadex.org/manga");
    const mangaList = response.data;

    // Define CORS headers
    const headers = {
      "Access-Control-Allow-Origin": "*",  // Allow all origins
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",  // Allow these HTTP methods
      "Access-Control-Allow-Headers": "Content-Type",  // Allow these headers
    };

    // If the method is OPTIONS (pre-flight request), respond immediately with CORS headers
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: {
          ...headers,
        },
      });
    }

    // Return the manga list as JSON with proper CORS headers
    return new Response(JSON.stringify(mangaList), {
      status: 200,
      headers: {
        ...headers,
        "Content-Type": "application/json", // Ensure the content type is JSON
      },
    });
  } catch (error) {
    console.error("Error fetching manga list:", error);

    return new Response("Error fetching manga list", {
      status: 500,
    });
  }
}
