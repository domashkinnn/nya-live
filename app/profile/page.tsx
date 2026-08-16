"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    setUserId(user.id);
    setEmail(user.email || "");

    const savedNickname =
      user.user_metadata?.nickname ||
      user.user_metadata?.name ||
      "Користувач";

    setNickname(savedNickname);

    if (user.user_metadata?.avatar_url) {
      setAvatarUrl(user.user_metadata.avatar_url);
    }
  }

  function handleAvatarChange(file: File | null) {
    setAvatar(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview("");
    }
  }

  async function uploadAvatar() {
    if (!avatar) {
      alert("Спочатку вибери фотографію.");
      return;
    }

    if (!userId) {
      alert("Користувача не знайдено.");
      return;
    }

    setUploading(true);

    try {
      const extension = avatar.name.split(".").pop()?.toLowerCase() || "jpg";

      // ВАЖЛИВО:
      // файл завантажується в папку з ID користувача
      // саме цього вимагає твоя Supabase policy
      const fileName = `${userId}/${Date.now()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, avatar, {
          upsert: true,
        });

      if (uploadError) {
        console.error(uploadError);
        alert(
          "Не вдалося завантажити аватарку: " +
            uploadError.message
        );
        return;
      }

      const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      const newAvatarUrl = data.publicUrl;

      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          avatar_url: newAvatarUrl,
        },
      });

      if (updateError) {
        console.error(updateError);
        alert(
          "Фото завантажено, але не вдалося зберегти профіль: " +
            updateError.message
        );
        return;
      }

      setAvatarUrl(newAvatarUrl);
      setPreview("");
      setAvatar(null);

      alert("Аватарку успішно оновлено!");

      await loadProfile();
    } finally {
      setUploading(false);
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <main className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <section className="bg-gradient-to-r from-blue-700 to-cyan-500 text-white">
        <div className="mx-auto max-w-5xl px-5 py-10 sm:px-6 sm:py-14">

          <Link
            href="/forum"
            className="mb-8 inline-block text-white/90 hover:text-white"
          >
            ← Назад на форум
          </Link>

          <div className="flex flex-col items-center gap-6 sm:flex-row">

            {/* AVATAR */}
            <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white/40 bg-white/20">
              {preview || avatarUrl ? (
                <img
                  src={preview || avatarUrl}
                  alt="Аватар"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-5xl">
                  👤
                </div>
              )}
            </div>

            <div>
              <h1 className="text-center text-4xl font-bold sm:text-left sm:text-5xl">
                {nickname}
              </h1>

              <p className="mt-2 text-center text-white/90 sm:text-left">
                Постів: 2
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6">

        {/* BUTTONS */}
        <div className="mb-8 flex flex-wrap gap-3">

          <Link
            href="/forum"
            className="rounded-xl bg-white px-5 py-3 font-bold text-gray-800 shadow hover:bg-gray-50"
          >
            💬 Форум
          </Link>

          <Link
            href="/forum/create"
            className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white shadow hover:bg-blue-700"
          >
            ＋ Створити пост
          </Link>

          <button
            onClick={logout}
            className="rounded-xl bg-red-600 px-5 py-3 font-bold text-white shadow hover:bg-red-700"
          >
            Вийти
          </button>

        </div>

        {/* PROFILE INFO */}
        <div className="rounded-3xl bg-white p-6 shadow-lg sm:p-8">

          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Інформація про профіль
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">

            <div>
              <p className="text-sm text-gray-500">
                Нікнейм
              </p>

              <p className="mt-1 text-xl font-bold text-gray-900">
                {nickname}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Акаунт
              </p>

              <p className="mt-1 text-xl font-bold text-gray-900">
                Зареєстрований користувач
              </p>
            </div>

          </div>

        </div>

        {/* AVATAR SETTINGS */}
        <div className="mt-8 rounded-3xl bg-white p-6 shadow-lg sm:p-8">

          <h2 className="text-2xl font-bold text-gray-900">
            Аватарка
          </h2>

          <p className="mt-2 text-gray-500">
            Вибери фотографію, яку хочеш використовувати у профілі.
          </p>

          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">

            <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-gray-200 bg-gray-100">

              {preview || avatarUrl ? (
                <img
                  src={preview || avatarUrl}
                  alt="Попередній перегляд"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-5xl">
                  👤
                </div>
              )}

            </div>

            <div className="flex-1">

              <label className="inline-block cursor-pointer rounded-xl bg-gray-100 px-5 py-3 font-bold text-gray-800 hover:bg-gray-200">
                📷 Вибрати фотографію

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleAvatarChange(
                      e.target.files?.[0] || null
                    )
                  }
                />
              </label>

              <button
                onClick={uploadAvatar}
                disabled={!avatar || uploading}
                className="ml-0 mt-3 block w-full rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400 sm:ml-3 sm:mt-0 sm:inline-block sm:w-auto"
              >
                {uploading
                  ? "Завантаження..."
                  : "Зберегти аватарку"}
              </button>

            </div>

          </div>

        </div>

        {/* POSTS */}
        <div className="mt-8">

          <h2 className="mb-5 text-3xl font-bold text-gray-900">
            Мої пости
          </h2>

          <div className="rounded-3xl bg-white p-8 text-center shadow-lg">
            <div className="text-5xl">📝</div>

            <p className="mt-3 text-lg font-semibold text-gray-800">
              Тут будуть твої пости
            </p>

            <Link
              href="/forum/create"
              className="mt-5 inline-block rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
            >
              Створити пост
            </Link>
          </div>

        </div>

      </section>

    </main>
  );
}