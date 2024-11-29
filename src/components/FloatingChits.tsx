"use client";
import Image from "next/image";
import { useState } from "react";

const FloatingChits = () => {
  const [Images, setImages] = useState([
    {
      img: "https://imgs.search.brave.com/pm3mkOM_g_lrLL-LxAD1afquaiWNxBGOICB0Ym4bwzk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nbWFydC5jb20v/ZmlsZXMvMy9EcmFn/b24tQmFsbC1Hb2t1/LVRyYW5zcGFyZW50/LUJhY2tncm91bmQu/cG5n",
      alt: "Image 1",
    },
    {
      img: "https://imgs.search.brave.com/Ve4I55MxUdrZtB1a-6ubBoJQFZb3IHYiO6qP8hiJ3CY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5ncGxheS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzEyL05h/cnV0by1Oby1CYWNr/Z3JvdW5kLTEucG5n",
      alt: "Image 2",
    },
    {
      img: "https://imgs.search.brave.com/fnyFJYWa22QwYV4GmXYc6RFOJJkET_GpQR7ebBZJW9k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wbHVz/cG5nLmNvbS9pbWct/cG5nL29uZS1waWVj/ZS1wbmctaW1hZ2Ut/bHVmZnktb25lLXBp/ZWNlLXVubGltaXRl/ZC1hZHZlbnR1cmUt/b3V0Zml0LXBuZy1v/bmUtcGllY2Utd2lr/aS1mYW5kb20tcG93/ZXJlZC1ieS13aWtp/YS00NDEucG5n",
      alt: "Image 3",
    },
  ]);
  return (
    <section style={{overflow: "hidden"}} className="h-screen w-screen bg-zinc-800 flex justify-evenly items-center">
      {Images.map((image, index) => (
        <div
          key={index}
          className={`max-w-sm image image-${index + 1}`}
          style={{
            width: "100%",
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            margin: "0 0 10px 0",
          }}
        >
          <div className="flex flex-col justify-between items-center">
            <Image
              src={image.img}
              alt={image.alt}
              layout="responsive"
              width={500}
              height={300}
              style={{ display: "block", margin: "auto" }}
            />
          </div>
        </div>
      ))}
    </section>
  );
};
export default FloatingChits;
