import Image from "next/image";

const images = [
  { src: "/images/gallery1.jpg", title: "Криве озеро" },
  { src: "/images/gallery2.jpg", title: "Кристал" },
  { src: "/images/gallery3.jpg", title: "Панорама Новояворівська" },
  { src: "/images/gallery4.jpg", title: "Мурал Андрія Кузьменка (Скрябіна)" },
  { src: "/images/gallery5.jpg", title: "Яворівський гірничо-хімічний комбінат" },
  { src: "/images/gallery6.jpg", title: "Вулиці Новояворівська" },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="bg-gray-50 py-16 md:py-28 px-6 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-blue-600 uppercase tracking-[4px] font-semibold text-sm md:text-base">
            Галерея
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
            Новояворівськ у фотографіях
          </h2>

          <p className="text-gray-600 text-base md:text-lg mt-5 md:mt-6 max-w-3xl mx-auto leading-7 md:leading-8">
            Добірка найкрасивіших місць міста. Натисніть на фотографію,
            щоб роздивитися її ближче.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl shadow-xl"
            >
              <Image
                src={image.src}
                alt={image.title}
                width={600}
                height={400}
                className="w-full h-64 sm:h-72 object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-end">
                <h3 className="text-white text-xl md:text-2xl font-bold p-5 md:p-6">
                  {image.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}