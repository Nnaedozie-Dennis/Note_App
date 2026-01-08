
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

export default function EditNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  // const [fetching, setFetching] = useState(true);
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
      } 
      // finally {
      //   setFetching(false);
      // }
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
    } 
    // finally {
    //   setLoading(false);
    // }
  };

  // if (fetching)
  //   return
  //  <div className="min-h-screen bg-linear-to-br from-indigo-50 to-indigo-100 flex items-center justify-center">
  //    <p className="text-xl sm:text-2xl text-gray-700">Loading your notes...</p>
  //  </div>;

  return (
    <div className="min-h-screen bg-gray-100 py-8 sm:py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8 sm:mb-10 text-center">
          Edit Note
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-6 sm:p-10 space-y-6 sm:space-y-8"
        >

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

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <button
              type="submit"
              disabled={loading}
              className="submit-btn submit-btn:hover submit-btn:disabled w-full sm:w-auto"
            >
              {loading ? "Saving..." : "Update Note"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="cancel-btn cancel-btn:hover w-full sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
