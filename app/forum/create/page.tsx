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

    if (mode === "text" && image) {
      setImage(null);
      setPreview("");
    }

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Спочатку увійди в акаунт.");
        router.push("/login");
        return;
      }

      let imageUrl: string | null = null;

      if (mode === "photo" && image) {
        const extension = image.name.split(".").pop();
        const fileName = `${user.id}-${Date.now()}.${extension}`;

        const { error: uploadError } = await supabase.storage
          .from("posts")
          .upload(fileName, image);

        if (uploadError) {
          console.error(uploadError);
          alert("Не вдалося завантажити фото: " + uploadError.message);
          return;
        }

        const { data } = supabase.storage
          .from("posts")
          .getPublicUrl(fileName);

        imageUrl = data.publicUrl;
      }

      const { error } = await supabase.from("posts").insert({
        user_id: user.id,
        image_url: imageUrl,
        caption: caption.trim() || null,
      });

      if (error) {
        console.error(error);
        alert("Не вдалося створити пост: " + error.message);
        return;
      }

      router.push("/forum");
      router.refresh();
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
            className="mb-6 inline-block text-white/90 hover:text-white"
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
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                setMode("text");
                setImage(null);
                setPreview("");
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

          {mode === "photo" && (
            <div className="mt-6">
              <label className="mb-2 block font-bold text-gray-900">
                Фотографія
              </label>

              <label className="flex min-h-40 cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-5 text-center hover:bg-gray-100">
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
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleImageChange(e.target.files?.[0] || null)
                  }
                />
              </label>
            </div>
          )}

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

          <button
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