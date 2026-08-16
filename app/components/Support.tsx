import Image from "next/image";

export default function Support() {
  return (
    <section
      id="support"
      className="scroll-mt-24 bg-gray-100 px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <div className="mx-auto max-w-3xl text-center">

          <div className="mb-4 text-5xl sm:mb-5 sm:text-6xl">
            ❤️
          </div>

          <h2 className="text-3xl font-black leading-tight text-black sm:text-4xl md:text-5xl">
            Підтримати проєкт
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg md:text-xl md:leading-9">
            Nya Live — незалежний сайт про Новояворівськ.
            Якщо вам подобається цей проєкт і ви хочете допомогти
            його розвитку, можете підтримати нас добровільним донатом.
          </p>

        </div>


        {/* CONTENT */}

        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 sm:mt-14 sm:gap-6 lg:mt-20 lg:grid-cols-2 lg:gap-14">

          {/* MONEY */}

          <div className="rounded-3xl bg-white p-6 shadow-lg sm:p-8 lg:p-10">

            <div className="mb-6 flex items-center gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-2xl">
                💰
              </div>

              <h3 className="text-2xl font-black text-black sm:text-3xl">
                На що підуть кошти?
              </h3>

            </div>


            <ul className="space-y-4 text-base text-gray-700 sm:space-y-5 sm:text-lg">

              <li className="flex items-start gap-3">
                <span className="shrink-0">✅</span>
                <span>Розвиток сайту</span>
              </li>

              <li className="flex items-start gap-3">
                <span className="shrink-0">✅</span>
                <span>Нові функції</span>
              </li>

              <li className="flex items-start gap-3">
                <span className="shrink-0">✅</span>
                <span>Форум для жителів</span>
              </li>

              <li className="flex items-start gap-3">
                <span className="shrink-0">✅</span>
                <span>Сервер та домен</span>
              </li>

              <li className="flex items-start gap-3">
                <span className="shrink-0">✅</span>
                <span>Розвиток Nya Live</span>
              </li>

            </ul>

          </div>


          {/* DONATION */}

          <div className="flex flex-col items-center rounded-3xl bg-white p-6 text-center shadow-lg sm:p-8 lg:p-10">

            <p className="text-lg font-bold text-gray-900 sm:text-xl">
              Підтримати Nya Live
            </p>

            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500 sm:text-base">
              Відскануйте QR-код або натисніть кнопку нижче.
            </p>


            {/* QR */}

            <div className="mt-6 rounded-2xl bg-white p-2 shadow-md sm:mt-8">

              <Image
                src="/images/qr.png"
                alt="QR-код для підтримки Nya Live"
                width={300}
                height={300}
                className="h-56 w-56 rounded-xl object-contain sm:h-64 sm:w-64 lg:h-[300px] lg:w-[300px]"
              />

            </div>


            {/* BUTTON */}

            <a
              href="https://donatello.to/nya-live"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-7 py-4 font-bold text-white shadow-md transition hover:-translate-y-1 hover:bg-blue-700 sm:mt-8 sm:w-auto sm:px-10"
            >
              ❤️ Підтримати онлайн
            </a>

          </div>

        </div>


        {/* FOOTER TEXT */}

        <div className="mt-8 text-center sm:mt-10">

          <p className="text-sm leading-6 text-gray-500">
            Дякуємо кожному, хто підтримує розвиток Nya Live ❤️
          </p>

        </div>

      </div>
    </section>
  );
}