"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface MangaData {
  id: string;
  attributes: {
    title: {
      en: string;
    };
    description: {
      en: string;
    };
    coverImage: {
      url: string;
    };
    status: string;
  };
}

interface MangaResponse {
  data: MangaData;
}

const MangaPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [manga, setManga] = useState<MangaResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [id, setId] = useState<string>("");

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };

    fetchParams();
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const fetchMangaData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.mangadex.org/manga/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch manga data");
        }

        const mangaData = await response.json() as MangaResponse;
        setManga(mangaData);
        console.log(mangaData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMangaData();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!manga || !manga.data) {
    return <div>No manga data available.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-4">{manga.data.attributes.title.en}</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-center mb-2">Description</h2>
        <p className="text-lg text-center">{manga.data.attributes.description.en}</p>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-center mb-2">Status</h2>
        <p className="text-lg text-center">{manga.data.attributes.status}</p>
      </div>
      <div className="text-center">
        <Link href="/manga" className="text-lg font-semibold text-blue-500 hover:text-blue-700">Back to Manga List</Link>
      </div>
    </div>
  );
};

export default MangaPage;