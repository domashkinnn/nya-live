import Navbar from "./components/Navbar";
import About from "./components/About";
import Legends from "./components/Legends";
import FamousPeople from "./components/FamousPeople";
import Gallery from "./components/Gallery";
import Support from "./components/Support";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="w-full overflow-x-hidden">
        <section
          className="relative min-h-[75vh] sm:min-h-[85vh] lg:h-screen bg-cover bg-center flex items-center justify-center px-5"
          style={{
            backgroundImage: "url('/images/hero.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/45"></div>

          <div className="relative z-10 text-center text-white max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Новояворівськ
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl mt-4 px-2">
              Історія. Легенди. Спільнота.
            </p>
          </div>
        </section>

        <About />
        <Legends />
        <FamousPeople />
        <Gallery />
        <Support />
      </main>
    </>
  );
}