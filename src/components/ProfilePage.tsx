"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface ProfilePageProps {
  params: Promise<{ id: string }>;
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
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [updates, setUpdates] = useState<UserUpdates>({
    username: "",
    email: "",
  });
  const [id, setId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Resolve the params and set the ID
  useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolvedParams = await params;
        setId(resolvedParams.id);
      } catch (err) {
        console.error("Failed to resolve params:", err);
        setError("Failed to resolve parameters.");
      }
    };

    resolveParams();
  }, [params]);

  // Fetch the user profile when ID is available
  useEffect(() => {
    if (!id) return;

    const fetchUserProfile = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/getUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });
        const data = await response.json();
        if (!data) {
          throw new Error("Failed to fetch user profile");
        }

        setProfile(data);
      } catch (err: any) {
        console.error("Error fetching user profile:", err);
        setError(
          err.response?.data?.error ||
            "An error occurred while fetching the profile."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [id]);

  // Handle profile updates
  const handleUserChange = async () => {
    if (!profile) {
      setError("No profile data available to update.");
      return;
    }

    try {
      const response = await axios.put<UserProfile>("/api/profile", {
        id: profile._id,
        username: updates.username || profile.username,
        email: updates.email || profile.email,
      });

      setProfile(response.data);
      setUpdates({ username: "", email: "" });
      setError(null);
      location.reload();
    } catch (err: any) {
      console.error("Error updating profile:", err);
      setError(err.response?.data?.error || "Failed to update profile.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading profile...</p>
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

  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>No user profile available.</p>
      </div>
    );
  }

  return (
    <section className="bg-zinc-900 text-white">
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-[100vw] h-[100vh] flex flex-col gap-3 justify-center max-w-md md:h-auto">
          <h2 className="text-2xl font-bold mb-6 text-emerald-400">
            User Profile
          </h2>
  
          <div className="mb-4">
            <label className="block text-base font-medium mb-2">Username</label>
            <input
              type="text"
              value={profile.username}
              readOnly
              className="bg-zinc-700 text-white p-3 rounded-lg w-full"
            />
            <label className="block text-base font-medium mb-2 mt-2">
              Change Username
            </label>
            <input
              type="text"
              value={updates.username}
              onChange={(e) =>
                setUpdates({ ...updates, username: e.target.value })
              }
              className="bg-zinc-700 text-white p-3 rounded-lg w-full"
            />
          </div>
  
          <div className="mb-4">
            <label className="block text-base font-medium mb-2">Email</label>
            <input
              type="email"
              value={profile.email}
              readOnly
              className="bg-zinc-700 text-white p-3 rounded-lg w-full"
            />
            <label className="block text-base font-medium mb-2 mt-2">
              Change Email
            </label>
            <input
              type="email"
              value={updates.email}
              onChange={(e) =>
                setUpdates({ ...updates, email: e.target.value })
              }
              className="bg-zinc-700 text-white p-3 rounded-lg w-full"
            />
          </div>
  
          <button
            onClick={handleUserChange}
            className="bg-emerald-500 hover:bg-emerald-600 text-emerald
             p-2 rounded-lg w-full"
          >
            Update Profile
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;