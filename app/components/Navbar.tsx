export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        <h1 className="text-white text-2xl font-bold">
          Nya Live
        </h1>

        <nav className="flex items-center gap-8 text-white font-medium">

          <a href="#history" className="hover:text-blue-400 transition">
            Історія
          </a>

          <a href="#gallery" className="hover:text-blue-400 transition">
            Галерея
          </a>

          <a href="#support" className="hover:text-blue-400 transition">
            Підтримати
          </a>

          <a
            href="#"
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl transition"
          >
            Форум
          </a>

        </nav>

      </div>
    </header>
  );
}