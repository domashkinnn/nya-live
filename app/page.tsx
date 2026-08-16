import Link from "next/link";
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

        {/* HERO */}

        <section
          className="relative flex min-h-[85vh] items-center justify-center bg-cover bg-center px-5 sm:min-h-[90vh] lg:h-screen"
          style={{
            backgroundImage: "url('/images/hero.jpg')",
          }}
        >

          <div className="absolute inset-0 bg-black/55" />

          <div className="relative z-10 mx-auto max-w-5xl text-center text-white">

            <p className="mb-5 text-sm font-bold uppercase tracking-[0.35em] text-cyan-300 sm:text-base">
              Nya Live
            </p>

            <h1 className="text-5xl font-black leading-none tracking-tight sm:text-7xl md:text-8xl">
              Новояворівськ
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/90 sm:text-2xl">
              Місто з власною історією, легендами,
              людьми та спогадами.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">

              <Link
                href="/history"
                className="rounded-2xl bg-white px-7 py-4 font-bold text-blue-700 shadow-xl transition hover:-translate-y-1 hover:bg-gray-100"
              >
                🏛️ Історія міста
              </Link>

              <Link
                href="/forum"
                className="rounded-2xl bg-blue-700/80 px-7 py-4 font-bold text-white shadow-xl backdrop-blur transition hover:-translate-y-1 hover:bg-blue-600"
              >
                💬 Форум
              </Link>

            </div>

          </div>

        </section>


        {/* QUICK INTRO */}

        <section className="bg-white">

          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">

            <div className="grid gap-6 md:grid-cols-3">

              <Link
                href="/history"
                className="group rounded-3xl bg-gray-50 p-8 shadow-sm transition hover:-translate-y-2 hover:bg-blue-50 hover:shadow-xl"
              >

                <div className="text-5xl">
                  🏛️
                </div>

                <h2 className="mt-5 text-2xl font-black">
                  Історія
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  Дізнайся, як формувався Новояворівськ,
                  яким було місто раніше та які місця
                  залишилися у пам'яті його мешканців.
                </p>

                <div className="mt-5 font-bold text-blue-600">
                  Читати історію →
                </div>

              </Link>


              <Link
                href="/forum"
                className="group rounded-3xl bg-gray-50 p-8 shadow-sm transition hover:-translate-y-2 hover:bg-cyan-50 hover:shadow-xl"
              >

                <div className="text-5xl">
                  💬
                </div>

                <h2 className="mt-5 text-2xl font-black">
                  Форум
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  Спілкуйся з іншими мешканцями,
                  публікуй фотографії, розповідай історії
                  та обговорюй життя міста.
                </p>

                <div className="mt-5 font-bold text-blue-600">
                  Перейти на форум →
                </div>

              </Link>


              <div className="rounded-3xl bg-gray-50 p-8 shadow-sm">

                <div className="text-5xl">
                  📸
                </div>

                <h2 className="mt-5 text-2xl font-black">
                  Фотоархів
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  Старі фотографії допомагають побачити
                  Новояворівськ таким, яким він був
                  десятки років тому.
                </p>

                <Link
                  href="/history"
                  className="mt-5 inline-block font-bold text-blue-600"
                >
                  Переглянути фото →
                </Link>

              </div>

            </div>

          </div>

        </section>


        {/* ABOUT */}

        <About />


        {/* HISTORY PROMO */}

        <section className="bg-gradient-to-br from-blue-950 via-blue-800 to-cyan-600 text-white">

          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">

            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

              <div>

                <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
                  Минуле міста
                </p>

                <h2 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
                  А яким був Новояворівськ раніше?
                </h2>

                <p className="mt-6 text-lg leading-8 text-white/80">
                  Сьогодні ми бачимо сучасне місто, але ще кілька
                  десятиліть тому воно виглядало зовсім інакше.
                  Інші будинки, інші вулиці та місця, яких уже
                  може не бути.
                </p>

                <p className="mt-5 text-lg leading-8 text-white/80">
                  Ми зібрали невеликий фотоархів та розповіли
                  історію міста, щоб зберегти ці спогади.
                </p>

                <Link
                  href="/history"
                  className="mt-8 inline-block rounded-2xl bg-white px-7 py-4 font-bold text-blue-700 shadow-xl transition hover:-translate-y-1 hover:bg-gray-100"
                >
                  🏛️ Дослідити історію
                </Link>

              </div>


              <Link
                href="/history"
                className="group overflow-hidden rounded-[2rem] bg-white/10 shadow-2xl"
              >

                <img
                  src="/images/nyastend.jpg"
                  alt="Новояворівськ у минулому"
                  className="h-[450px] w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="p-6">

                  <p className="text-sm font-bold text-cyan-300">
                    ФОТОАРХІВ
                  </p>

                  <h3 className="mt-2 text-2xl font-black">
                    Новояворівськ у минулому
                  </h3>

                </div>

              </Link>

            </div>

          </div>

        </section>


        {/* LEGENDS */}

        <Legends />


        {/* FAMOUS PEOPLE */}

        <FamousPeople />


        {/* FORUM PROMO */}

        <section className="bg-[#101827] text-white">

          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">

            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

              <div>

                <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-400">
                  Nya Live Forum
                </p>

                <h2 className="mt-5 text-4xl font-black sm:text-6xl">
                  Твоє місто —
                  <br />
                  твої історії
                </h2>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
                  Маєш стару фотографію? Знаєш цікаву історію?
                  Пам'ятаєш місце, якого вже немає?
                </p>

                <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-300">
                  Поділися цим з іншими мешканцями Новояворівська
                  на нашому форумі.
                </p>

                <Link
                  href="/forum"
                  className="mt-8 inline-block rounded-2xl bg-cyan-500 px-7 py-4 font-bold text-white shadow-xl transition hover:-translate-y-1 hover:bg-cyan-400"
                >
                  💬 Відкрити форум
                </Link>

              </div>


              <div className="grid grid-cols-2 gap-4">

                <div className="rounded-3xl bg-white/5 p-7">

                  <div className="text-4xl">
                    📷
                  </div>

                  <h3 className="mt-4 text-xl font-black">
                    Фотографії
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    Ділися фотографіями міста.
                  </p>

                </div>


                <div className="rounded-3xl bg-white/5 p-7">

                  <div className="text-4xl">
                    💭
                  </div>

                  <h3 className="mt-4 text-xl font-black">
                    Спогади
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    Розповідай власні історії.
                  </p>

                </div>


                <div className="rounded-3xl bg-white/5 p-7">

                  <div className="text-4xl">
                    👥
                  </div>

                  <h3 className="mt-4 text-xl font-black">
                    Спільнота
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    Спілкуйся з мешканцями.
                  </p>

                </div>


                <div className="rounded-3xl bg-white/5 p-7">

                  <div className="text-4xl">
                    ❤️
                  </div>

                  <h3 className="mt-4 text-xl font-black">
                    Новояворівськ
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    Все про наше місто.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* GALLERY */}

        <Gallery />


        {/* SUPPORT */}

        <Support />


        {/* FINAL */}

        <section className="bg-gradient-to-r from-blue-700 to-cyan-500 text-white">

          <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 lg:py-24">

            <div className="text-5xl">
              🏙️
            </div>

            <h2 className="mt-6 text-4xl font-black sm:text-5xl">
              Ласкаво просимо на Nya Live
            </h2>

            <p className="mt-5 text-lg leading-8 text-white/85">
              Місце, де історія Новояворівська зустрічається
              із сучасним життям міста.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">

              <Link
                href="/history"
                className="rounded-2xl bg-white px-7 py-4 font-bold text-blue-700 shadow-lg transition hover:-translate-y-1"
              >
                🏛️ Історія
              </Link>

              <Link
                href="/forum"
                className="rounded-2xl bg-blue-950/40 px-7 py-4 font-bold text-white transition hover:bg-blue-950/60"
              >
                💬 Форум
              </Link>

            </div>

          </div>

        </section>

      </main>
    </>
  );
}