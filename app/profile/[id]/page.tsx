"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Post = {
  id: string;
  caption: string | null;
  image_url: string | null;
  created_at: string;
};

export default function PublicProfilePage() {
  const params = useParams();
  const id = params.id as string;

  const [nickname, setNickname] = useState("Користувач");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadProfile();
    }
  }, [id]);

  async function loadProfile() {
    setLoading(true);

    const { data: postsData } = await supabase
      .from("posts")
      .select("id, user_id, caption, image_url, created_at")
      .eq("user_id", id)
      .order("created_at", { ascending: false });

    if (postsData) {
      setPosts(postsData);
    }

    if (postsData && postsData.length > 0) {
      // Беремо нікнейм із першого поста,
      // якщо він доступний через user metadata/профіль.
      const { data: profile } = await supabase
        .from("profiles")
        .select("nickname")
        .eq("id", id)
        .maybeSingle();

      if (profile?.nickname) {
        setNickname(profile.nickname);
      }
    } else {
      const { data: profile } = await supabase
        .from("profiles")
        .select("nickname")
        .eq("id", id)
        .maybeSingle();

      if (profile?.nickname) {
        setNickname(profile.nickname);
      }
    }

    setLoading(false);
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
                Постів: {posts.length}
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* POSTS */}
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">

        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Пости користувача
        </h2>

        {loading ? (
          <div className="rounded-3xl bg-white p-8 shadow text-center text-gray-500">
            Завантаження...
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-3xl bg-white p-8 shadow text-center text-gray-500">
            У цього користувача ще немає постів.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">

            {posts.map((post) => (

              <article
                key={post.id}
                className="overflow-hidden rounded-3xl bg-white shadow-lg"
              >

                {post.image_url && (
                  <img
                    src={post.image_url}
                    alt="Фото поста"
                    className="w-full max-h-[500px] object-cover"
                  />
                )}

                <div className="p-6">

                  {post.caption && (
                    <p className="text-gray-800 whitespace-pre-wrap break-words">
                      {post.caption}
                    </p>
                  )}

                  <p className="mt-4 text-sm text-gray-400">
                    {new Date(post.created_at).toLocaleString("uk-UA")}
                  </p>

                </div>

              </article>

            ))}

          </div>
        )}

      </section>

    </main>
  );
}