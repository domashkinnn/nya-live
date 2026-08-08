"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Topic = {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
};

export default function ForumPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [user, setUser] = useState<any>(null);
  const [nickname, setNickname] = useState("");

  async function loadData() {
    const { data: topicsData } = await supabase
      .from("topics")
      .select("*")
      .order("created_at", { ascending: false });

    setTopics(topicsData || []);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);

    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("nickname")
        .eq("id", user.id)
        .single();

      setNickname(profile?.nickname || "");
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
    setNickname("");
  }

  return (
    <main className="min-h-screen bg-gray-100">

      <section className="bg-gradient-to-r from-blue-700 to-cyan-500 text-white">

        <div className="max-w-7xl mx-auto px-6 py-16">

          <Link
            href="/"
            className="inline-block mb-8 text-white/90 hover:text-white transition"
          >
            ← На головну
          </Link>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">

            <div>
              <h1 className="text-5xl md:text-6xl font-bold">
                Форум Nya Live
              </h1>

              <p className="text-xl mt-4 text-white/90">
                Обговорення життя Новояворівська.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">

              {user ? (
                <>
                  <div className="bg-white/15 px-5 py-3 rounded-xl">
                    👤 {nickname}
                  </div>

                  <button
                    onClick={logout}
                    className="bg-white text-blue-700 px-5 py-3 rounded-xl font-bold hover:bg-gray-100 transition"
                  >
                    Вийти
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="bg-white text-blue-700 px-5 py-3 rounded-xl font-bold hover:bg-gray-100 transition"
                  >
                    Увійти
                  </Link>

                  <Link
                    href="/register"
                    className="bg-blue-900/50 text-white px-5 py-3 rounded-xl font-bold hover:bg-blue-900/70 transition"
                  >
                    Зареєструватися
                  </Link>
                </>
              )}

            </div>

          </div>

          <div className="mt-10">

            {user ? (
              <Link
                href="/forum/create"
                className="inline-block bg-white text-blue-700 px-7 py-4 rounded-xl font-bold hover:bg-gray-100 transition"
              >
                ➕ Створити тему
              </Link>
            ) : (
              <Link
                href="/login"
                className="inline-block bg-white text-blue-700 px-7 py-4 rounded-xl font-bold hover:bg-gray-100 transition"
              >
                🔐 Увійдіть, щоб створити тему
              </Link>
            )}

          </div>

        </div>

      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">

        {topics.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">

            <div className="text-6xl mb-5">
              💬
            </div>

            <h2 className="text-3xl font-bold text-gray-900">
              Поки що немає тем
            </h2>

            <p className="text-gray-600 mt-3">
              Будь першим, хто створить тему!
            </p>

          </div>
        ) : (
          <div className="space-y-5">

            {topics.map((topic) => (
              <Link
                key={topic.id}
                href={`/forum/${topic.id}`}
                className="block bg-white rounded-3xl shadow-lg p-7 hover:shadow-xl hover:-translate-y-1 transition"
              >

                <h2 className="text-2xl font-bold text-gray-900">
                  {topic.title}
                </h2>

                <p className="text-gray-600 mt-2">
                  Автор:{" "}
                  <span className="font-semibold text-blue-600">
                    {topic.author}
                  </span>
                </p>

                <p className="text-gray-700 mt-5 line-clamp-2">
                  {topic.content}
                </p>

                <p className="text-sm text-gray-500 mt-5">
                  {new Date(topic.created_at).toLocaleString("uk-UA")}
                </p>

              </Link>
            ))}

          </div>
        )}

      </section>

    </main>
  );
}