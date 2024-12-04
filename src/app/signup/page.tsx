"use client";

import Cursor from "@/components/Cursor";
import { useGSAP } from "@gsap/react";
import axios from "axios";
import gsap from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


const page = () => {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    useGSAP(()=>{
        gsap.from("section form", {
            duration: 1,
            opacity: 0,
            delay: 1,
            y: 0,
            ease: "power2.out",
        });
    }, [])
    const onSignup = async () => {
        setLoading(true); // Set loading to true at the start of the function
        try {
            const response = await fetch("/api/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            let data = await response.json();
            console.log("Signup success", data);
            router.push("/login");
        } catch (error:any) {
            console.log("Signup failed", error.message);
            setErrorMsg(error.message);
        }finally {
            setLoading(false); // Set loading to false in the finally block to ensure it's always reset
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

  return (
    <section className="flex h-screen w-screen items-center justify-center bg-zinc-900">
      <style jsx>{`
        /* From Uiverse.io by Satwinder04 */
        /* Input container */
        .input-container {
          position: relative;
          margin: 20px;
        }

        /* Input field */
        .input-field {
          display: block;
          width: 100%;
          padding: 10px;
          font-size: 16px;
          border: none;
          border-bottom: 2px solid #ccc;
          outline: none;
          background-color: transparent;
        }

        /* Input label */
        .input-label {
          position: absolute;
          top: 0;
          left: 0;
          font-size: 16px;
          color: rgba(204, 204, 204, 0);
          pointer-events: none;
          transition: all 0.3s ease;
        }

        /* Input highlight */
        .input-highlight {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          width: 0;
          background-color: #007bff;
          transition: all 0.3s ease;
        }

        /* Input field:focus styles */
        .input-field:focus + .input-label {
          top: -20px;
          font-size: 12px;
          color: #007bff;
        }

        .input-field:focus + .input-label + .input-highlight {
          width: 100%;
        }
        /* From Uiverse.io by nikk7007 */
        .button {
          --color: #00a97f;
          padding: 1em 2.5em; /* Adjusted padding for size */
          background-color: transparent;
          border-radius: 0.3em;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: 0.5s;
          font-weight: 400;
          font-size: 17px;
          border: 1px solid;
          font-family: inherit;
          text-transform: uppercase;
          color: var(--color);
          z-index: 1;
          width: 80%; 
          position: relative;
          left: 50%;
          transform: translateX(-50%);
          mt-10
        }

        .button::before,
        .button::after {
          content: "";
          display: block;
          width: 50px;
          height: 50px;
          transform: translate(-50%, -50%);
          position: absolute;
          border-radius: 50%;
          z-index: -1;
          background-color: var(--color);
          transition: 1s ease;
        }

        .button::before {
          top: -1em;
          left: -1em;
        }

        .button::after {
          left: calc(100% + 1em);
          top: calc(100% + 1em);
        }

        .button:hover::before,
        .button:hover::after {
          height: 410px;
          width: 410px;
        }

        .button:hover {
          color: white; /* Changed text color to white on hover */
        }

        .button:active {
          filter: brightness(0.8);
        }
      `}</style>
      <form className="h-screen w-screen md:h-[90vh] md:w-[30vw] bg-zinc-800 rounded-lg p-5 flex flex-col justify-center">
        <div className="input-container">
          <input
            placeholder="Enter Username"
            className="input-field"
            type="text"
            value={user.username}
            onChange={(e) => setUser({...user, username:e.target.value})}
          />
          <label htmlFor="input-field" className="input-label">
            Enter Username
          </label>
          <span className="input-highlight"></span>
        </div>
        <div className="input-container" style={{ marginTop: "2vw" }}>
          <input
            placeholder="Enter Email"
            className="input-field"
            type="email"
            value={user.email}
            onChange={(e) => setUser({...user, email:e.target.value})}
          />
          <label htmlFor="input-field" className="input-label">
            Enter Email
          </label>
          <span className="input-highlight"></span>
        </div>
        <div className="input-container">
          <input
            placeholder="Enter Password"
            className="input-field"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password:e.target.value})}
          />
          <label htmlFor="input-field" className="input-label">
            Enter Password
          </label>
          <span className="input-highlight"></span>
        </div>
        <div className="btn-cont mt-16 flex flex-col gap-2">
        <p className="error-msg text-red-500 ml-16">{errorMsg}</p>
        <button className="button" type="button" onClick={onSignup} disabled={buttonDisabled}>SIGNUP</button>
        </div>
        
        <Link href={"/login"} className="text-center mt-10">Already have an account? <span className="text-blue-500">Login</span></Link>
      </form>
    </section>
  );
};
export default page;
