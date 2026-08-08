import Image from "next/image";
import Link from "next/link";

export default function OlehRusynPage() {
  return (
    <main className="bg-white min-h-screen">

      <section className="relative h-[75vh]">

        <Image
          src="/images/people/oleh-rusyn.jpg"
          alt="Олег Русин"
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
              Олег Русин
            </h1>

            <p className="text-3xl mt-5">
              Представник спортивної родини Русиних
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
              src="/images/people/oleh-rusyn.jpg"
              alt="Олег Русин"
              width={500}
              height={700}
              className="rounded-3xl shadow-2xl w-full"
            />

            <div className="bg-gray-100 rounded-3xl p-8 mt-8">

              <h3 className="text-2xl font-bold mb-6">
                Основна інформація
              </h3>

              <div className="space-y-4 text-lg">

                <p><strong>Ім'я:</strong><br />Олег Русин</p>

                <p><strong>Місто:</strong><br />Новояворівськ</p>

                <p><strong>Родина:</strong><br />Брат Назара Русина</p>

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
                  Родина
                </h3>

                <p>
                  Олег Русин походить з Новояворівська.
                  Його сім'я добре відома місцевим жителям,
                  а брат Назар Русин став професійним
                  українським футболістом.
                </p>

              </div>

              <div>

                <h3 className="text-3xl font-bold text-black mb-5">
                  Новояворівськ
                </h3>

                <p>
                  Родина Русиних є одним із прикладів того,
                  як місто виховує талановитих людей,
                  які прославляють свій край.
                </p>

              </div>

                            <div>

                <h3 className="text-3xl font-bold text-black mb-5">
                  Родина Русиних
                </h3>

                <p>
                  Родина Русиних відома у Новояворівську своєю любов'ю
                  до спорту. Найбільшої популярності набув Назар Русин,
                  який став професійним футболістом. Олег також є
                  представником цієї родини, що має міцний зв'язок
                  із рідним містом.
                </p>

              </div>

              <div>

                <h3 className="text-3xl font-bold text-black mb-5">
                  Новояворівськ
                </h3>

                <p>
                  Новояворівськ виховав чимало талановитих людей.
                  Родина Русиних є частиною історії міста та
                  демонструє, наскільки важливими є підтримка сім'ї,
                  праця й наполегливість для досягнення успіху.
                </p>

              </div>

              <div>

                <h3 className="text-3xl font-bold text-black mb-5">
                  Цікаві факти
                </h3>

                <ul className="list-disc pl-8 space-y-4">

                  <li>Народився та виріс у Новояворівську.</li>

                  <li>Є братом професійного футболіста Назара Русина.</li>

                  <li>Походить із відомої спортивної родини міста.</li>

                  <li>Його родина є прикладом любові до спорту та рідного краю.</li>

                </ul>

              </div>

              <div>

                <h3 className="text-3xl font-bold text-black mb-5">
                  Новояворівська родина
                </h3>

                <p>
                  Історія родини Русиних є ще одним прикладом того,
                  як Новояворівськ виховує людей, які залишають
                  слід у спортивному житті України та прославляють
                  своє рідне місто.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}