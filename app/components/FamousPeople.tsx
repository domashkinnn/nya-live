import Image from "next/image";
import Link from "next/link";

const people = [
  {
    name: "Андрій Кузьменко (Скрябін)",
    image: "/images/people/skryabin.jpg",
    description:
      "Легендарний український музикант, письменник і телеведучий. Саме Новояворівськ став містом, де пройшла значна частина його життя.",
  },
  {
    name: "Михайло Хома (DZIDZIO)",
    image: "/images/people/dzidzio.jpg",
    description:
      "Український співак, актор, режисер і продюсер. Один із найвідоміших уродженців Новояворівська.",
  },
  {
    name: "Назар Русин",
    image: "/images/people/nazar-rusyn.jpg",
    description:
      "Український професійний футболіст, який розпочав свій шлях саме у Новояворівську.",
  },
  {
    name: "Олег Русин",
    image: "/images/people/oleh-rusyn.jpg",
    description:
      "Представник відомої спортивної родини Русиних із Новояворівська.",
  },
];

export default function FamousPeople() {
  return (
    <section
      id="people"
      className="bg-white py-28 px-6 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-blue-600 uppercase tracking-[4px] font-semibold">
            Відомі люди
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-black mt-4">
            Люди, якими пишається Новояворівськ
          </h2>

          <p className="text-gray-700 text-lg mt-6 max-w-3xl mx-auto">
            Новояворівськ подарував Україні талановитих музикантів,
            спортсменів та людей, які прославили наше місто далеко за його
            межами.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {people.map((person) => (
            <div
              key={person.name}
              className="bg-gray-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <Image
                src={person.image}
                alt={person.name}
                width={500}
                height={700}
                className="w-full h-80 sm:h-96 object-cover"
              />

              <div className="p-6">
                <h3 className="text-2xl font-bold text-black mb-4">
                  {person.name}
                </h3>

                <p className="text-gray-700 leading-7">
                  {person.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/people"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl text-lg font-semibold transition"
          >
            Переглянути всіх →
          </Link>
        </div>
      </div>
    </section>
  );
}