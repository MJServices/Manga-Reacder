"use client";
import { useState, useEffect } from "react";
import { fetchRandomImage } from "@/utilities/fetchImages";
import Image from "next/image";
import Link from "next/link";
import { fetchMangaList } from "@/utilities/mangaFetcher";

const Page = () => {
  interface MangaItem {
    id: string;
    attributes: {
      title: {
        en: string;
      };
      description: {
        en: string;
      };
    };
  }

  const [animeImages, setAnimeImages] = useState<string[]>([]); // Store an array of image URLs
  const [manga, setManga] = useState<MangaItem[]>([]);

  useEffect(() => {
    // Fetch random images
    const fetchImages = async () => {
      try {
        const images: string[] = await fetchRandomImage(); // Assuming this fetches an array of 10 images
        setAnimeImages(images); // Set the array of images
        console.log("Fetched Images:", images);
      } catch (error) {
        console.log("Error fetching images:", error);
      }
    };
    fetchImages();

    // Fetch manga data
    const fetchData = async () => {
      try {
        const data = await fetch("/api/manga", { method: "GET" });
        const res = await data.json();
        if (res) {
          console.log("Manga data:", res.data);
          setManga(res.data)
        } else {
          console.log("Manga data is not in the expected format", data);
        }
      } catch (error) {
        console.log("Error fetching manga:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="bg-[#142422] min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center text-emerald-500 mb-6">
        Anime and Manga List
      </h1>
      <div className="manga-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(manga) && manga.length > 0 ? (
          manga.map((item, index) => (
            <div
              key={item.id}
              className="manga-item relative rounded-lg overflow-hidden border border-emerald-700 shadow-md bg-[#1a2e2b] hover:shadow-xl transition duration-300 ease-in-out h-[600px]"
            >
              {/* Display a random anime image for each manga item */}
              {animeImages[index] && (
                <Image
                  src={animeImages[index]} // Use the image from the array
                  alt="Anime Image"
                  className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-in-out"
                  height={600}
                  width={300}
                  unoptimized
                />
              )}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#142422] via-[#000000aa] to-transparent opacity-90"></div>
              <div className="relative z-10 p-6">
                <h2 className="text-2xl font-bold text-emerald-300 mb-3 drop-shadow-md">
                  {item.attributes.title.en}
                </h2>
                <p className="text-gray-100 text-lg line-clamp-3 mb-4 drop-shadow-sm">
                  {item.attributes.description.en}
                </p>
                <Link
                  href={`/manga/${item.id}`}
                  className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition duration-300 ease-in-out shadow-md"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-300">No manga data available</p>
        )}
      </div>
    </section>
  );
};

export default Page;
