"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const ADMIN_IDS = [
  "f3f8673d-faf6-4ada-bf41-052179d4e3c9",
  "1c2c459f-8a16-43e2-aa23-e988f4dccd85",
  "4146df2f-36be-4de0-b5ed-1c30eca2c997",
];

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
  avatar_url: string | null;
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

    return () => subscription.unsubscribe();
  }, []);

  async function loadData() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);

    const { data: postsData, error: postsError } = await supabase
      .from("posts")
      .select("id, user_id, caption, image_url, created_at")
      .order("created_at", { ascending: false });

    if (postsError) {
      console.error(postsError);
      setLoading(false);
      return;
    }

    const loadedPosts = postsData || [];
    setPosts(loadedPosts);

    const userIds = [
      ...new Set(loadedPosts.map((post) => post.user_id)),
    ];

    if (userIds.length > 0) {
      const { data: profilesData, error } = await supabase
        .from("profiles")
        .select("id, nickname, avatar_url")
        .in("id", userIds);

      if (error) {
        console.error(error);
      }

      const map: Record<string, Profile> = {};

      profilesData?.forEach((profile) => {
        map[profile.id] = profile;
      });

      setProfiles(map);
    }

    setLoading(false);
  }

  function isAdmin(id: string) {
    return ADMIN_IDS.includes(id);
  }

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
  }

  async function deletePost(postId: string, postOwnerId: string) {
    if (!user) return;

    const admin = isAdmin(user.id);
    const owner = user.id === postOwnerId;

    if (!admin && !owner) {
      alert("У тебе немає прав для видалення цього поста.");
      return;
    }

    if (!confirm("Точно видалити цей пост?")) return;

    let query = supabase
      .from("posts")
      .delete()
      .eq("id", postId);

    if (!admin) {
      query = query.eq("user_id", user.id);
    }

    const { error } = await query;

    if (error) {
      alert("Не вдалося видалити пост: " + error.message);
      return;
    }

    setPosts((current) =>
      current.filter((post) => post.id !== postId)
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">

      {/* HEADER */}

      <section className="bg-gradient-to-r from-blue-700 to-cyan-500 text-white">

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">

          <Link
            href="/"
            className="mb-6 inline-block text-sm font-medium text-white/90 transition hover:text-white sm:mb-8 sm:text-base"
          >
            ← На головну
          </Link>


          <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">

            {/* TITLE */}

            <div className="min-w-0">

              <h1 className="text-3xl font-black leading-tight sm:text-5xl md:text-6xl">
                Форум Nya Live
              </h1>

              <p className="mt-3 max-w-xl text-base leading-6 text-white/90 sm:mt-4 sm:text-lg sm:leading-7">
                Обговорення життя Новояворівська.
              </p>

            </div>


            {/* USER BUTTONS */}

            <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">

              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="flex items-center justify-center rounded-xl bg-white/15 px-5 py-3 text-sm font-bold backdrop-blur transition hover:bg-white/25 sm:text-base"
                  >
                    👤 Мій профіль
                  </Link>

                  <button
                    onClick={logout}
                    className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-gray-100 sm:text-base"
                  >
                    Вийти
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-gray-100 sm:text-base"
                  >
                    Увійти
                  </Link>

                  <Link
                    href="/register"
                    className="flex items-center justify-center rounded-xl bg-blue-900/50 px-5 py-3 text-sm font-bold transition hover:bg-blue-900/70 sm:text-base"
                  >
                    Зареєструватися
                  </Link>
                </>
              )}

            </div>

          </div>


          {/* CREATE POST */}

          <div className="mt-7 sm:mt-10">

            <Link
              href={user ? "/forum/create" : "/login"}
              className="flex w-full items-center justify-center rounded-xl bg-white px-6 py-4 text-center font-bold text-blue-700 shadow-lg transition hover:bg-gray-100 sm:inline-flex sm:w-auto"
            >
              {user
                ? "➕ Створити пост"
                : "🔐 Увійдіть, щоб створити пост"}
            </Link>

          </div>

        </div>

      </section>


      {/* POSTS */}

      <section className="mx-auto max-w-5xl px-3 py-5 sm:px-6 sm:py-10">

        {loading ? (

          <div className="rounded-3xl bg-white p-8 text-center shadow-lg sm:p-10">

            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

            <p className="font-semibold text-gray-600">
              Завантаження...
            </p>

          </div>

        ) : posts.length === 0 ? (

          <div className="rounded-3xl bg-white p-7 text-center shadow-lg sm:p-12">

            <div className="mb-4 text-5xl sm:mb-5 sm:text-6xl">
              💬
            </div>

            <h2 className="text-2xl font-black text-gray-900 sm:text-3xl">
              Поки що немає постів
            </h2>

            <p className="mt-3 text-sm text-gray-600 sm:text-base">
              Будь першим, хто щось опублікує!
            </p>

          </div>

        ) : (

          <div className="space-y-4 sm:space-y-6">

            {posts.map((post) => {

              const profile = profiles[post.user_id];

              const nickname =
                profile?.nickname || "Користувач";

              const avatar =
                profile?.avatar_url || null;

              const admin = isAdmin(post.user_id);

              const canDelete =
                user &&
                (isAdmin(user.id) || user.id === post.user_id);

              return (

                <article
                  key={post.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-md sm:rounded-3xl sm:shadow-lg"
                >

                  {/* AUTHOR */}

                  <div className="flex items-start justify-between gap-3 p-4 sm:p-6">

                    <Link
                      href={`/profile/${post.user_id}`}
                      className="group flex min-w-0 items-center gap-3"
                    >

                      {/* AVATAR */}

                      {avatar ? (

                        <img
                          src={avatar}
                          alt={nickname}
                          className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-blue-100 sm:h-12 sm:w-12"
                        />

                      ) : (

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xl sm:h-12 sm:w-12 sm:text-2xl">
                          👤
                        </div>

                      )}


                      {/* NAME */}

                      <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">

                          <p className="max-w-[180px] truncate text-sm font-bold text-gray-900 transition group-hover:text-blue-600 sm:max-w-none sm:text-base">
                            {nickname}
                          </p>

                          {admin && (

                            <span className="shrink-0 rounded-md bg-blue-600 px-1.5 py-0.5 text-[9px] font-extrabold tracking-wide text-white sm:px-2 sm:text-[10px]">
                              АДМІН
                            </span>

                          )}

                        </div>

                        <p className="mt-0.5 text-[10px] text-gray-400 sm:text-xs">
                          {new Date(
                            post.created_at
                          ).toLocaleString("uk-UA")}
                        </p>

                      </div>

                    </Link>


                    {/* DELETE */}

                    {canDelete && (

                      <button
                        onClick={() =>
                          deletePost(post.id, post.user_id)
                        }
                        className="shrink-0 rounded-lg p-2 text-sm text-red-500 transition hover:bg-red-50 sm:px-3 sm:py-2 sm:text-sm"
                        title="Видалити пост"
                      >
                        <span className="sm:hidden">
                          🗑️
                        </span>

                        <span className="hidden sm:inline">
                          🗑 Видалити
                        </span>

                      </button>

                    )}

                  </div>


                  {/* IMAGE */}

                  {post.image_url && (

                    <div className="w-full bg-gray-50">

                      <img
                        src={post.image_url}
                        alt="Фото поста"
                        className="max-h-[75vh] w-full object-contain"
                      />

                    </div>

                  )}


                  {/* TEXT */}

                  {post.caption && (

                    <div className="px-4 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">

                      <p className="whitespace-pre-wrap break-words text-[15px] leading-6 text-gray-800 sm:text-lg sm:leading-7">
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