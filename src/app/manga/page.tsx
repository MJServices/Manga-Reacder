import { useState, useEffect } from "react";
import { fetchRandomImage } from "@/utilities/fetchImages";
import Image from "next/image";
import Link from "next/link";

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

  const [animeImage, setAnimeImage] = useState<string | null>(null); // Store only a single image URL
  const [manga, setManga] = useState<MangaItem[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const images: any[any] = await fetchRandomImage(); // Assuming this fetches an array of 10 images
      setAnimeImage(images); // Set the array of images
      console.log(images);
    };
    fetchImages();

    const fetchData = async () => {
      try {
        console.log("Fetching manga data...");
        const response = await fetch("https://api.mangadex.org/manga", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
          mode: "cors",
        });
        const data = await response.json();
        if (!data.data) {
          console.log("Manga not found");
          return;
        }
        console.log(data);
        setManga(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-[#142422] min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center text-emerald-500 mb-6">
        Anime and Manga List
      </h1>
      <div className="manga-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {manga?.map((item, index) => (
          <div
            key={item.id}
            className="manga-item relative rounded-lg overflow-hidden border border-emerald-700 shadow-md bg-[#1a2e2b] hover:shadow-xl transition duration-300 ease-in-out h-[600px]"
          >
            {animeImage && (
              <Image
                src={animeImage} // Use a single image for all items or assign different images if needed
                alt="Anime Image"
                className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-in-out"
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
        ))}
      </div>
    </div>
  );
};

export default Page;
