"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Cursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Smoothly animate the cursor to the mouse position
      gsap.to(cursorRef.current, {
        x: event.clientX, // Offset to center the cursor
        y: event.clientY,
        duration: 0.2, // Smoothness of the movement
        ease: "power2.out", // Easing for smoother motion
      });
    };

    // Add mouse move listener
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup listener on component unmount
    // return () => {
    //   window.removeEventListener("mousemove", handleMouseMove);
    // };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="h-72 w-72 bg-[#95ed4828] filter blur-3xl fixed pointer-events-none"
      style={{
        position: "fixed",
        transform: "translate(-50%, -50%)", // Center the cursor naturally
      }}
    />
  );
};

export default Cursor;
