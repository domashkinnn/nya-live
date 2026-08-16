"use client";

import Link from "next/link";
import { useState } from "react";

const photos = [
  {
    src: "/images/nyastend.jpg",
    title: "Новояворівськ у минулому",
    text: "Старий Новояворівськ — місто, яке поступово змінювалося разом із його мешканцями.",
  },
  {
    src: "/images/nyastend2.jpg",
    title: "Місто багато років тому",
    text: "Старі фотографії допомагають побачити Новояворівськ таким, яким його пам'ятають мешканці.",
  },
  {
    src: "/images/school.jpg",
    title: "Школа",
    text: "Школа була важливою частиною життя молодого міста та багатьох поколінь його мешканців.",
  },
  {
    src: "/images/plane.jpg",
    title: "Літак",
    text: "Незвичайний об'єкт, який свого часу став частиною міського пейзажу та залишився у спогадах мешканців.",
  },
  {
    src: "/images/plane2.png",
    title: "Літак-кафе",
    text: "Художня реконструкція того, як міг виглядати простір кафе всередині літака.",
  },
];

const timeline = [
  {
    year: "1965",
    title: "Початок історії",
    text: "Новояворівськ почав формуватися у 1965 році як робітниче поселення, пов'язане з розвитком промисловості Яворівщини. Новим підприємствам та будівництву були потрібні працівники, а працівникам — житло. Так поступово почало з'являтися нове поселення.",
  },
  {
    year: "1965–1969",
    title: "Перші роки",
    text: "Перші роки були часом активного будівництва. З'являлися житлові будинки, дороги, магазини та інші об'єкти, необхідні для повсякденного життя. До поселення приїжджали люди з різних місць, і поступово формувалася нова міська спільнота.",
  },
  {
    year: "1969",
    title: "Назва Новояворівськ",
    text: "У 1969 році поселення отримало назву Новояворівськ. Відтоді ця назва стала невід'ємною частиною історії Яворівщини.",
  },
  {
    year: "1970",
    title: "Перші важливі заклади",
    text: "На початку 1970-х років молоде місто вже мало власну школу та Палац культури. Це був важливий етап: поселення поступово перетворювалося не просто на місце проживання працівників, а на справжнє місто з власним культурним та освітнім життям.",
  },
  {
    year: "1970–1980-ті",
    title: "Місто росте",
    text: "Новояворівськ продовжував розбудовуватися. З'являлися нові будинки, навчальні заклади, магазини, дороги, культурні та спортивні місця. Разом із будівлями формувалася і пам'ять міста — місця зустрічей, дитячі майданчики, школи та улюблені куточки мешканців.",
  },
  {
    year: "Сьогодні",
    title: "Місто, яке продовжує жити",
    text: "Сьогодні Новояворівськ уже сильно відрізняється від міста кілька десятиліть тому. Але старі фотографії дозволяють побачити його минуле та зрозуміти, наскільки багато змінилося. Історія міста продовжується кожного дня.",
  },
];

