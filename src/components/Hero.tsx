"use client";

import { Oswald } from "next/font/google";
import Image from "next/image";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["300", "400", "500", "700"],
});

const Hero = () => {
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(("section .group"),{
      opacity: 0,
      duration: 1,
      delay: 1
    })
    tl.to(("section span"),{
      height: "70px",
      duration: 2,
    })
  }, []);
  return (
    <section className="h-[87.5vh] w-screen flex flex-col items-center justify-between md:block pt-7 md:pt-24 px-3 md:px-16 hero-section relative">
        <div className="scroll flex justify-center items-center absolute left-[44vw] -translate-x-1/2 h-16 w-16 rounded-full bottom-2 border border-zinc-200 animate-bounce">
        <Image src="/icons/line-md--arrow-down.svg" width={24} height={24} alt="Arrow Down Icon" />
        </div>
      <div className="group">
        <div className="w-[80%] md:w-[40%] mt-16 md:m-0 ">
          <h1
            className={`${oswald.className} text-white text-7xl md:text-8xl font-bold tracking-tight`}
          >
            WANT TO READ
            <span
              style={{ height: "0px" }}
              className="overflow-hidden w-[110px] h-[80px] inline-block rounded-lg relative top-1 md:-top-1 ml-2"
            >
              <Image
                src="/images/photo-1576502200916-3808e07386a5.webp"
                alt="Image"
                width={110}
                height={80}
                priority
                unoptimized
              />
            </span>{" "}
            SOMETHING
          </h1>
        </div>
        <Link href="/manga" >
          <button className="text-white bg-[#35C718] px-6 py-3 mt-12 rounded-full text-xl hover:bg-emerald-600">Get Started</button>
        </Link>
        
      </div>
     
    </section>
  );
};

export default Hero;
