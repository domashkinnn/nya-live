export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-50">

      <div className="
        max-w-7xl 
        mx-auto 
        px-6 
        py-5 
        flex 
        items-center 
        justify-between
        backdrop-blur-sm
        bg-black/20
        rounded-b-2xl
      ">

        {/* Логотип */}
        <div className="
          text-white 
          text-2xl 
          font-bold
          tracking-wide
        ">
          Новояворівськ
        </div>


        {/* Меню */}
        <div className="
          hidden 
          md:flex 
          gap-8 
          text-white
          font-medium
        ">

          <a href="#home" className="hover:text-blue-400 transition">
            Головна
          </a>

          <a href="#history" className="hover:text-blue-400 transition">
            Історія
          </a>

          <a href="#places" className="hover:text-blue-400 transition">
            Місця
          </a>

          <a href="#forum" className="hover:text-blue-400 transition">
            Форум
          </a>

        </div>


        {/* Вхід */}
        <button
          className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-6
          py-3
          rounded-xl
          transition
          font-semibold
          "
        >
          Увійти
        </button>


      </div>

    </nav>
  );
}