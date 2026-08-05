export default function About() {
  return (
    <section id="history" className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Фото */}
        <div>
          <img
            src="/images/hero.jpg"
            alt="Новояворівськ"
            className="rounded-2xl shadow-2xl"
          />
        </div>

        {/* Текст */}
        <div>
          <h2 className="text-5xl font-bold mb-8">
            Про Новояворівськ
          </h2>

          <p className="text-lg text-gray-700 leading-9">
            Новояворівськ — молоде місто Львівської області,
            засноване у 1965 році. Воно виникло як місто для
            працівників підприємства «Сірка», а сьогодні є
            сучасним містом із власною історією, культурою
            та активною громадою.
          </p>
        </div>
      </div>
    </section>
  );
}