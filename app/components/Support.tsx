export default function Support() {
  return (
    <section
      id="support"
      className="bg-gray-100 py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            ❤️ Підтримати проєкт
          </h2>

          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-8">
            Nya Live — це незалежний сайт про Новояворівськ,
            створений для жителів та гостей міста.
            Якщо вам подобається цей проєкт і ви хочете допомогти
            його розвитку, можете підтримати нас добровільним донатом.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-14 items-center">

          {/* Текст */}
          <div>

            <h3 className="text-3xl font-bold mb-6">
              На що підуть кошти?
            </h3>

            <ul className="space-y-4 text-lg text-gray-700">
              <li>🌐 Оплата домену</li>
              <li>☁️ Оплата хостингу</li>
              <li>⚙️ Розробка нових функцій</li>
              <li>🛠️ Підтримка та розвиток сайту</li>
            </ul>

            <a
              href="https://donatello.to/nya-live"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="mt-10 bg-red-600 hover:bg-red-700 transition text-white px-8 py-4 rounded-xl text-lg font-semibold">
                ❤️ Підтримати проєкт
              </button>
            </a>

          </div>

          {/* QR */}
          <div className="flex justify-center">

            <img
              src="/images/qr.png"
              alt="QR код"
              className="rounded-2xl shadow-2xl w-80"
            />

          </div>

        </div>

      </div>
    </section>
  );
}
