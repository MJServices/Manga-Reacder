"use client";

import { useEffect, useState } from "react";
import { Roboto } from "next/font/google";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";



const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
});

function Intro({ onDataTransfer }: any) {
  useGSAP(()=>{
    const tl = gsap.timeline();
    tl.from("h1",{
      y: 20,
      opacity: 0,
      duration: 0.5,
      delay: 0.5
    })
    tl.from("button",{
      y: 20,
      opacity: 0,
      duration: 1,
      stagger: 0.2
    })
  }, []);
  const [click, setClick] = useState(false);
  return (
    <section suppressHydrationWarning>
  <style jsx>{`
    .excite-btn::before {
      content: "Enjoy !";
      background-color: rgb(53, 199, 24);
      position: absolute;
      top: 75px;
      left: -15%;
      width: 130%;
      height: 50px;
      z-index: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.5rem;
      color: black;
      transform: rotate(0deg);
      transition: all 0.1s ease-in-out;
    }
    .excite-btn:hover::before {
      top: 13px;
      transform: rotate(-15deg);
    }

    @media (max-width: 768px) {
      .excite-btn::before {
        font-size: 1rem;
        top: 60px;
      }
      .excite-btn:hover::before {
        top: 10px;
      }
    }

    @media (max-width: 480px) {
      .excite-btn::before {
        font-size: 0.85rem;
        width: 110%;
      }
    }
  `}</style>
  <section className="slide1 bg-black w-screen h-screen text-emerald-500 flex justify-center items-center">
    <section className="flex justify-center items-center flex-col">
      <h1
        className={`text-[6vw] sm:text-[35px] w-[90vw] text-center ${roboto.className}`}
      >
        Here is{" "}
        <span className="animate-pulse mx-1 sm:mx-3">something</span> exciting
        for you
      </h1>
      <div className="btn-cont flex justify-center items-center w-[80vw] sm:w-2/3 md:w-1/2 h-[30vh] sm:h-[250px] relative">
        <div
          style={{ filter: "blur(160px)" }}
          className="absolute z-0 w-full h-full flex justify-evenly items-center bg-[#143808] rounded-full"
        ></div>
        <button
          onClick={() => {
            setClick(true);
            onDataTransfer(true);
          }}
          className="excite-btn z-10 bg-transparent border-[.5px] border-zinc-600 px-6 py-4 sm:px-10 sm:py-5 rounded-lg text-emerald-700 text-lg sm:text-2xl relative overflow-hidden"
        >
          Excite me
        </button>
        <button
          onClick={() => {
            console.log("clicked");
            setClick(true);
            onDataTransfer(false);
          }}
          className="z-10 bg-green-500 border-[.5px] border-zinc-600 px-4 py-4 sm:px-6 sm:py-5 rounded-lg text-zinc-200 text-lg sm:text-2xl relative overflow-hidden ml-2"
        >
          Don't
        </button>
      </div>
    </section>
  </section>
</section>

  );
}
export default Intro;
