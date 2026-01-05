// src/app/notes/new/page.js
// Page for creating a new note
// Sends data to backend /api/notes

"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function NewNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/notes",
        {
          title,
          content,
          tags: tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      router.push("/dashboard");
    } catch (err) {
      alert("Error creating note");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-10 text-center">
          Create New Note
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-2xl p-10 space-y-8"
        >
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-3">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-6 py-4 text-lg border border-gray-300 rounded-2xl focus:ring-4 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Give your note a great title..."
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-3">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows="12"
              className="w-full px-6 py-4 text-lg border border-gray-300 rounded-2xl focus:ring-4 focus:ring-indigo-500 focus:border-transparent resize-none"
              placeholder="Write your thoughts here..."
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-3">
              Tags (optional, comma-separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-6 py-4 text-lg border border-gray-300 rounded-2xl focus:ring-4 focus:ring-indigo-500 focus:border-transparent"
              placeholder="work, personal, ideas"
            />
          </div>

          <div className="flex gap-6 justify-center">
            <button
              type="submit"
              disabled={loading}
              className="px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-indigo-500/50 transform hover:scale-105 transition duration-300 disabled:opacity-70"
            >
              {loading ? "Saving..." : "Save Note"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="px-10 py-5 bg-gray-300 text-gray-800 text-xl font-bold rounded-2xl hover:bg-gray-400 transition shadow-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
