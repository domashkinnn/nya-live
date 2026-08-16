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
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">

          <Link
            href="/"
            className="mb-8 inline-block text-white/90 hover:text-white"
          >
            ← На головну
          </Link>

          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

            <div>
              <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
                Форум Nya Live
              </h1>

              <p className="mt-4 text-lg text-white/90">
                Обговорення життя Новояворівська.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">

              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="rounded-xl bg-white/15 px-5 py-3 font-semibold hover:bg-white/25"
                  >
                    👤 Мій профіль
                  </Link>

                  <button
                    onClick={logout}
                    className="rounded-xl bg-white px-5 py-3 font-bold text-blue-700 hover:bg-gray-100"
                  >
                    Вийти
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="rounded-xl bg-white px-5 py-3 font-bold text-blue-700"
                  >
                    Увійти
                  </Link>

                  <Link
                    href="/register"
                    className="rounded-xl bg-blue-900/50 px-5 py-3 font-bold"
                  >
                    Зареєструватися
                  </Link>
                </>
              )}

            </div>
          </div>

          <div className="mt-10">
            <Link
              href={user ? "/forum/create" : "/login"}
              className="inline-block rounded-xl bg-white px-6 py-4 font-bold text-blue-700 hover:bg-gray-100"
            >
              {user
                ? "➕ Створити пост"
                : "🔐 Увійдіть, щоб створити пост"}
            </Link>
          </div>

        </div>
      </section>

      {/* POSTS */}
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">

        {loading ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-lg">
            <p className="font-semibold text-gray-600">
              Завантаження...
            </p>
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-lg">
            <div className="mb-5 text-6xl">💬</div>

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
                  className="overflow-hidden rounded-3xl bg-white shadow-lg"
                >

                  {/* AUTHOR */}
                  <div className="flex items-center justify-between p-5 sm:p-6">

                    <Link
                      href={`/profile/${post.user_id}`}
                      className="group flex min-w-0 items-center gap-3"
                    >

                      {avatar ? (
                        <img
                          src={avatar}
                          alt={nickname}
                          className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-blue-100"
                        />
                      ) : (
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-2xl">
                          👤
                        </div>
                      )}

                      <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-2">

                          <p className="truncate font-bold text-gray-900 group-hover:text-blue-600">
                            {nickname}
                          </p>

                          {admin && (
                            <span className="rounded-md bg-blue-600 px-2 py-0.5 text-[10px] font-extrabold text-white">
                              АДМІН
                            </span>
                          )}

                        </div>

                        <p className="text-xs text-gray-400">
                          {new Date(
                            post.created_at
                          ).toLocaleString("uk-UA")}
                        </p>

                      </div>

                    </Link>

                    {canDelete && (
                      <button
                        onClick={() =>
                          deletePost(post.id, post.user_id)
                        }
                        className="shrink-0 rounded-lg px-3 py-2 text-sm font-semibold text-red-500 hover:bg-red-50"
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