import Image from "next/image";
import Link from "next/link";

export default function DzidzioPage() {
  return (
    <main className="bg-white min-h-screen">

      {/* HERO */}

      <section className="relative h-[75vh]">

        <Image
          src="/images/people/dzidzio.jpg"
          alt="DZIDZIO"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-black/55"></div>

        <div className="absolute inset-0 flex items-center justify-center">

          <div className="text-center text-white">

            <p className="uppercase tracking-[5px] text-blue-300 mb-4">
              Відомі люди Новояворівська
            </p>

            <h1 className="text-7xl font-bold">
              Михайло Хома
            </h1>

            <p className="text-3xl mt-5">
              DZIDZIO
            </p>

          </div>

        </div>

      </section>

      <section className="max-w-6xl mx-auto py-24 px-6">

        <Link
          href="/people"
          className="inline-block mb-14 text-blue-600 hover:text-blue-800 font-semibold"
        >
          ← Назад до відомих людей
        </Link>

        <div className="grid lg:grid-cols-3 gap-14">

          <div>

            <Image
              src="/images/people/dzidzio.jpg"
              alt="DZIDZIO"
              width={500}
              height={700}
              className="rounded-3xl shadow-2xl w-full"
            />

            <div className="bg-gray-100 rounded-3xl p-8 mt-8">

              <h3 className="text-2xl font-bold mb-6">
                Основна інформація
              </h3>

              <div className="space-y-4 text-lg">

                <p><strong>Повне ім'я:</strong><br />Михайло Михайлович Хома</p>

                <p><strong>Сценічне ім'я:</strong><br />DZIDZIO</p>

                <p><strong>Народився:</strong><br />20 листопада 1983 року</p>

                <p><strong>Місце народження:</strong><br />Новояворівськ</p>

                <p><strong>Професія:</strong><br />Співак, актор, режисер, продюсер</p>

              </div>

            </div>

          </div>

          <div className="lg:col-span-2">

            <h2 className="text-5xl font-bold mb-10">
              Біографія
            </h2>

            <div className="space-y-10 text-xl leading-10 text-gray-700">

              <div>

                <h3 className="text-3xl font-bold text-black mb-5">
                  Дитинство
                </h3>

                <p>
                  Михайло Хома народився та виріс у
                  Новояворівську. З раннього дитинства
                  захоплювався музикою та співом.
                  Його батьки підтримували творчі здібності,
                  тому ще у школі він виступав на концертах,
                  конкурсах та різних святкових заходах.
                </p>

              </div>

              <div>

                <h3 className="text-3xl font-bold text-black mb-5">
                  Освіта
                </h3>

                <p>
                  Після закінчення школи Михайло
                  продовжив музичну освіту.
                  Він багато працював над своїм голосом,
                  вивчав сценічну майстерність та
                  поступово формував власний стиль,
                  який пізніше зробив його відомим
                  на всю Україну.
                </p>

              </div>

                            <div>

                <h3 className="text-3xl font-bold text-black mb-5">
                  Проєкт DZIDZIO
                </h3>

                <p>
                  На початку 2000-х років Михайло створив
                  музичний проєкт DZIDZIO. Завдяки своєму
                  гумору, львівському діалекту та незвичайному
                  стилю він швидко став одним із найпопулярніших
                  артистів України. Його кліпи набирали
                  мільйони переглядів, а концерти проходили
                  з аншлагами по всій країні.
                </p>

              </div>

              <div>

                <h3 className="text-3xl font-bold text-black mb-5">
                  Кіно та телебачення
                </h3>

                <p>
                  Окрім музики, Михайло активно розвивався
                  як актор і режисер. Він зіграв головні ролі
                  у популярних українських фільмах
                  «DZIDZIO Контрабас»,
                  «DZIDZIO Перший раз»
                  та інших проєктах.
                  Також неодноразово був ведучим
                  телевізійних шоу та благодійних концертів.
                </p>

              </div>

              <div>

                <h3 className="text-3xl font-bold text-black mb-5">
                  Цікаві факти
                </h3>

                <ul className="list-disc pl-8 space-y-4">

                  <li>Народився у Новояворівську.</li>

                  <li>Є одним із найвідоміших українських шоуменів.</li>

                  <li>Його кліпи переглянули сотні мільйонів разів.</li>

                  <li>Виступав із благодійними концертами для України.</li>

                  <li>Працює як співак, актор, режисер і продюсер.</li>

                </ul>

              </div>

              <div>

                <h3 className="text-3xl font-bold text-black mb-5">
                  Досягнення
                </h3>

                <p>
                  DZIDZIO став одним із найуспішніших
                  українських музичних проєктів.
                  Його творчість зробила значний внесок
                  у розвиток сучасної української музики,
                  а ім'я Михайла Хоми стало відомим
                  далеко за межами України.
                </p>

              </div>

              <div>

                <h3 className="text-3xl font-bold text-black mb-5">
                  Відома фраза
                </h3>

                <blockquote className="border-l-4 border-blue-600 pl-6 italic text-2xl text-gray-800">
                  «Все буде добре!»
                </blockquote>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}