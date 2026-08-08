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

      <main>

        <section
          className="relative h-screen bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage: "url('/images/hero.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/45"></div>

          <div className="relative text-center text-white z-10">
            <h1 className="text-7xl font-bold">Новояворівськ</h1>

            <p className="text-2xl mt-4">
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