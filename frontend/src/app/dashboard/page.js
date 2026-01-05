// src/app/dashboard/page.js
// Dashboard - main screen where users see and manage their notes
// Fetches real notes from backend using the saved token

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/notes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(res.data);
        setUserName(localStorage.getItem("userName") || "User");
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userName");
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <p className="text-2xl text-gray-700">Loading your notes...</p>
      </div>
    );
  }

  const handleDelete = async (noteId) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/notes/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove from UI immediately
      setNotes(notes.filter((n) => n._id !== noteId));
    } catch (err) {
      alert("Error deleting note");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">My Notes</h1>
          <div className="flex items-center gap-6">
            <p className="text-lg text-gray-700">Hello, {userName}!</p>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition shadow-lg"
            >
              Logout
            </button>
          </div>
          <div className="text-center mb-12">
            <button
              onClick={() => router.push("/notes/new")}
              className="px-10 py-5 bg-linear-to-r from-indigo-600 to-purple-600 text-white text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-indigo-500/50 transform hover:scale-105 transition duration-300"
            >
              + Create New Note
            </button>
          </div>
        </div>
      </header>

      {/* Notes Grid */}
      <div className="max-w-7xl mx-auto p-8">
        {notes.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-600 mb-8">
              You don't have any notes yet.
            </p>
            <button
              onClick={() => router.push("/notes/new")}
              className="px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition"
            >
              Create Your First Note
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {notes.map((note) => (
              <div
                key={note._id}
                className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition transform hover:-translate-y-2 relative"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {note.title}
                </h3>
                <p className="text-gray-700 mb-6 line-clamp-4">
                  {note.content}
                </p>
                {/* Tags - show as nice pill badges */}
                {note.tags && note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {note.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="text-sm text-gray-500 mb-6">
                  Created: {new Date(note.createdAt).toLocaleDateString()}
                </div>

                {/* Action buttons */}
                <div className="absolute top-6 right-6 flex gap-4">
                  <button
                    onClick={() => router.push(`/notes/${note._id}/edit`)}
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
