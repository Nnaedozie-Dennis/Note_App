import HomeButtons from "./components/HomeButtons";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100  to-indigo-50 flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-16">

      <div className="text-center max-w-4xl">

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight">
          Organize Your Thoughts
          <span className="block text-indigo-600">Beautifully</span>
        </h1>


        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto opacity-95">
          A fast, clean and modern note-taking app. <br />Try it instantly. No
          signup needed.
        </p>

        <HomeButtons />

        <p className="mt-12 sm:mt-16 text-gray-500 text-xs sm:text-sm opacity-90">
          Demo mode lets you create and edit notes instantly.{" "}
          <br  />
          Sign up anytime to save your notes permanently.
        </p>
      </div>
    </div>
  );
}
