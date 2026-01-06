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
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-8 text-center">
          Create New Note
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-2xl p-10 space-y-8"
        >
          <div>
            <label className="note-title">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="note-content note-content:focus"
              placeholder="Give your note a great title..."
            />
          </div>

          <div>
            <label className="note-title">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows="6"
              className="note-content note-content:focus"
              placeholder="Write your thoughts here..."
            />
          </div>

          <div>
            <label className="note-title">
              Tags (optional, comma-separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="note-content note-content:focus"
              placeholder="work, personal, ideas"
            />
          </div>

          <div className="flex gap-6 justify-center">
            <button
              type="submit"
              disabled={loading}
              className="submit-btn submit-btn:hover submit-btn:disabled"
            >
              {loading ? "Saving..." : "Save Note"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="cancel-btn cancel-btn:hover"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
