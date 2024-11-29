"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUser  } from "@/utilities/getUser";

const ProfilePage = ({ params }: { params: { id: string } }) => {
  const [profile, setProfile] = useState({ username: "", email: "" });
  const [updates, setUpdates] = useState({ username: "", email: "" });
  const [Id, setId] = useState("");


  useEffect(() => {
    const fetchUser  = async () => {
      let {id} = await params
      if (id) {
        try {
          const user: any = await getUser(id);
          setProfile(user);
          setId(user._id);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUser();
  }, []);

  const handleUserChange = async () => {
    try {
      const response = await axios.put("/api/profile", {
        id: Id,
        username: updates.username || profile.username,
        email: updates.email || profile.email,
      });

      setProfile(response.data.updatedUser );
      setUpdates({ username: "", email: "" }); // Reset updates
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <section className="bg-zinc-900 text-white">
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-emerald-400">User  Profile</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              value={profile.username}
              readOnly
              className="bg-zinc-700 text-white p-2 rounded-lg w-full"
            />
            <label className="block text-sm font-medium mb-2">Change Username</label>
            <input
              type="text"
              value={updates.username}
              onChange={(e) => setUpdates({ ...updates, username: e.target.value })}
              className="bg-zinc-700 text-white p-2 rounded-lg w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={profile.email}
              readOnly
              className="bg-zinc-700 text-white p-2 rounded-lg w-full"
            />
            <label className="block text-sm font-medium mb-2">Change Email</label>
            <input
              type="email"
              value={updates.email}
              onChange={(e) => setUpdates({ ...updates, email: e.target.value })}
              className="bg-zinc-700 text-white p-2 rounded-lg w-full"
            />
          </div>

          <button
            onClick={handleUserChange}
            className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-lg w-full"
          >
            Update
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;