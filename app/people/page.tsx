import Image from "next/image";
import Link from "next/link";

const people = [
  {
    name: "Андрій Кузьменко (Скрябін)",
    image: "/images/people/skryabin.jpg",
    description:
      "Легендарний український музикант, письменник і телеведучий.",
    link: "/people/skryabin",
  },
  {
    name: "Михайло Хома (DZIDZIO)",
    image: "/images/people/dzidzio.jpg",
    description:
      "Український співак, актор, режисер та продюсер.",
    link: "/people/dzidzio",
  },
  {
    name: "Назар Русин",
    image: "/images/people/nazar-rusyn.jpg",
    description:
      "Професійний український футболіст.",
    link: "/people/nazar-rusyn",
  },
  {
    name: "Олег Русин",
    image: "/images/people/oleh-rusyn.jpg",
    description:
      "Представник відомої родини Русиних із Новояворівська.",
    link: "/people/oleh-rusyn",
  },
];

export default function PeoplePage() {
  return (
    <main className="min-h-screen bg-gray-100 py-20 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">

          <Link
            href="/"
            className="inline-block mb-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition"
          >
            ← Назад на головну
          </Link>

          <h1 className="text-6xl font-bold text-black">
            Відомі люди Новояворівська
          </h1>

          <p className="text-gray-700 mt-6 text-xl max-w-3xl mx-auto">
            Люди, які зробили вагомий внесок у розвиток музики,
            спорту та культури й прославили Новояворівськ
            далеко за його межами.
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-10">

          {people.map((person) => (

            <div
              key={person.name}
              className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >

              <Image
                src={person.image}
                alt={person.name}
                width={900}
                height={700}
                className="w-full h-[420px] object-cover"
              />

              <div className="p-8">

                <h2 className="text-3xl font-bold text-black mb-4">
                  {person.name}
                </h2>

                <p className="text-gray-700 text-lg leading-8 mb-8">
                  {person.description}
                </p>

                <Link
                  href={person.link}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
                >
                  Детальніше →
                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}