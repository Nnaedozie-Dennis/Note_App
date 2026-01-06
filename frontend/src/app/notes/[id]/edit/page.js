// src/app/notes/[id]/edit/page.js
// Edit existing note - loads current data, updates on save

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

export default function EditNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/notes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const note = res.data;
        setTitle(note.title);
        setContent(note.content);
        setTags(note.tags?.join(", ") || "");
      } catch (err) {
        alert("Note not found or unauthorized");
        router.push("/dashboard");
      } finally {
        setFetching(false);
      }
    };

    if (id) fetchNote();
  }, [id, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/notes/${id}`,
        {
          title,
          content,
          tags: tags
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      router.push("/dashboard");
    } catch (err) {
      alert("Error updating note");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (fetching)
    return <div className="loading-screen">Loading note...</div>;

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-10 text-center">
          Edit Note
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-2xl p-10 space-y-8"
        >
          {/* Same form fields as create, just pre-filled */}
          <div>
            <label className="note-title">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="note-content note-content:focus"
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
            />
          </div>

          <div>
            <label className="note-title">Tags (comma-separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="note-content note-content:focus"
            />
          </div>

          <div className="flex gap-6 justify-center">
            <button
              type="submit"
              disabled={loading}
              className="submit-btn submit-btn:hover submit-btn:disabled"
            >
              {loading ? "Saving..." : "Update Note"}
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
