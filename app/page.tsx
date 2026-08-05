import Navbar from "./components/Navbar";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Support from "./components/Support";

export default function Home() {
  return (
    <>
      <Navbar />

      <main
        className="relative h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 text-center text-white px-6">

          <h1 className="text-6xl md:text-8xl font-bold">
            Новояворівськ
          </h1>

          <p className="mt-6 text-xl md:text-2xl text-gray-200">
            Історія. Легенди. Спільнота.
          </p>

          <button className="mt-10 bg-blue-600 hover:bg-blue-700 px-10 py-4 rounded-xl text-lg font-semibold transition">
            Дізнатися більше
          </button>

        </div>

      </main>

      <About />

      <Gallery />

      <Support />

    </>
  );
}