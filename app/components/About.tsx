import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 bg-white px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20">

        {/* PHOTO */}

        <div className="order-1">
          <div className="group overflow-hidden rounded-3xl shadow-2xl">

            <Image
              src="/images/about.jpg"
              alt="Новояворівськ"
              width={700}
              height={500}
              priority={false}
              className="h-[300px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[400px] lg:h-[500px]"
            />

          </div>
        </div>


        {/* TEXT */}

        <div className="order-2">

          <span className="text-xs font-bold uppercase tracking-[3px] text-blue-600 sm:text-sm">
            Історія міста
          </span>

          <h2 className="mt-3 mb-6 text-3xl font-black leading-tight text-gray-900 sm:mt-4 sm:mb-8 sm:text-4xl md:text-5xl">
            Про Новояворівськ
          </h2>

          <div className="space-y-5 text-base leading-7 text-gray-700 sm:space-y-6 sm:text-lg sm:leading-9">

            <p>
              Новояворівськ — молоде місто Львівської області,
              яке виникло завдяки відкриттю великих покладів
              сірки та будівництву Яворівського
              гірничо-хімічного підприємства.
            </p>

            <p>
              Попри свій молодий вік, місто вже має власну
              історію, традиції та особливу атмосферу.
              Тут поєднуються сучасні житлові квартали,
              зелені парки, активне культурне життя та
              працьовиті люди, які щодня розвивають свою громаду.
            </p>

            <p>
              Сьогодні Новояворівськ є одним із найбільших
              міст Яворівського району та продовжує змінюватися,
              зберігаючи пам&apos;ять про своє минуле і
              впевнено дивлячись у майбутнє.
            </p>

          </div>


          {/* SMALL INFO CARDS */}

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">

            <div className="rounded-2xl bg-blue-50 p-4">
              <div className="text-2xl">🏙️</div>

              <p className="mt-2 text-sm font-bold text-gray-900">
                Молоде місто
              </p>
            </div>

            <div className="rounded-2xl bg-cyan-50 p-4">
              <div className="text-2xl">🌳</div>

              <p className="mt-2 text-sm font-bold text-gray-900">
                Зелене місто
              </p>
            </div>

            <div className="rounded-2xl bg-gray-100 p-4">
              <div className="text-2xl">❤️</div>

              <p className="mt-2 text-sm font-bold text-gray-900">
                Свої традиції
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}