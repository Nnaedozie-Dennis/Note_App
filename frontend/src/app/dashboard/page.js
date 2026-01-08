
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Edit2, Trash2 } from "lucide-react";

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
        <div className="min-h-screen bg-linear-to-br from-indigo-50 to-indigo-100 flex items-center justify-center">
        <p className="text-xl sm:text-2xl text-gray-700">Loading your notes...</p>
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

      setNotes(notes.filter((n) => n._id !== noteId));
    } catch (err) {
      alert("Error deleting note");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50  to-indigo-100 ">
      <header className="bg-white/90 backdrop-blur-md shadow-lg fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            My Notes
          </h1>
          <div className="flex items-center gap-3 sm:gap-6">
            <button
              onClick={handleLogout}
              className="px-3 sm:px-4 py-2 sm:py-3 bg-red-500 text-white font-semibold rounded-lg sm:rounded-xl hover:bg-red-300 transition shadow-md cursor-pointer text-sm sm:text-base"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 ">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-16 sm:pt-22">
          <p className="text-2xl sm:text-3xl font-bold text-gray-800">
            {userName} Notes
          </p>
          <button
            onClick={() => router.push("/notes/new")}
            className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-linear-to-r from-indigo-600 to-indigo-500 text-white font-medium rounded-lg sm:rounded-lg hover:shadow-lg transition shadow-md cursor-pointer text-sm sm:text-base"
          >
            + New Note
          </button>
        </div>

        {notes.length === 0 ? (
          <div className="text-center py-16 sm:py-20">
            <p className="text-xl sm:text-2xl text-gray-600 mb-6 sm:mb-8">
              You don't have any notes yet.
            </p>
            <button
              onClick={() => router.push("/notes/new")}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-indigo-600 to-indigo-500 text-white text-lg sm:text-xl font-bold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition"
            >
              Create Your First Note
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 ">
            {notes.map((note) => (
              <div
                key={note._id}
                className="bg-white rounded-lg sm:rounded-2xl shadow-lg sm:shadow-xl p-6 sm:p-8 hover:shadow-2xl transition transform hover:-translate-y-2 relative flex flex-col h-60 sm:h-80 max-h-80 border-2 border-violet-500/50 cursor-pointer"
              >
                <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 line-clamp-2">
                  {note.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-5 line-clamp-4 grow">
                  {note.content}
                </p>


                {note.tags && note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-6 ">
                    {note.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 sm:px-4 sm:py-2 bg-indigo-100 text-indigo-700 text-xs sm:text-sm font-medium rounded-full "
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="text-xs text-gray-500 mt-auto ">
                  <p>
                    Created:{" "}
                    {new Date(note.createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  {note.createdAt !== note.updatedAt && (
                    <p>
                      Updated:{" "}
                      {new Date(note.updatedAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  )}
                </div>


                <div className="absolute bottom-6 sm:bottom-9 right-4 sm:right-6 flex gap-2 sm:gap-3 ">
                  <button
                    onClick={() => router.push(`/notes/${note._id}/edit`)}
                    className="p-2 sm:p-2.5 text-[#6bc1ff] hover:bg-[#6bc1ff]/30  rounded-lg transition cursor-pointer"
                    title="Edit note"
                  >
                    <Edit2 size={18} className="sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="p-2 sm:p-2.5  text-[#ff6b6b] hover:bg-[#ff6b6b]/30 rounded-lg transition cursor-pointer"
                    title="Delete note"
                  >
                    <Trash2 size={18} className="sm:w-5 sm:h-5" />
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
