import Image from "next/image";

const images = [
  { src: "/images/gallery1.jpg", title: "Криве озеро" },
  { src: "/images/gallery2.jpg", title: "Кристал" },
  { src: "/images/gallery3.jpg", title: "Панорама Новояворівська" },
  {
    src: "/images/gallery4.jpg",
    title: "Мурал Андрія Кузьменка (Скрябіна)",
  },
  {
    src: "/images/gallery5.jpg",
    title: "Яворівський гірничо-хімічний комбінат",
  },
  { src: "/images/gallery6.jpg", title: "Вулиці Новояворівська" },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="scroll-mt-24 bg-gray-50 px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14 lg:mb-16">

          <p className="text-xs font-bold uppercase tracking-[3px] text-blue-600 sm:text-sm sm:tracking-[4px]">
            Галерея
          </p>

          <h2 className="mt-3 text-3xl font-black leading-tight text-gray-900 sm:mt-4 sm:text-4xl md:text-5xl">
            Новояворівськ у фотографіях
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-5 sm:text-lg sm:leading-8">
            Добірка найкрасивіших місць міста.
            Натисніть на фотографію, щоб роздивитися її ближче.
          </p>

        </div>


        {/* GALLERY */}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">

          {images.map((image, index) => (

            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl bg-gray-200 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >

              {/* IMAGE */}

              <div className="relative">

                <Image
                  src={image.src}
                  alt={image.title}
                  width={600}
                  height={400}
                  className="h-[270px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[300px] lg:h-64"
                />

                {/* DARK GRADIENT */}

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

              </div>


              {/* TITLE */}

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">

                <h3 className="text-lg font-black text-white drop-shadow-lg sm:text-xl md:text-2xl">
                  {image.title}
                </h3>

              </div>

            </div>

          ))}

        </div>


        {/* BOTTOM INFO */}

        <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm sm:mt-10 sm:p-8">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
              📸
            </div>

            <div>

              <h3 className="font-bold text-gray-900">
                Фото Новояворівська
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-600 sm:text-base">
                Місця, люди та моменти, які допомагають побачити
                місто з різних сторін.
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}