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

type Post = {
  id: string;
  user_id: string;
  image_url: string | null;
  caption: string | null;
  created_at: string;
  nickname: string;
  likes: number;
  liked: boolean;
};

type Comment = {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  nickname: string;
  parent_id: string | null;
};

export default function ForumPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [commentText, setCommentText] = useState<Record<string, string>>({});
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [replyOpen, setReplyOpen] = useState<Record<string, boolean>>({});
  const [user, setUser] = useState<any>(null);
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);

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

      setNickname(profile?.nickname || "Користувач");
    } else {
      setNickname("");
    }

    const { data: topicsData } = await supabase
      .from("topics")
      .select("*")
      .order("created_at", { ascending: false });

    setTopics(topicsData || []);

    const { data: postsData, error: postsError } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (postsError) {
      console.error(postsError);
      setPosts([]);
      setLoading(false);
      return;
    }

    if (!postsData || postsData.length === 0) {
      setPosts([]);
      setComments({});
      setLoading(false);
      return;
    }

    const userIds = [...new Set(postsData.map((post) => post.user_id))];

    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, nickname")
      .in("id", userIds);

    const profileMap: Record<string, string> = {};

    (profiles || []).forEach((profile) => {
      profileMap[profile.id] = profile.nickname || "Користувач";
    });

    const postIds = postsData.map((post) => post.id);

    const { data: likesData } = await supabase
      .from("post_likes")
      .select("post_id, user_id")
      .in("post_id", postIds);

    const postsWithData: Post[] = postsData.map((post) => {
      const postLikes =
        (likesData || []).filter((like) => like.post_id === post.id);

      return {
        id: post.id,
        user_id: post.user_id,
        image_url: post.image_url || null,
        caption: post.caption || null,
        created_at: post.created_at,
        nickname: profileMap[post.user_id] || "Користувач",
        likes: postLikes.length,
        liked: user
          ? postLikes.some((like) => like.user_id === user.id)
          : false,
      };
    });

    setPosts(postsWithData);

    const { data: commentsData, error: commentsError } = await supabase
      .from("post_comments")
      .select("*")
      .in("post_id", postIds)
      .order("created_at", { ascending: true });

    if (commentsError) {
      console.error(commentsError);
      setComments({});
      setLoading(false);
      return;
    }

    const commentUserIds = [
      ...new Set((commentsData || []).map((comment) => comment.user_id)),
    ];

    let commentProfiles: any[] = [];

    if (commentUserIds.length > 0) {
      const { data } = await supabase
        .from("profiles")
        .select("id, nickname")
        .in("id", commentUserIds);

      commentProfiles = data || [];
    }

    const commentProfileMap: Record<string, string> = {};

    commentProfiles.forEach((profile) => {
      commentProfileMap[profile.id] = profile.nickname || "Користувач";
    });

    const groupedComments: Record<string, Comment[]> = {};

    (commentsData || []).forEach((comment) => {
      if (!groupedComments[comment.post_id]) {
        groupedComments[comment.post_id] = [];
      }

      groupedComments[comment.post_id].push({
        id: comment.id,
        post_id: comment.post_id,
        user_id: comment.user_id,
        content: comment.content,
        created_at: comment.created_at,
        nickname: commentProfileMap[comment.user_id] || "Користувач",
        parent_id: comment.parent_id || null,
      });
    });

    setComments(groupedComments);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
    setNickname("");
  }

  async function toggleLike(post: Post) {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    if (post.liked) {
      const { error } = await supabase
        .from("post_likes")
        .delete()
        .eq("post_id", post.id)
        .eq("user_id", user.id);

      if (error) {
        alert("Не вдалося прибрати лайк: " + error.message);
        return;
      }
    } else {
      const { error } = await supabase.from("post_likes").insert({
        post_id: post.id,
        user_id: user.id,
      });

      if (error) {
        alert("Не вдалося поставити лайк: " + error.message);
        return;
      }
    }

    setPosts((currentPosts) =>
      currentPosts.map((item) =>
        item.id === post.id
          ? {
              ...item,
              liked: !item.liked,
              likes: item.liked ? item.likes - 1 : item.likes + 1,
            }
          : item
      )
    );
  }

  async function addComment(
    postId: string,
    parentId: string | null = null
  ) {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    const text = parentId
      ? replyText[parentId]?.trim()
      : commentText[postId]?.trim();

    if (!text) {
      return;
    }

    const { data, error } = await supabase
      .from("post_comments")
      .insert({
        post_id: postId,
        user_id: user.id,
        content: text,
        parent_id: parentId,
      })
      .select("*")
      .single();

    if (error) {
      console.error(error);
      alert("Не вдалося додати коментар: " + error.message);
      return;
    }

    if (!data) {
      alert("Коментар не створився");
      return;
    }

    const newComment: Comment = {
      id: data.id,
      post_id: data.post_id,
      user_id: data.user_id,
      content: data.content,
      created_at: data.created_at,
      nickname: nickname || "Користувач",
      parent_id: data.parent_id || null,
    };

    setComments((current) => ({
      ...current,
      [postId]: [...(current[postId] || []), newComment],
    }));

    if (parentId) {
      setReplyText((current) => ({
        ...current,
        [parentId]: "",
      }));

      setReplyOpen((current) => ({
        ...current,
        [parentId]: false,
      }));
    } else {
      setCommentText((current) => ({
        ...current,
        [postId]: "",
      }));
    }
  }

  async function deleteComment(comment: Comment) {
    if (!user || comment.user_id !== user.id) {
      return;
    }

    if (!window.confirm("Видалити цей коментар?")) {
      return;
    }

    const { error } = await supabase
      .from("post_comments")
      .delete()
      .eq("id", comment.id)
      .eq("user_id", user.id);

    if (error) {
      alert("Не вдалося видалити коментар: " + error.message);
      return;
    }

    setComments((current) => ({
      ...current,
      [comment.post_id]: (current[comment.post_id] || []).filter(
        (item) => item.id !== comment.id && item.parent_id !== comment.id
      ),
    }));
  }

  function renderComment(
    comment: Comment,
    allComments: Comment[],
    level = 0
  ) {
    const replies = allComments.filter(
      (item) => item.parent_id === comment.id
    );

    return (
      <div
        key={comment.id}
        className={level > 0 ? "ml-4 sm:ml-8" : ""}
      >
        <div className="rounded-xl bg-gray-50 p-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="break-words font-bold text-gray-900">
                {comment.nickname}
              </p>

              <p className="mt-1 break-words text-sm text-gray-700">
                {comment.content}
              </p>
            </div>

            {user?.id === comment.user_id && (
              <button
                onClick={() => deleteComment(comment)}
                className="shrink-0 text-xs text-red-500 hover:text-red-700"
              >
                Видалити
              </button>
            )}
          </div>

          {user && (
            <button
              onClick={() =>
                setReplyOpen((current) => ({
                  ...current,
                  [comment.id]: !current[comment.id],
                }))
              }
              className="mt-2 text-xs font-semibold text-blue-600 hover:text-blue-800"
            >
              ↩ Відповісти
            </button>
          )}

          {replyOpen[comment.id] && user && (
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <input
                value={replyText[comment.id] || ""}
                onChange={(e) =>
                  setReplyText((current) => ({
                    ...current,
                    [comment.id]: e.target.value,
                  }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addComment(comment.post_id, comment.id);
                  }
                }}
                placeholder="Написати відповідь..."
                className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500"
              />

              <button
                onClick={() => addComment(comment.post_id, comment.id)}
                className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
              >
                Відповісти
              </button>
            </div>
          )}
        </div>

        {replies.length > 0 && (
          <div className="mt-2 space-y-2">
            {replies.map((reply) =>
              renderComment(reply, allComments, level + 1)
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <section className="bg-gradient-to-r from-blue-700 to-cyan-500 text-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-16">
          <Link
            href="/"
            className="mb-7 inline-block text-white/90 transition hover:text-white"
          >
            ← На головну
          </Link>

          <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
                Форум Nya Live
              </h1>

              <p className="mt-4 text-lg text-white/90 sm:text-xl">
                Обговорення життя Новояворівська.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {user ? (
                <>
                  <div className="rounded-xl bg-white/15 px-5 py-3">
                    👤 {nickname || "Користувач"}
                  </div>

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
                    className="rounded-xl bg-white px-5 py-3 font-bold text-blue-700 hover:bg-gray-100"
                  >
                    Увійти
                  </Link>

                  <Link
                    href="/register"
                    className="rounded-xl bg-blue-900/50 px-5 py-3 font-bold text-white hover:bg-blue-900/70"
                  >
                    Зареєструватися
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="mt-8">
            {user ? (
              <Link
                href="/forum/create"
                className="inline-block rounded-xl bg-white px-7 py-4 font-bold text-blue-700 hover:bg-gray-100"
              >
                ➕ Створити пост
              </Link>
            ) : (
              <Link
                href="/login"
                className="inline-block rounded-xl bg-white px-7 py-4 font-bold text-blue-700 hover:bg-gray-100"
              >
                🔐 Увійдіть, щоб створити пост
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        {loading ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-lg">
            Завантаження...
          </div>
        ) : (
          <>
            {posts.length > 0 && (
              <div className="mb-12 space-y-7">
                {posts.map((post) => {
                  const postComments = comments[post.id] || [];
                  const rootComments = postComments.filter(
                    (comment) => !comment.parent_id
                  );

                  return (
                    <article
                      key={post.id}
                      className="overflow-hidden rounded-3xl bg-white shadow-lg"
                    >
                      <div className="flex items-center gap-3 p-4 sm:p-5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400">
                          👤
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-bold text-gray-900">
                            {post.nickname}
                          </p>

                          <p className="text-xs text-gray-500">
                            {new Date(post.created_at).toLocaleString("uk-UA")}
                          </p>
                        </div>
                      </div>

                      {post.image_url ? (
                        <div className="flex w-full justify-center bg-gray-50">
                          <img
                            src={post.image_url}
                            alt={post.caption || "Фото з форуму"}
                            className="max-h-[500px] w-auto max-w-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="px-5 py-8 sm:px-7 sm:py-10">
                          <p className="whitespace-pre-wrap break-words text-lg leading-8 text-gray-800 sm:text-xl">
                            {post.caption}
                          </p>
                        </div>
                      )}

                      <div className="p-4 sm:p-5">
                        <button
                          onClick={() => toggleLike(post)}
                          className={`flex items-center gap-2 text-xl transition ${
                            post.liked
                              ? "text-red-500"
                              : "text-gray-700 hover:text-red-500"
                          }`}
                        >
                          {post.liked ? "❤️" : "♡"}

                          <span className="text-sm font-semibold">
                            {post.likes}
                          </span>
                        </button>

                        {post.image_url && post.caption && (
                          <p className="mt-4 break-words text-gray-800">
                            <span className="font-bold">
                              {post.nickname}
                            </span>{" "}
                            {post.caption}
                          </p>
                        )}

                        <div className="mt-5 space-y-2 border-t border-gray-100 pt-4">
                          {rootComments.length > 0 ? (
                            rootComments.map((comment) =>
                              renderComment(comment, postComments)
                            )
                          ) : (
                            <p className="text-sm text-gray-500">
                              Поки що немає коментарів.
                            </p>
                          )}
                        </div>

                        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                          <input
                            type="text"
                            value={commentText[post.id] || ""}
                            onChange={(e) =>
                              setCommentText((current) => ({
                                ...current,
                                [post.id]: e.target.value,
                              }))
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                addComment(post.id);
                              }
                            }}
                            placeholder={
                              user
                                ? "Написати коментар..."
                                : "Увійдіть, щоб коментувати"
                            }
                            disabled={!user}
                            className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                          />

                          <button
                            onClick={() => addComment(post.id)}
                            disabled={!user}
                            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Надіслати
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            <div>
              <h2 className="mb-5 text-2xl font-bold text-gray-900">
                💬 Теми форуму
              </h2>

              {topics.length === 0 ? (
                <div className="rounded-3xl bg-white p-8 text-center shadow-lg">
                  <div className="mb-5 text-5xl">💬</div>

                  <h3 className="text-2xl font-bold text-gray-900">
                    Поки що немає тем
                  </h3>

                  <p className="mt-3 text-gray-600">
                    Створюй пости з фотографіями або просто текстом!
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  {topics.map((topic) => (
                    <Link
                      key={topic.id}
                      href={`/forum/${topic.id}`}
                      className="block rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl sm:p-7"
                    >
                      <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                        {topic.title}
                      </h3>

                      <p className="mt-2 text-gray-600">
                        Автор:{" "}
                        <span className="font-semibold text-blue-600">
                          {topic.author}
                        </span>
                      </p>

                      <p className="mt-4 line-clamp-2 break-words text-gray-700">
                        {topic.content}
                      </p>

                      <p className="mt-4 text-sm text-gray-500">
                        {new Date(topic.created_at).toLocaleString("uk-UA")}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
}