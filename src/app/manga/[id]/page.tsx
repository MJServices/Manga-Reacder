"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

interface MangaData {
  id: string;
  attributes: {
    title: {
      en: string;
    };
    description: {
      en: string;
    };
    coverImage?: {
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
    const resolveParams = async () => {
      try {
        const resolvedParams = await params;
        setId(resolvedParams.id);
      } catch (err) {
        console.error("Failed to resolve params:", err);
        setError("Failed to resolve parameters.");
      }
    };

    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const fetchMangaData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<MangaResponse>(`/api/summary`, {
          params: { id },
        });

        if (!response.data) {
          throw new Error("Failed to fetch manga data");
        }

        setManga(response.data);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching manga data");
      } finally {
        setLoading(false);
      }
    };

    fetchMangaData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!manga || !manga.data) {
    return <div>No manga data available.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-4">
        {manga.data.attributes.title.en}
      </h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-center mb-2">Description</h2>
        <p className="text-lg text-center">{manga.data.attributes.description.en}</p>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-center mb-2">Status</h2>
        <p className="text-lg text-center">{manga.data.attributes.status}</p>
      </div>
      <div className="text-center">
        <Link
          href="/manga"
          className="text-lg font-semibold text-blue-500 hover:text-blue-700"
        >
          Back to Manga List
        </Link>
      </div>
    </div>
  );
};

export default MangaPage;
