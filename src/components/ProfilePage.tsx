// components/ProfilePage.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUser } from "@/utilities/getUser";

interface ProfilePageProps {
  params: {
    id: string;
  };
}

interface UserProfile {
  _id: string;
  username: string;
  email: string;
}

interface UserUpdates {
  username: string;
  email: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ params }) => {
  const [profile, setProfile] = useState<UserProfile>({
    _id: "",
    username: "",
    email: ""
  });

  const [updates, setUpdates] = useState<UserUpdates>({
    username: "",
    email: ""
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const user = await getUser(params.id);
        setProfile(user);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user profile");
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [params.id]);

  const handleUserChange = async () => {
    try {
      if (!profile._id) {
        setError("No user ID available");
        return;
      }

      const response = await axios.put("/api/profile", {
        id: profile._id,
        username: updates.username || profile.username,
        email: updates.email || profile.email,
      });

      setProfile(response.data.updatedUser);
      setUpdates({ username: "", email: "" });
      setError(null);
    } catch (error) {
      console.error("Error updating user data:", error);
      setError("Failed to update profile");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-white">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <section className="bg-zinc-900 text-white">
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-emerald-400">User Profile</h2>

          {error && (
            <div className="mb-4 text-red-500 bg-red-100 p-2 rounded">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              value={profile.username}
              readOnly
              className="bg-zinc-700 text-white p-2 rounded-lg w-full"
            />
            <label className="block text-sm font-medium mb-2 mt-2">Change Username</label>
            <input
              type="text"
              value={updates.username}
              onChange={(e) => setUpdates({ 
                ...updates, 
                username: e.target.value 
              })}
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
            <label className="block text-sm font-medium mb-2 mt-2">Change Email</label>
            <input
              type="email"
              value={updates.email}
              onChange={(e) => setUpdates({ 
                ...updates, 
                email: e.target.value 
              })}
              className="bg-zinc-700 text-white p-2 rounded-lg w-full"
            />
          </div>

          <button
            onClick={handleUserChange}
            className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-lg w-full"
          >
            Update Profile
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;