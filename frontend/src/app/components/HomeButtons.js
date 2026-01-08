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
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center w-full">
  
      <button
        onClick={handleDemoLogin}

        className="w-full sm:w-auto px-6 sm:px-10 py-3 bg-linear-to-r from-indigo-600 to-indigo-800 text-white sm:py-5 text-lg sm:text-xl font-bold rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-white/30 transform hover:scale-105 transition duration-300 cursor-pointer"
      >
        Try Demo Now →
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
