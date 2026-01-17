"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomeButtons() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://note-app-k88k.onrender.com/api/auth/demo",
        {
          method: "POST",
        }
      );
      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.user.name);
        router.push("/dashboard");
      } else {
        alert("Demo login failed. Is the backend running?");
      }
    } catch (err) {
      alert("Network error. Check if backend is running on port 5000.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center w-full">
      <button
        onClick={handleDemoLogin}
        disabled={loading}
        className="w-full sm:w-auto px-6 sm:px-10 py-3 bg-linear-to-r from-indigo-600 to-indigo-800 text-white sm:py-5 text-lg sm:text-xl font-bold rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-white/30 transform hover:scale-105 transition duration-300 cursor-pointer"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="h-5 w-5 animate-spin text-white"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </span>
        ) : (
          "Try Demo Now →"
        )}
      </button>

      <button
        onClick={() => router.push("/register")}
        className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-5 bg-white text-indigo-700 text-lg sm:text-xl font-bold rounded-xl sm:rounded-2xl shadow-xl border-2 sm:border-4 border-white hover:bg-white/10 transform hover:scale-105 transition duration-300 cursor-pointer"
      >
        Create Free Account
      </button>
    </div>
  );
}
