"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

type Topic = {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
};

type Comment = {
  id: string;
  content: string;
  author_id: string;
  topic_id: string;
  parent_id: string | null;
  created_at: string;
  nickname?: string;
};

export default function TopicPage() {
  const params = useParams();
  const router = useRouter();

  const topicId = params.id as string;

  const [topic, setTopic] = useState<Topic | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const [user, setUser] = useState<any>(null);
  const [nickname, setNickname] = useState("");

  const [commentText, setCommentText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  async function loadTopic() {
    const { data: topicData } = await supabase
      .from("topics")
      .select("*")
      .eq("id", topicId)
      .single();

    if (!topicData) {
      router.push("/forum");
      return;
    }

    setTopic(topicData);

    const { data: commentsData } = await supabase
      .from("comments")
      .select("*")
      .eq("topic_id", topicId)
      .order("created_at", { ascending: true });

    if (commentsData) {
      const authorIds = [
        ...new Set(commentsData.map((comment) => comment.author_id)),
      ];

      let profiles: any[] = [];

      if (authorIds.length > 0) {
        const { data: profilesData } = await supabase
          .from("profiles")
          .select("id, nickname")
          .in("id", authorIds);

        profiles = profilesData || [];
      }

      const commentsWithNames = commentsData.map((comment) => {
        const profile = profiles.find(
          (item) => item.id === comment.author_id
        );

        return {
          ...comment,
          nickname: profile?.nickname || "Користувач",
        };
      });

      setComments(commentsWithNames);
    }

    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser();

    setUser(currentUser);

    if (currentUser) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("nickname")
        .eq("id", currentUser.id)
        .single();

      setNickname(profile?.nickname || "Користувач");
    }

    setLoading(false);
  }

  useEffect(() => {
    if (topicId) {
      loadTopic();
    }
  }, [topicId]);

  async function addComment(e: FormEvent) {
    e.preventDefault();

    if (!commentText.trim()) return;

    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser();

    if (!currentUser) {
      router.push("/login");
      return;
    }

    setSending(true);

    const { error } = await supabase.from("comments").insert({
      topic_id: topicId,
      author_id: currentUser.id,
      content: commentText.trim(),
      parent_id: null,
    });

    if (error) {
      alert(error.message);
      setSending(false);
      return;
    }

    setCommentText("");
    await loadTopic();

    setSending(false);
  }

  async function addReply(e: FormEvent, parentId: string) {
    e.preventDefault();

    if (!replyText.trim()) return;

    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser();

    if (!currentUser) {
      router.push("/login");
      return;
    }

    setSending(true);

    const { error } = await supabase.from("comments").insert({
      topic_id: topicId,
      author_id: currentUser.id,
      content: replyText.trim(),
      parent_id: parentId,
    });

    if (error) {
      alert(error.message);
      setSending(false);
      return;
    }

    setReplyText("");
    setReplyTo(null);

    await loadTopic();

    setSending(false);
  }

  async function deleteComment(commentId: string) {
    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId);

    if (error) {
      alert(error.message);
      return;
    }

    await loadTopic();
  }

  function getReplies(parentId: string) {
    return comments.filter(
      (comment) => comment.parent_id === parentId
    );
  }

  function renderComment(comment: Comment, isReply = false) {
    const replies = getReplies(comment.id);

    return (
      <div
        key={comment.id}
        className={
          isReply
            ? "ml-8 mt-3 border-l-4 border-blue-100 pl-5"
            : ""
        }
      >
        <div className="bg-white rounded-2xl shadow p-6">

          <div className="flex items-center justify-between gap-4">

            <div>
              <span className="font-bold text-gray-900">
                {comment.nickname}
              </span>

              <span className="text-sm text-gray-500 ml-3">
                {new Date(comment.created_at).toLocaleString("uk-UA")}
              </span>
            </div>

            {user?.id === comment.author_id && (
              <button
                onClick={() => deleteComment(comment.id)}
                className="text-red-500 hover:text-red-700 text-sm font-semibold"
              >
                Видалити
              </button>
            )}

          </div>

          <p className="text-gray-800 mt-4 whitespace-pre-wrap">
            {comment.content}
          </p>

          {user && (
            <button
              onClick={() => {
                setReplyTo(
                  replyTo === comment.id ? null : comment.id
                );
                setReplyText("");
              }}
              className="mt-4 text-blue-600 hover:text-blue-800 font-semibold text-sm"
            >
              ↩ Відповісти
            </button>
          )}

          {replyTo === comment.id && user && (
            <form
              onSubmit={(e) => addReply(e, comment.id)}
              className="mt-4"
            >
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Відповідь для ${comment.nickname}...`}
                rows={3}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-blue-500 resize-none"
              />

              <div className="flex gap-3 mt-3">

                <button
                  type="submit"
                  disabled={sending}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-5 py-2 rounded-xl font-bold"
                >
                  {sending ? "Відправлення..." : "Відповісти"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setReplyTo(null);
                    setReplyText("");
                  }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-xl font-semibold"
                >
                  Скасувати
                </button>

              </div>
            </form>
          )}

        </div>

        {replies.map((reply) =>
          renderComment(reply, true)
        )}
      </div>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-700 text-lg">
          Завантаження...
        </p>
      </main>
    );
  }

  if (!topic) return null;

  const mainComments = comments.filter(
    (comment) => comment.parent_id === null
  );

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">

      <div className="max-w-4xl mx-auto">

        <Link
          href="/forum"
          className="inline-block text-gray-700 hover:text-blue-600 font-semibold transition mb-6"
        >
          ← Назад до форуму
        </Link>

        <article className="bg-white rounded-3xl shadow-xl p-8 md:p-10">

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            {topic.title}
          </h1>

          <div className="mt-4 text-gray-600">
            Автор:{" "}
            <span className="font-bold text-blue-600">
              {topic.author}
            </span>
          </div>

          <div className="text-sm text-gray-500 mt-2">
            {new Date(topic.created_at).toLocaleString("uk-UA")}
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8">

            <p className="text-gray-800 text-lg leading-8 whitespace-pre-wrap">
              {topic.content}
            </p>

          </div>

        </article>

        <section className="mt-10">

          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            💬 Коментарі ({comments.length})
          </h2>

          <div className="space-y-4">

            {mainComments.length === 0 ? (
              <div className="bg-white rounded-2xl shadow p-7 text-gray-600">
                Поки що немає коментарів. Будь першим!
              </div>
            ) : (
              mainComments.map((comment) =>
                renderComment(comment)
              )
            )}

          </div>

          <div className="mt-8 bg-white rounded-3xl shadow-xl p-7">

            {user ? (
              <form onSubmit={addComment}>

                <p className="text-gray-700 mb-4">
                  Ви пишете як{" "}
                  <span className="font-bold text-blue-600">
                    {nickname}
                  </span>
                </p>

                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Напиши коментар..."
                  rows={5}
                  className="w-full border border-gray-300 rounded-xl px-4 py-4 text-gray-900 outline-none focus:border-blue-500 resize-none"
                />

                <button
                  type="submit"
                  disabled={sending}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-7 py-3 rounded-xl font-bold transition"
                >
                  {sending
                    ? "Відправлення..."
                    : "💬 Додати коментар"}
                </button>

              </form>
            ) : (
              <div className="text-center">

                <h3 className="text-xl font-bold text-gray-900">
                  Хочеш залишити коментар?
                </h3>

                <p className="text-gray-600 mt-2">
                  Увійди або зареєструйся.
                </p>

                <div className="flex justify-center gap-3 mt-5">

                  <Link
                    href="/login"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition"
                  >
                    Увійти
                  </Link>

                  <Link
                    href="/register"
                    className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-bold transition"
                  >
                    Реєстрація
                  </Link>

                </div>

              </div>
            )}

          </div>

        </section>

      </div>

    </main>
  );
}