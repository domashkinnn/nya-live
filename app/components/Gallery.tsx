import Image from "next/image";

const images = [
  { src: "/images/gallery1.jpg", title: "Новояворівськ" },
  { src: "/images/gallery2.jpg", title: "Центральна частина міста" },
  { src: "/images/gallery3.jpg", title: "Палац культури" },
  { src: "/images/gallery4.jpg", title: "Озеро" },
  { src: "/images/gallery5.jpg", title: "Парк" },
  { src: "/images/gallery6.jpg", title: "Вечірній Новояворівськ" },
];

export default function Gallery() {
  return (
    <section className="bg-gray-50 py-28 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">

          <p className="text-blue-600 uppercase tracking-[4px] font-semibold">
            Галерея
          </p>

          <h2 className="text-5xl font-bold text-gray-900 mt-4">
            Новояворівськ у фотографіях
          </h2>

          <p className="text-gray-600 text-lg mt-6 max-w-3xl mx-auto">
            Добірка найкрасивіших місць міста. Натисніть на фотографію,
            щоб роздивитися її ближче.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

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
                className="w-full h-72 object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-end">

                <h3 className="text-white text-2xl font-bold p-6">
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