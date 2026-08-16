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
      className="scroll-mt-24 bg-white px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14 lg:mb-16">

          <p className="text-xs font-bold uppercase tracking-[3px] text-blue-600 sm:text-sm sm:tracking-[4px]">
            Відомі люди
          </p>

          <h2 className="mt-3 text-3xl font-black leading-tight text-black sm:mt-4 sm:text-4xl md:text-5xl">
            Люди, якими пишається Новояворівськ
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
            Новояворівськ подарував Україні талановитих музикантів,
            спортсменів та людей, які прославили наше місто далеко
            за його межами.
          </p>

        </div>


        {/* PEOPLE */}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">

          {people.map((person) => (

            <article
              key={person.name}
              className="group overflow-hidden rounded-3xl bg-gray-100 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >

              {/* PHOTO */}

              <div className="relative overflow-hidden">

                <Image
                  src={person.image}
                  alt={person.name}
                  width={500}
                  height={700}
                  className="h-[380px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[420px] lg:h-80"
                />

                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent opacity-70" />

              </div>


              {/* TEXT */}

              <div className="p-5 sm:p-6">

                <h3 className="text-xl font-black leading-tight text-black sm:text-2xl">
                  {person.name}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
                  {person.description}
                </p>

              </div>

            </article>

          ))}

        </div>


        {/* BUTTON */}

        <div className="mt-10 text-center sm:mt-14 lg:mt-16">

          <Link
            href="/people"
            className="inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-7 py-4 text-base font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-blue-700 sm:w-auto sm:px-10 sm:text-lg"
          >
            Переглянути всіх →
          </Link>

        </div>

      </div>
    </section>
  );
}