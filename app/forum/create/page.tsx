"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function CreatePostPage() {
  const router = useRouter();

  const [mode, setMode] = useState<"text" | "photo">("text");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  function handleImageChange(file: File | null) {
    setImage(file);

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview("");
    }
  }

  async function createPost() {
    if (!caption.trim() && !image) {
      alert("Напиши текст або додай фото.");
      return;
    }

    if (mode === "photo" && !image) {
      alert("Додай фотографію.");
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error(userError);
        alert("Не вдалося перевірити акаунт.");
        return;
      }

      if (!user) {
        alert("Спочатку увійди в акаунт.");
        router.push("/login");
        return;
      }

      let imageUrl: string | null = null;

      // Завантаження фотографії
      if (mode === "photo" && image) {
        const extension =
          image.name.split(".").pop()?.toLowerCase() || "jpg";

        const fileName = `${user.id}-${Date.now()}.${extension}`;

        const { error: uploadError } = await supabase.storage
          .from("forum-images")
          .upload(fileName, image, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          console.error("Upload error:", uploadError);

          alert(
            "Не вдалося завантажити фото:\n" + uploadError.message
          );

          return;
        }

        const { data: publicUrlData } = supabase.storage
          .from("forum-images")
          .getPublicUrl(fileName);

        imageUrl = publicUrlData.publicUrl;
      }

      // Створення поста
      const { error: postError } = await supabase
        .from("posts")
        .insert({
          user_id: user.id,
          image_url: imageUrl,
          caption: caption.trim() || null,
        });

      if (postError) {
        console.error("Post error:", postError);

        alert(
          "Фото завантажилось, але пост створити не вдалося:\n" +
            postError.message
        );

        return;
      }

      // Успішно
      router.push("/forum");
      router.refresh();
    } catch (error) {
      console.error(error);

      alert("Сталася непередбачена помилка.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <section className="bg-gradient-to-r from-blue-700 to-cyan-500 text-white">
        <div className="mx-auto max-w-4xl px-5 py-10 sm:px-6 sm:py-14">
          <Link
            href="/forum"
            className="mb-6 inline-block text-white/90 transition hover:text-white"
          >
            ← Назад на форум
          </Link>

          <h1 className="text-4xl font-bold sm:text-5xl">
            Створити пост
          </h1>

          <p className="mt-3 text-lg text-white/90">
            Поділися думкою або фотографією з Новояворівська.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="rounded-3xl bg-white p-5 shadow-lg sm:p-8">
          {/* Вибір типу поста */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setMode("text");
                handleImageChange(null);
              }}
              className={`rounded-xl px-4 py-3 font-bold transition ${
                mode === "text"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              📝 Текст
            </button>

            <button
              type="button"
              onClick={() => setMode("photo")}
              className={`rounded-xl px-4 py-3 font-bold transition ${
                mode === "photo"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              📸 Фото
            </button>
          </div>

          {/* Фото */}
          {mode === "photo" && (
            <div className="mt-6">
              <label className="mb-2 block font-bold text-gray-900">
                Фотографія
              </label>

              <label className="flex min-h-40 cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-5 text-center transition hover:bg-gray-100">
                {preview ? (
                  <img
                    src={preview}
                    alt="Попередній перегляд"
                    className="max-h-80 max-w-full rounded-xl object-contain"
                  />
                ) : (
                  <div>
                    <div className="text-5xl">📷</div>

                    <p className="mt-2 font-semibold text-gray-700">
                      Натисни, щоб вибрати фото
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      JPG, PNG, WEBP та інші формати
                    </p>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleImageChange(
                      e.target.files?.[0] || null
                    )
                  }
                />
              </label>
            </div>
          )}

          {/* Текст */}
          <div className="mt-6">
            <label className="mb-2 block font-bold text-gray-900">
              {mode === "text" ? "Текст поста" : "Опис"}
            </label>

            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder={
                mode === "text"
                  ? "Напиши щось..."
                  : "Напиши опис до фотографії..."
              }
              rows={6}
              className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 p-4 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white"
            />
          </div>

          {/* Кнопка */}
          <button
            type="button"
            onClick={createPost}
            disabled={loading}
            className="mt-6 w-full rounded-2xl bg-blue-600 px-6 py-4 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Публікуємо..." : "Опублікувати"}
          </button>
        </div>
      </section>
    </main>
  );
}