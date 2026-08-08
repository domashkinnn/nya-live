export default function Legends() {
  const legends = [
    {
      title: "Криве Озеро",
      text: "Місцеві жителі розповідають, що озеро приховує багато таємниць. Існують легенди про дивні звуки та незрозумілі явища біля води.",
    },
    {
      title: "Яворівський кар'єр",
      text: "Колись тут добували сірку. Сьогодні місце оповите історіями про затоплені дороги та техніку, яка залишилася під водою.",
    },
    {
      title: "Підземні ходи",
      text: "За переказами, під містом існують старі підземні тунелі, які могли використовуватись ще десятки років тому.",
    },
  ];

  return (
    <section
      id="legends"
      className="bg-white py-28 px-6 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-blue-600 uppercase tracking-[4px] font-semibold">
            Легенди
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-black mt-4">
            Таємниці Новояворівська
          </h2>

          <p className="text-gray-700 text-lg mt-6 max-w-3xl mx-auto">
            Цікаві історії та місцеві легенди, які передаються від покоління
            до покоління.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {legends.map((legend) => (
            <div
              key={legend.title}
              className="bg-gray-100 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition"
            >
              <h3 className="text-2xl font-bold text-black mb-4">
                {legend.title}
              </h3>

              <p className="text-gray-700 leading-8">
                {legend.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}