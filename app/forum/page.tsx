"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Post = {
  id: string;
  user_id: string;
  caption: string | null;
  image_url: string | null;
  created_at: string;
};

type Profile = {
  id: string;
  nickname: string;
};

export default function ForumPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function loadData() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);

    const { data: postsData, error } = await supabase
      .from("posts")
      .select("id, user_id, caption, image_url, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    const loadedPosts = postsData || [];
    setPosts(loadedPosts);

    const userIds = [
      ...new Set(loadedPosts.map((post) => post.user_id)),
    ];

    if (userIds.length > 0) {
      const { data: profilesData } = await supabase
        .from("profiles")
        .select("id, nickname")
        .in("id", userIds);

      const profileMap: Record<string, Profile> = {};

      profilesData?.forEach((profile) => {
        profileMap[profile.id] = profile;
      });

      setProfiles(profileMap);
    }

    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
  }

  async function deletePost(postId: string, postUserId: string) {
    if (!user || user.id !== postUserId) {
      return;
    }

    const confirmed = confirm(
      "Ти точно хочеш видалити цей пост?"
    );

    if (!confirmed) {
      return;
    }

    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", postId)
      .eq("user_id", user.id);

    if (error) {
      alert("Не вдалося видалити пост: " + error.message);
      return;
    }

    setPosts((current) =>
      current.filter((post) => post.id !== postId)
    );
  }

  function getNickname(userId: string) {
    return profiles[userId]?.nickname || "Користувач";
  }

  return (
    <main className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <section className="bg-gradient-to-r from-blue-700 to-cyan-500 text-white">

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">

          <Link
            href="/"
            className="inline-block mb-8 text-white/90 hover:text-white transition"
          >
            ← На головну
          </Link>

          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

            <div>

              <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
                Форум Nya Live
              </h1>

              <p className="mt-4 text-lg sm:text-xl text-white/90">
                Обговорення життя Новояворівська.
              </p>

            </div>

            <div className="flex flex-wrap gap-3">

              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="rounded-xl bg-white/15 px-5 py-3 font-semibold hover:bg-white/25 transition"
                  >
                    👤 Мій профіль
                  </Link>

                  <button
                    onClick={logout}
                    className="rounded-xl bg-white px-5 py-3 font-bold text-blue-700 hover:bg-gray-100 transition"
                  >
                    Вийти
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="rounded-xl bg-white px-5 py-3 font-bold text-blue-700 hover:bg-gray-100 transition"
                  >
                    Увійти
                  </Link>

                  <Link
                    href="/register"
                    className="rounded-xl bg-blue-900/50 px-5 py-3 font-bold text-white hover:bg-blue-900/70 transition"
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
                className="inline-block rounded-xl bg-white px-6 py-4 font-bold text-blue-700 hover:bg-gray-100 transition sm:px-7"
              >
                ➕ Створити пост
              </Link>
            ) : (
              <Link
                href="/login"
                className="inline-block rounded-xl bg-white px-6 py-4 font-bold text-blue-700 hover:bg-gray-100 transition sm:px-7"
              >
                🔐 Увійдіть, щоб створити пост
              </Link>
            )}

          </div>

        </div>

      </section>

      {/* POSTS */}
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">

        {loading ? (

          <div className="rounded-3xl bg-white p-10 text-center shadow-lg">
            <p className="text-lg font-semibold text-gray-600">
              Завантаження...
            </p>
          </div>

        ) : posts.length === 0 ? (

          <div className="rounded-3xl bg-white p-10 text-center shadow-lg sm:p-12">

            <div className="mb-5 text-6xl">
              💬
            </div>

            <h2 className="text-3xl font-bold text-gray-900">
              Поки що немає постів
            </h2>

            <p className="mt-3 text-gray-600">
              Будь першим, хто щось опублікує!
            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {posts.map((post) => {

              const nickname = getNickname(post.user_id);
              const isOwner =
                user && user.id === post.user_id;

              return (

                <article
                  key={post.id}
                  className="overflow-hidden rounded-3xl bg-white shadow-lg"
                >

                  {/* AUTHOR */}
                  <div className="flex items-center justify-between p-5 sm:p-6">

                    <Link
                      href={`/profile/${post.user_id}`}
                      className="flex min-w-0 items-center gap-3 group"
                    >

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-2xl transition group-hover:bg-blue-200">
                        👤
                      </div>

                      <div className="min-w-0">

                        <p className="truncate font-bold text-gray-900 group-hover:text-blue-600 transition">
                          {nickname}
                        </p>

                        <p className="text-xs text-gray-400">
                          {new Date(
                            post.created_at
                          ).toLocaleString("uk-UA")}
                        </p>

                      </div>

                    </Link>

                    {isOwner && (
                      <button
                        onClick={() =>
                          deletePost(post.id, post.user_id)
                        }
                        className="shrink-0 rounded-lg px-3 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 transition"
                      >
                        🗑 Видалити
                      </button>
                    )}

                  </div>

                  {/* IMAGE */}
                  {post.image_url && (
                    <div className="bg-gray-50">

                      <img
                        src={post.image_url}
                        alt="Фото поста"
                        className="max-h-[700px] w-full object-contain"
                      />

                    </div>
                  )}

                  {/* TEXT */}
                  {post.caption && (
                    <div className="px-5 pb-6 pt-5 sm:px-6">

                      <p className="whitespace-pre-wrap break-words text-base leading-7 text-gray-800 sm:text-lg">
                        {post.caption}
                      </p>

                    </div>
                  )}

                </article>

              );
            })}

          </div>

        )}

      </section>

    </main>
  );
}