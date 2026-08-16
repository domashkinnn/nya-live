export default function Legends() {
  const legends = [
    {
      number: "01",
      icon: "🌊",
      title: "Криве Озеро",
      text: "Місцеві жителі розповідають, що озеро приховує багато таємниць. Існують легенди про дивні звуки та незрозумілі явища біля води.",
    },
    {
      number: "02",
      icon: "⛏️",
      title: "Яворівський кар'єр",
      text: "Колись тут добували сірку. Сьогодні місце оповите історіями про затоплені дороги та техніку, яка залишилася під водою.",
    },
    {
      number: "03",
      icon: "🕯️",
      title: "Підземні ходи",
      text: "За переказами, під містом існують старі підземні тунелі, які могли використовуватись ще десятки років тому.",
    },
  ];

  return (
    <section
      id="legends"
      className="scroll-mt-24 bg-white px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14 lg:mb-16">

          <p className="text-xs font-bold uppercase tracking-[3px] text-blue-600 sm:text-sm sm:tracking-[4px]">
            Легенди
          </p>

          <h2 className="mt-3 text-3xl font-black leading-tight text-black sm:mt-4 sm:text-4xl md:text-5xl">
            Таємниці Новояворівська
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
            Цікаві історії та місцеві легенди, які передаються
            від покоління до покоління.
          </p>

        </div>


        {/* LEGEND CARDS */}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-7 lg:gap-8">

          {legends.map((legend) => (

            <article
              key={legend.title}
              className="group relative overflow-hidden rounded-3xl bg-gray-100 p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-8"
            >

              {/* NUMBER */}

              <div className="absolute right-5 top-4 text-5xl font-black text-gray-200 transition duration-300 group-hover:text-blue-100 sm:right-6 sm:top-5">
                {legend.number}
              </div>


              {/* ICON */}

              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm sm:h-16 sm:w-16 sm:text-4xl">
                {legend.icon}
              </div>


              {/* TITLE */}

              <h3 className="relative mt-6 text-2xl font-black leading-tight text-black sm:text-3xl">
                {legend.title}
              </h3>


              {/* TEXT */}

              <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-5 sm:text-lg sm:leading-8">
                {legend.text}
              </p>


              {/* BOTTOM LINE */}

              <div className="mt-6 h-1 w-12 rounded-full bg-blue-600 transition-all duration-300 group-hover:w-20" />

            </article>

          ))}

        </div>


        {/* INFO */}

        <div className="mt-8 rounded-3xl bg-blue-50 p-6 sm:mt-10 sm:p-8">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
              💡
            </div>

            <p className="text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
              Легенди — це частина живої пам'яті міста. Деякі з них
              можуть бути переказами або особистими спогадами мешканців,
              тому не всі історії мають документальне підтвердження.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}