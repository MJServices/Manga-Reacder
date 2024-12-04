import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface UserPayload {
  id: string;
  username: string;
  email: string;
}

function Navbar() {
  useGSAP(()=>{
    const tl = gsap.timeline();
    tl.from(("header"), {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.5
    })
  }, [])  

  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
  });

  const handleLogout = () => {
    const res = fetch("/api/logout", { method: "GET" });
    res.then((res) => {
      if (res.status === 200) {
        console.log("Logout successful");
      }
    })
    setIsLoggedIn(false);
  };
  useEffect(() => {
    async function checkLoginStatus() {
      const res = fetch("/api/takeCookie", { method: "GET" });
      res.then((res) => {
          if (res.status === 200) {
            const data = res.json();
            data.then((res)=>{
              let { id, username, email } = res.cookie;
              console.log(id, username, email);
              setUser({ id, username, email });
            })
            setIsLoggedIn(true);
          }
      });
    }
    checkLoginStatus()
  }, []);
  
  return (
    <>
      <header className="flex justify-between items-center h-[80px] md:h-[80px] px-4 md:px-16">
        <div className="logo animate-pulse text-green-500 md:text-5xl text-3xl font-bold mt-[4vh]">
          MJ.corps
        </div>
        <div className="hidden md:block self-end">
          {isLoggedIn ? (
            <div className="btn-cont flex gap-4">
              <button
                onClick={handleLogout}
                className="text-zinc-300 hover:text-white hover:border-none overflow-hidden text-xl border relative border-zinc-200 bg py-2 px-5 rounded-3xl before:content-[''] before:h-full before:w-full before:absolute before:bg-[#FF4747] before:left-0 before:top-[110%] before:rounded-3xl before:transition-all before:duration-300 hover:before:top-0 hover:before:rounded-[0]"
              >
                <div className="flex justify-center items-center relative z-[20]">
                  Log Out
                </div>
              </button>
              <Link href={`/profile/${user.id}`}>
              <button className="text-zinc-300 hover:text-white hover:border-none overflow-hidden text-xl border relative border-zinc-200 bg py-2 px-5 rounded-3xl before:content-[''] before:h-full before:w-full before:absolute before:bg-[#35C718] before:left-0 before:top-[110%] before:rounded-3xl before:transition-all before:duration-300 hover:before:top-0 hover:before:rounded-[0]">
                  <div className="flex justify-center items-center relative z-[20]">
                    Profile
                  </div>
                  </button>
              </Link>
            </div>
          ) : (
            <>
              <Link href="/signup">
                <button className="text-zinc-300 hover:text-white hover:border-none overflow-hidden text-xl border relative border-zinc-200 bg py-2 px-5 rounded-3xl before:content-[''] before:h-full before:w-full before:absolute before:bg-[#35C718] before:left-0 before:top-[110%] before:rounded-3xl before:transition-all before:duration-300 hover:before:top-0 hover:before:rounded-[0]">
                  <div className="flex justify-center items-center relative z-[20]">
                    Sign Up
                  </div>
                </button>
              </Link>
              <Link href="/login">
                <button className="text-zinc-300 hover:text-white hover:border-none overflow-hidden text-xl border relative border-zinc-200 bg py-2 px-5 rounded-3xl before:content-[''] before:h-full before:w-full before:absolute before:bg-[#35C718] before:left-0 before:top-[110%] before:rounded-3xl before:transition-all before:duration-300 hover:before:top-0 hover:before:rounded-[0] ml-16">
                  <div className="flex justify-center items-center relative z-[20]">
                    Log In
                  </div>
                </button>
              </Link>
            </>
          )}
        </div>
        <div className="md:hidden -mb-[4vw]">
          <button
            className="text-white focus:outline-none h-10 w-10 flex justify-center items-center"
            id="menu-button"
            onClick={() => setMenuOpen(true)}
          >
            <Image
              src="/icons/ic--round-menu.svg"
              width={24}
              height={24}
              alt="Menu Icon"
              className="w-full h-full"
            />
          </button>
        </div>
      </header>
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-75 z-50 ${
          menuOpen ? "block" : "hidden"
        }`}
        id="mobile-menu"
      >
        <div className="absolute top-0 right-0 w-64 bg-gray-800 h-full shadow-lg p-6">
          <button
            className="text-white focus:outline-none mb-6"
            id="close-menu-button"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src="/icons/material-symbols--close.svg"
              width={24}
              height={24}
              alt="Close Menu Icon"
            />
          </button>
          <div className="mt-8">
            {isLoggedIn ? (
              <div className="btn-cont">
                  <button
                onClick={handleLogout}
                className="block bg-red-600 text-white px-4 py-2 rounded-full text-center hover:bg-red-700 transition duration-300 mb-4"
              >
                Log Out
              </button>
                <Link href={`/profile/${user.id}`}>
                <button className="text-zinc-300 hover:text-white hover:border-none overflow-hidden text-xl border relative border-zinc-200 bg py-2 px-5 rounded-3xl before:content-[''] before:h-full before:w-full before:absolute before:bg-[#35C718] before:left-0 before:top-[110%] before:rounded-3xl before:transition-all before:duration-300 hover:before:top-0 hover:before:rounded-[0]">
                    <div className="flex justify-center items-center relative z-[20]">
                      Profile
                    </div>
                    </button>
                </Link>
              </div>
            ) : (
              <>
                <Link
                  href="/signup"
                  className="block bg-emerald-600 text-white px-4 py-2 rounded-full text-center hover:bg-emerald-700 transition duration-300 mb-4"
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  className="block bg-gray-700 text-white px-4 py-2 rounded-full text-center hover:bg-gray-600 transition duration-300"
                >
                  Log In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
