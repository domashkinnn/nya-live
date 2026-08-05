import Image from "next/image";

export default function About() {
  return (
    <section
      id="history"
      className="bg-white py-28 px-6 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        <div>
          <Image
            src="/images/about.jpg"
            alt="Новояворівськ"
            width={700}
            height={500}
            className="rounded-3xl shadow-2xl object-cover w-full"
          />
        </div>

        <div>

          <span className="text-blue-600 font-semibold uppercase tracking-[3px]">
            Історія міста
          </span>

          <h2 className="text-5xl font-bold text-gray-900 mt-4 mb-8">
            Про Новояворівськ
          </h2>

          <div className="space-y-6 text-gray-700 text-lg leading-9">

            <p>
              Новояворівськ — молоде місто Львівської області, яке виникло
              завдяки відкриттю великих покладів сірки та будівництву
              Яворівського гірничо-хімічного підприємства.
            </p>

            <p>
              Попри свій молодий вік, місто вже має власну історію,
              традиції та особливу атмосферу. Тут поєднуються сучасні
              житлові квартали, зелені парки, активне культурне життя та
              працьовиті люди, які щодня розвивають свою громаду.
            </p>

            <p>
              Сьогодні Новояворівськ є одним із найбільших міст
              Яворівського району та продовжує змінюватися, зберігаючи
              пам'ять про своє минуле і впевнено дивлячись у майбутнє.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}