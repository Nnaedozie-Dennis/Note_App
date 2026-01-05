// src/app/page.js
// Home page - welcomes visitors and offers instant demo or signup

import HomeButtons from "./components/HomeButtons";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center justify-center px-6 py-12">
      <div className="text-center max-w-4xl">
        {/* Main headline */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          Organize Your Thoughts
          <span className="block text-indigo-600">Beautifully</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
          A fast, clean, and modern note-taking app. Try it instantly — no
          signup needed.
        </p>

        {/* Buttons - interactive part in separate client component */}
        <HomeButtons />

        {/* Footer note */}
        <p className="mt-16 text-gray-500 text-sm">
          Demo mode lets you create and edit notes instantly.{" "}
          <br className="hidden md:block" />
          Sign up anytime to save your notes permanently.
        </p>
      </div>
    </div>
  );
}
