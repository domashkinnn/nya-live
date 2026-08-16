"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Post = {
  id: string;
  caption: string | null;
  image_url: string | null;
  created_at: string;
};

export default function ProfilePage() {
  const router = useRouter();

  const [nickname, setNickname] = useState("Користувач");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("nickname")
      .eq("id", user.id)
      .maybeSingle();

    setNickname(
      profile?.nickname ||
        user.user_metadata?.nickname ||
        "Користувач"
    );

    const { data: postsData } = await supabase
      .from("posts")
      .select("id, caption, image_url, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setPosts(postsData || []);
    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <main className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <section className="bg-gradient-to-r from-blue-700 to-cyan-500 text-white">

        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">

          <Link
            href="/forum"
            className="inline-block mb-8 text-white/90 hover:text-white transition"
          >
            ← Назад на форум
          </Link>

          <div className="flex flex-col sm:flex-row items-center gap-5">

            <div className="w-24 h-24 rounded-full bg-white/20 border-4 border-white/40 flex items-center justify-center text-5xl">
              👤
            </div>

            <div className="text-center sm:text-left">

              <h1 className="text-4xl sm:text-5xl font-bold">
                {nickname}
              </h1>

              <p className="mt-2 text-white/90">
                Мій профіль
              </p>

              <p className="mt-1 text-white/80">
                Постів: {posts.length}
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">

        <div className="flex flex-wrap gap-3 mb-8">

          <Link
            href="/forum"
            className="rounded-xl bg-white px-5 py-3 font-semibold text-gray-800 shadow hover:bg-gray-50 transition"
          >
            💬 Форум
          </Link>

          <Link
            href="/forum/create"
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow hover:bg-blue-700 transition"
          >
            ＋ Створити пост
          </Link>

          <button
            onClick={logout}
            className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white shadow hover:bg-red-700 transition"
          >
            Вийти
          </button>

        </div>

        {/* PROFILE INFO */}
        <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-lg mb-10">

          <h2 className="text-2xl font-bold text-gray-900">
            Інформація про профіль
          </h2>

          <div className="mt-6">

            <p className="text-sm text-gray-500">
              Нікнейм
            </p>

            <p className="mt-1 text-xl font-bold text-gray-900">
              {nickname}
            </p>

          </div>

        </div>

        {/* POSTS */}
        <div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Мої пости
          </h2>

          {loading ? (

            <div className="rounded-3xl bg-white p-8 shadow text-center text-gray-500">
              Завантаження...
            </div>

          ) : posts.length === 0 ? (

            <div className="rounded-3xl bg-white p-8 shadow text-center">

              <div className="text-5xl">
                📝
              </div>

              <h3 className="mt-4 text-2xl font-bold text-gray-900">
                У тебе ще немає постів
              </h3>

              <p className="mt-2 text-gray-600">
                Створи свій перший пост на форумі.
              </p>

              <Link
                href="/forum/create"
                className="mt-5 inline-block rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700 transition"
              >
                Створити пост
              </Link>

            </div>

          ) : (

            <div className="grid gap-6 sm:grid-cols-2">

              {posts.map((post) => (

                <article
                  key={post.id}
                  className="overflow-hidden rounded-3xl bg-white shadow-lg"
                >

                  {post.image_url && (
                    <div className="bg-gray-50">

                      <img
                        src={post.image_url}
                        alt="Фото поста"
                        className="w-full max-h-[500px] object-cover"
                      />

                    </div>
                  )}

                  <div className="p-6">

                    {post.caption && (
                      <p className="text-gray-800 whitespace-pre-wrap break-words">
                        {post.caption}
                      </p>
                    )}

                    <p className="mt-4 text-sm text-gray-400">
                      {new Date(
                        post.created_at
                      ).toLocaleString("uk-UA")}
                    </p>

                  </div>

                </article>

              ))}

            </div>

          )}

        </div>

      </section>

    </main>
  );
}