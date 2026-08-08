import Image from "next/image";
import Link from "next/link";

export default function NazarRusynPage() {
  return (
    <main className="bg-white min-h-screen">

      <section className="relative h-[75vh]">

        <Image
          src="/images/people/nazar-rusyn.jpg"
          alt="Назар Русин"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-black/55"></div>

        <div className="absolute inset-0 flex items-center justify-center">

          <div className="text-center text-white">

            <p className="uppercase tracking-[5px] text-blue-300 mb-4">
              Відомі люди Новояворівська
            </p>

            <h1 className="text-7xl font-bold">
              Назар Русин
            </h1>

            <p className="text-3xl mt-5">
              Український футболіст
            </p>

          </div>

        </div>

      </section>

      <section className="max-w-6xl mx-auto py-24 px-6">

        <Link
          href="/people"
          className="inline-block mb-14 text-blue-600 hover:text-blue-800 font-semibold"
        >
          ← Назад до відомих людей
        </Link>

        <div className="grid lg:grid-cols-3 gap-14">

          <div>

            <Image
              src="/images/people/nazar-rusyn.jpg"
              alt="Назар Русин"
              width={500}
              height={700}
              className="rounded-3xl shadow-2xl w-full"
            />

            <div className="bg-gray-100 rounded-3xl p-8 mt-8">

              <h3 className="text-2xl font-bold mb-6">
                Основна інформація
              </h3>

              <div className="space-y-4 text-lg">

                <p><strong>Ім'я:</strong><br />Назар Русин</p>

                <p><strong>Народився:</strong><br />25 жовтня 1998 року</p>

                <p><strong>Місце народження:</strong><br />Новояворівськ</p>

                <p><strong>Професія:</strong><br />Професійний футболіст</p>

                <p><strong>Амплуа:</strong><br />Нападник</p>

              </div>

            </div>

          </div>

          <div className="lg:col-span-2">

            <h2 className="text-5xl font-bold mb-10">
              Біографія
            </h2>

            <div className="space-y-10 text-xl leading-10 text-gray-700">

              <div>

                <h3 className="text-3xl font-bold text-black mb-5">
                  Дитинство
                </h3>

                <p>
                  Назар Русин народився у Новояворівську.
                  З самого дитинства він захоплювався футболом
                  та більшу частину вільного часу проводив
                  на футбольному полі. Саме у рідному місті
                  він зробив свої перші кроки у спорті.
                </p>

              </div>

              <div>

                <h3 className="text-3xl font-bold text-black mb-5">
                  Початок кар'єри
                </h3>

                <p>
                  Завдяки наполегливій праці та таланту
                  Назар потрапив до футбольної академії,
                  де швидко став одним із найперспективніших
                  молодих нападників. Його хороша гра
                  привернула увагу професійних клубів.
                </p>

              </div>

                            <div>

                <h3 className="text-3xl font-bold text-black mb-5">
                  Професійна кар'єра
                </h3>

                <p>
                  Згодом Назар Русин став професійним футболістом
                  і виступав за київське «Динамо», а також за інші
                  українські та європейські клуби. Він неодноразово
                  демонстрував хорошу результативність, швидкість
                  та вміння завершувати атаки. Його кар'єра стала
                  прикладом того, як хлопець із невеликого міста
                  може досягти високого рівня у професійному футболі.
                </p>

              </div>

              <div>

                <h3 className="text-3xl font-bold text-black mb-5">
                  Досягнення
                </h3>

                <p>
                  Протягом своєї кар'єри Назар виступав у чемпіонаті
                  України та за кордоном, забивав важливі м'ячі
                  і допомагав своїм командам досягати хороших результатів.
                  Його ім'я добре відоме українським уболівальникам.
                </p>

              </div>

              <div>

                <h3 className="text-3xl font-bold text-black mb-5">
                  Цікаві факти
                </h3>

                <ul className="list-disc pl-8 space-y-4">

                  <li>Народився у Новояворівську.</li>

                  <li>Професійно займається футболом із юного віку.</li>

                  <li>Грав за київське «Динамо».</li>

                  <li>Виступав також за європейські футбольні клуби.</li>

                  <li>Є одним із найвідоміших спортсменів Новояворівська.</li>

                </ul>

              </div>

              <div>

                <h3 className="text-3xl font-bold text-black mb-5">
                  Гордість міста
                </h3>

                <p>
                  Для жителів Новояворівська Назар Русин є прикладом
                  наполегливості, праці та любові до спорту.
                  Він довів, що навіть із невеликого міста можна
                  вийти на високий професійний рівень і представляти
                  Україну на міжнародній футбольній арені.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}