export default function HistoryPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#f4f6f8] text-gray-900">

      {/* HERO */}

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-700 to-cyan-500 text-white">

        <div className="absolute inset-0">
          <div className="absolute -left-20 top-10 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl" />
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-300/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-16 lg:py-24">

          <Link
            href="/"
            className="inline-flex rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold backdrop-blur transition hover:bg-white/20"
          >
            ← На головну
          </Link>

          <div className="mt-14 max-w-5xl">

            <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-200">
              Nya Live · Історія міста
            </p>

            <h1 className="mt-5 text-5xl font-black leading-none tracking-tight sm:text-7xl lg:text-8xl">
              Новояворівськ
            </h1>

            <h2 className="mt-5 text-2xl font-bold text-white/90 sm:text-4xl">
              Місто, яке пам'ятає
            </h2>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl">
              Історія Новояворівська — це не лише дати та документи.
              Це люди, будинки, школи, вулиці, місця зустрічей,
              дитинство та спогади, які передаються від покоління до покоління.
            </p>

          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">

            <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur">
              <div className="text-4xl font-black">1965</div>
              <p className="mt-2 text-white/70">
                початок формування міста
              </p>
            </div>

            <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur">
              <div className="text-4xl font-black">1969</div>
              <p className="mt-2 text-white/70">
                назва Новояворівськ
              </p>
            </div>

            <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur">
              <div className="text-4xl font-black">
                Nya Live
              </div>
              <p className="mt-2 text-white/70">
                історія міста сьогодні
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* INTRO */}

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

          <div>

            <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
              Початок
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Як з'явився Новояворівськ
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Новояворівськ — молоде місто Львівщини. Його історія
              відрізняється від історії старовинних міст регіону.
              Тут не було багатовікових площ чи середньовічних мурів.
              Місто фактично народилося у ХХ столітті разом із
              розвитком промисловості Яворівщини.
            </p>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Поява промислових підприємств створила потребу в новому
              житлі для робітників та спеціалістів. Навколо цього
              поступово почало формуватися поселення.
            </p>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Спочатку будинки та вулиці могли здаватися просто
              частиною великого будівництва. Але з часом у них
              з'явилося найважливіше — життя людей.
            </p>

          </div>

          <button
            onClick={() => setSelectedPhoto("/images/nyastend.jpg")}
            className="group overflow-hidden rounded-[2rem] bg-white text-left shadow-xl"
          >

            <img
              src="/images/nyastend.jpg"
              alt="Новояворівськ у минулому"
              className="h-[450px] w-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="p-6">

              <p className="text-sm font-bold text-blue-600">
                АРХІВ
              </p>

              <h3 className="mt-2 text-2xl font-black">
                Новояворівськ у минулому
              </h3>

            </div>

          </button>

        </div>

      </section>


      {/* TIMELINE */}

      <section className="bg-white">

        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-24">

          <div className="mb-14">

            <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
              Хронологія
            </p>

            <h2 className="mt-4 text-4xl font-black sm:text-5xl">
              Історія міста по роках
            </h2>

          </div>

          <div className="space-y-8">

            {timeline.map((item) => (

              <div
                key={item.year}
                className="grid gap-5 rounded-3xl bg-gray-50 p-7 shadow-sm sm:grid-cols-[150px_1fr]"
              >

                <div className="text-3xl font-black text-blue-700">
                  {item.year}
                </div>

                <div>

                  <h3 className="text-2xl font-black">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-base leading-7 text-gray-600">
                    {item.text}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* OLD PHOTOS */}

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">

        <div className="mb-12">

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
            Фотоархів
          </p>

          <h2 className="mt-4 text-4xl font-black sm:text-5xl">
            П'ять фотографій — п'ять частин історії
          </h2>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            Ці фотографії — невеликий архів, який дозволяє побачити
            різні сторони минулого Новояворівська.
          </p>

        </div>


        <div className="grid gap-6 md:grid-cols-2">

          {photos.slice(0, 3).map((photo) => (

            <button
              key={photo.src}
              onClick={() => setSelectedPhoto(photo.src)}
              className="group overflow-hidden rounded-[2rem] bg-white text-left shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
            >

              <div className="overflow-hidden">

                <img
                  src={photo.src}
                  alt={photo.title}
                  className="h-[350px] w-full object-cover transition duration-700 group-hover:scale-105"
                />

              </div>

              <div className="p-7">

                <h3 className="text-2xl font-black">
                  {photo.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {photo.text}
                </p>

              </div>

            </button>

          ))}

        </div>

      </section>


      {/* PLANE */}

      <section className="bg-[#101827] text-white">

        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-400">
            Незвичайна історія
          </p>

          <h2 className="mt-5 max-w-4xl text-4xl font-black sm:text-6xl">
            Літак, який запам'ятався місту
          </h2>

          <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-center">

            <div>

              <p className="text-lg leading-8 text-gray-300">
                Історія міста складається не тільки з великих подій.
                Іноді у пам'яті людей залишаються зовсім незвичайні
                речі — місця, будинки або об'єкти, які робили місто
                особливим.
              </p>

              <p className="mt-5 text-lg leading-8 text-gray-300">
                Одним із таких об'єктів для Новояворівська став літак.
                Він був частиною міського простору та привертав увагу
                мешканців.
              </p>

              <p className="mt-5 text-lg leading-8 text-gray-300">
                Для дітей літак міг бути справжньою цікавинкою.
                Він був зовсім поруч — не десь далеко в небі, а
                буквально у знайомому міському середовищі.
              </p>

              <p className="mt-5 text-lg leading-8 text-gray-300">
                Такі об'єкти з часом стають частиною міської пам'яті.
                Люди можуть згадувати їх навіть через багато років,
                коли самого об'єкта вже немає.
              </p>

            </div>

            <button
              onClick={() => setSelectedPhoto("/images/plane.jpg")}
              className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 text-left"
            >

              <img
                src="/images/plane.jpg"
                alt="Літак у Новояворівську"
                className="h-[500px] w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="p-6">

                <p className="text-sm font-bold text-cyan-400">
                  АРХІВНЕ ФОТО
                </p>

                <h3 className="mt-2 text-2xl font-black">
                  Літак у місті
                </h3>

              </div>

            </button>

          </div>


          {/* CAFE */}

          <div className="mt-20 grid gap-12 lg:grid-cols-2 lg:items-center">

            <button
              onClick={() => setSelectedPhoto("/images/plane2.png")}
              className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5"
            >

              <img
                src="/images/plane2.png"
                alt="Художня реконструкція літака-кафе"
                className="w-full transition duration-700 group-hover:scale-105"
              />

            </button>


            <div>

              <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-400">
                Літак-кафе
              </p>

              <h3 className="mt-4 text-3xl font-black sm:text-4xl">
                Літак отримав нове життя
              </h3>

              <p className="mt-6 text-lg leading-8 text-gray-300">
                Згодом літак був пов'язаний із кафе. Незвичайне місце
                стало частиною повсякденного життя міста.
              </p>

              <p className="mt-5 text-lg leading-8 text-gray-300">
                Для відвідувачів це було не просто місце, де можна
                було посидіти. Сам літак створював особливу атмосферу.
                Можна було зайти всередину справжнього літака,
                посидіти з друзями та просто провести час.
              </p>

              <p className="mt-5 text-lg leading-8 text-gray-300">
                Саме такі історії й роблять місто живим. Через роки
                великі будівлі можуть бути перебудовані, а цілі місця
                можуть зникнути, але спогади людей залишаються.
              </p>

              <div className="mt-7 rounded-2xl bg-cyan-400/10 p-6">

                <p className="font-bold text-cyan-300">
                  ✈️ Важливо
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-300">
                  Це зображення є художньою реконструкцією, а не
                  архівною фотографією.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* FINAL GALLERY */}

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">

        <div className="text-center">

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
            Архів Nya Live
          </p>

          <h2 className="mt-4 text-4xl font-black sm:text-5xl">
            П'ять кадрів Новояворівська
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            Невелика колекція фотографій, з якої починається
            наш цифровий архів історії міста.
          </p>

        </div>


        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">

          {photos.map((photo, index) => (

            <button
              key={photo.src}
              onClick={() => setSelectedPhoto(photo.src)}
              className={`group overflow-hidden rounded-3xl ${
                index === 0
                  ? "col-span-2 row-span-2"
                  : ""
              }`}
            >

              <img
                src={photo.src}
                alt={photo.title}
                className={`w-full object-cover transition duration-700 group-hover:scale-105 ${
                  index === 0
                    ? "h-[500px]"
                    : "h-[240px]"
                }`}
              />

            </button>

          ))}

        </div>

      </section>


      {/* FOOTER CTA */}

      <section className="bg-gradient-to-r from-blue-700 to-cyan-500 text-white">

        <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 lg:py-24">

          <div className="text-5xl">
            🏙️
          </div>

          <h2 className="mt-6 text-4xl font-black sm:text-5xl">
            Історія Новояворівська продовжується
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/85">
            Те, що сьогодні здається звичайним, через десятки років
            може стати історією. Саме тому важливо зберігати фотографії,
            спогади та розповіді мешканців.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">

            <Link
              href="/forum"
              className="rounded-2xl bg-white px-7 py-4 font-bold text-blue-700 shadow-lg transition hover:-translate-y-1 hover:bg-gray-100"
            >
              💬 Перейти на форум
            </Link>

            <Link
              href="/"
              className="rounded-2xl bg-blue-950/40 px-7 py-4 font-bold text-white transition hover:bg-blue-950/60"
            >
              На головну
            </Link>

          </div>

        </div>

      </section>


      {/* PHOTO MODAL */}

      {selectedPhoto && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setSelectedPhoto(null)}
        >

          <div
            className="relative max-h-[92vh] max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >

            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -right-3 -top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-2xl font-bold text-gray-900 shadow-xl"
            >
              ×
            </button>

            <img
              src={selectedPhoto}
              alt="Збільшене фото"
              className="max-h-[90vh] max-w-full rounded-2xl object-contain shadow-2xl"
            />

          </div>

        </div>

      )}

    </main>
  );
}