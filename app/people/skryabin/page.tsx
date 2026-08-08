import Image from "next/image";
import Link from "next/link";

export default function SkryabinPage() {
  return (
    <main className="bg-white min-h-screen">

      {/* HERO */}

      <section className="relative h-[75vh]">

        <Image
          src="/images/people/skryabin.jpg"
          alt="Андрій Кузьменко"
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
              Андрій Кузьменко
            </h1>

            <p className="text-3xl mt-5">
              «Скрябін»
            </p>

          </div>

        </div>

      </section>

      {/* ОСНОВНИЙ БЛОК */}

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
              src="/images/people/skryabin.jpg"
              alt="Скрябін"
              width={500}
              height={700}
              className="rounded-3xl shadow-2xl w-full"
            />

            <div className="bg-gray-100 rounded-3xl p-8 mt-8">

              <h3 className="text-2xl font-bold mb-6">
                Основна інформація
              </h3>

              <div className="space-y-4 text-lg">

                <p><strong>Повне ім'я:</strong><br />Андрій Вікторович Кузьменко</p>

                <p><strong>Псевдонім:</strong><br />Скрябін</p>

                <p><strong>Народився:</strong><br />17 серпня 1968 року</p>

                <p><strong>Помер:</strong><br />2 лютого 2015 року</p>

                <p><strong>Професія:</strong><br />Співак, письменник, телеведучий</p>

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
                  Андрій Кузьменко народився у Самборі,
                  але майже все дитинство та юність провів
                  у Новояворівську. Саме тут він навчався,
                  знаходив друзів і вперше почав цікавитися музикою.
                  Батьки підтримували його захоплення,
                  тому він дуже рано почав слухати сучасну
                  європейську музику.
                </p>

              </div>

              <div>

                <h3 className="text-3xl font-bold text-black mb-5">
                  Шкільні роки
                </h3>

                <p>
                  Навчаючись у Новояворівську,
                  Андрій був дуже активним,
                  багато жартував,
                  мав велике коло друзів
                  та вже тоді відрізнявся
                  своїм почуттям гумору.
                  Саме у цей період він остаточно
                  вирішив пов'язати життя з музикою.
                </p>

              </div>

                            <div>

                <h3 className="text-3xl font-bold text-black mb-5">
                  Гурт «Скрябін»
                </h3>

                <p>
                  Наприкінці 1980-х років Андрій створив гурт
                  «Скрябін», який дуже швидко став одним із
                  найвідоміших музичних колективів України.
                  Його пісні поєднували щирість, гумор,
                  життєву мудрість і сучасне звучання.
                  За свою кар'єру він написав сотні композицій,
                  багато з яких стали справжньою класикою.
                </p>

              </div>

              <div>

                <h3 className="text-3xl font-bold text-black mb-5">
                  Письменник і телеведучий
                </h3>

                <p>
                  Окрім музики, Кузьма писав книги,
                  був телеведучим і активно займався
                  благодійністю. Його книги
                  «Я, Побєда і Берлін»,
                  «Я, Паштєт і Армія»
                  та інші стали дуже популярними
                  серед українських читачів.
                </p>

              </div>

              <div>

                <h3 className="text-3xl font-bold text-black mb-5">
                  Цікаві факти
                </h3>

                <ul className="list-disc pl-8 space-y-4">

                  <li>Провів молодість у Новояворівську.</li>

                  <li>Написав понад 300 пісень.</li>

                  <li>Був одним із найвідоміших українських телеведучих.</li>

                  <li>Випустив кілька популярних книг.</li>

                  <li>Його творчість і сьогодні слухають мільйони українців.</li>

                </ul>

              </div>

              <div>

                <h3 className="text-3xl font-bold text-black mb-5">
                  Відома цитата
                </h3>

                <blockquote className="border-l-4 border-blue-600 pl-6 italic text-2xl text-gray-800">
                  «Треба радіти тому, що маєш сьогодні, бо завтра може бути вже зовсім інше життя.»
                </blockquote>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}