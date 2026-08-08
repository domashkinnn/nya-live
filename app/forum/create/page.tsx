"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function CreateTopicPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [nickname, setNickname] = useState("");

  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function checkUser() {
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
        .single();

      setNickname(profile?.nickname || "Користувач");
      setChecking(false);
    }

    checkUser();
  }, [router]);

  async function createTopic(e: FormEvent) {
    e.preventDefault();

    const cleanTitle = title.trim();
    const cleanContent = content.trim();

    if (!cleanTitle || !cleanContent) {
      setMessage("Заповни назву та текст теми.");
      return;
    }

    if (cleanTitle.length < 3) {
      setMessage("Назва теми має містити мінімум 3 символи.");
      return;
    }

    if (cleanContent.length < 3) {
      setMessage("Текст теми має містити мінімум 3 символи.");
      return;
    }

    setLoading(true);
    setMessage("");

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
      .single();

    if (!profile) {
      setMessage("Профіль користувача не знайдено.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("topics")
      .insert({
        title: cleanTitle,
        content: cleanContent,
        author: profile.nickname,
        author_id: user.id,
      })
      .select()
      .single();

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    router.push(`/forum/${data.id}`);
  }

  if (checking) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-700 text-lg">
          Перевірка акаунта...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-3xl mx-auto">

        <Link
          href="/forum"
          className="text-gray-700 hover:text-blue-600 font-semibold transition"
        >
          ← Назад до форуму
        </Link>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 mt-6">

          <h1 className="text-4xl font-bold text-gray-900">
            Створити тему
          </h1>

          <p className="text-gray-600 mt-3">
            Поділися думкою, історією або питанням про Новояворівськ.
          </p>

          <div className="mt-6 bg-gray-100 rounded-xl px-5 py-4">
            <span className="text-gray-700">
              Ви пишете як{" "}
            </span>

            <span className="font-bold text-blue-600">
              {nickname}
            </span>
          </div>

          <form onSubmit={createTopic} className="space-y-6 mt-8">

            <div>
              <label className="block text-gray-900 font-bold mb-2">
                Назва теми
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Введи назву теми"
                maxLength={100}
                className="w-full border border-gray-300 rounded-xl px-4 py-4 text-gray-900 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-900 font-bold mb-2">
                Текст
              </label>

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Напиши щось цікаве..."
                maxLength={5000}
                rows={8}
                className="w-full border border-gray-300 rounded-xl px-4 py-4 text-gray-900 outline-none focus:border-blue-500 resize-none"
              />
            </div>

            {message && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 rounded-xl transition"
            >
              {loading ? "Публікація..." : "Опублікувати тему"}
            </button>

          </form>

        </div>

      </div>
    </main>
  );
}