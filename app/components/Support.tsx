import Image from "next/image";

export default function Support() {
  return (
    <section
      id="support"
      className="bg-gray-100 py-28 px-6 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto">

        <div className="text-center">

          <div className="text-6xl mb-5">❤️</div>

          <h2 className="text-5xl font-bold text-black mb-8">
            Підтримати проєкт
          </h2>

          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-9">
            Nya Live — незалежний сайт про Новояворівськ.
            Якщо вам подобається цей проєкт і ви хочете допомогти його розвитку,
            можете підтримати нас добровільним донатом.
          </p>

        </div>

        <div className="mt-20 grid lg:grid-cols-2 gap-14 items-center">

          <div className="bg-white rounded-3xl shadow-lg p-10">

            <h3 className="text-3xl font-bold text-black mb-6">
              На що підуть кошти?
            </h3>

            <ul className="space-y-5 text-lg text-gray-700">

              <li>✅ Розвиток сайту</li>
              <li>✅ Нові функції</li>
              <li>✅ Форум для жителів</li>
              <li>✅ Сервер та домен</li>
              <li>✅ Розвиток Nya Live</li>

            </ul>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-10 text-center">

            <Image
              src="/images/qr.png"
              alt="QR"
              width={300}
              height={300}
              className="mx-auto rounded-2xl"
            />

            <a
              href="https://donatello.to/nya-live"
              target="_blank"
              className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-semibold transition"
            >
              Підтримати онлайн
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}