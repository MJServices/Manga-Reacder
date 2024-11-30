import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    try {
        const response = await fetch(`https://api.mangadex.org/manga/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
          });;
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching summary:", error);
        return NextResponse.json({ error: "Failed to fetch summary" }, { status: 500 });
    }
}