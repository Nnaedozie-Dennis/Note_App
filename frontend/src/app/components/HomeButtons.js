// src/app/components/HomeButtons.js
// Client component for interactive buttons (demo login and register)
// "use client" required because we use fetch and localStorage

"use client";

import { useRouter } from "next/navigation";

export default function HomeButtons() {
  const router = useRouter();

  const handleDemoLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/demo", {
        method: "POST",
      });
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
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
      {/* Demo Button - primary action */}
      <button
        onClick={handleDemoLogin}
        className="px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-indigo-500/50 transform hover:scale-105 transition duration-300"
      >
        Try Demo Now →
      </button>

      {/* Register Button - secondary */}
      <button
        onClick={() => router.push("/register")}
        className="px-10 py-5 bg-white text-indigo-700 text-xl font-bold rounded-2xl shadow-2xl border-4 border-indigo-200 hover:border-indigo-400 transform hover:scale-105 transition duration-300"
      >
        Create Free Account
      </button>
    </div>
  );
}
