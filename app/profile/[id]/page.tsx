"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";

const ADMIN_IDS = [
  "f3f8673d-faf6-4ada-bf41-052179d4e3c9",
  "1c2c459f-8a16-43e2-aa23-e988f4dccd85",
  "4146df2f-36be-4de0-b5ed-1c30eca2c997",
];

type Profile = {
  id: string;
  nickname: string;
  avatar_url: string | null;
};

export default function UserProfilePage() {
  const params = useParams();

  const id =
    typeof params.id === "string"
      ? params.id
      : "";

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      if (!id) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("id, nickname, avatar_url")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        setProfile(null);
      } else {
        setProfile(data);
      }

      setLoading(false);
    }

    loadProfile();
  }, [id]);

  const admin = ADMIN_IDS.includes(id);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="font-semibold text-gray-600">
          Завантаження...
        </p>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <div className="rounded-3xl bg-white p-10 text-center shadow-xl">
          <h1 className="text-3xl font-bold text-gray-900">
            Користувача не знайдено
          </h1>

          <Link
            href="/forum"
            className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-bold text-white"
          >
            ← Повернутися на форум
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">

      <section className="bg-gradient-to-r from-blue-700 to-cyan-500 px-4 py-10 text-white sm:py-16">

        <div className="mx-auto max-w-3xl">

          <Link
            href="/forum"
            className="text-white/90 hover:text-white"
          >
            ← Назад на форум
          </Link>

        </div>

      </section>

      <section className="mx-auto max-w-3xl px-4 py-10 sm:py-14">

        <div className="rounded-3xl bg-white p-6 text-center shadow-xl sm:p-10">

          {/* AVATAR */}
          <div className="flex justify-center">

            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.nickname}
                className="h-36 w-36 rounded-full object-cover ring-4 ring-blue-100"
              />
            ) : (
              <div className="flex h-36 w-36 items-center justify-center rounded-full bg-blue-100 text-6xl">
                👤
              </div>
            )}

          </div>

          {/* NAME */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">

            <h1 className="text-4xl font-bold text-gray-900">
              {profile.nickname}
            </h1>

            {admin && (
              <span className="rounded-lg bg-blue-600 px-3 py-1 text-sm font-extrabold text-white">
                АДМІН
              </span>
            )}

          </div>

          <p className="mt-3 text-gray-500">
            {admin
              ? "Адміністратор Nya Live"
              : "Користувач Nya Live"}
          </p>

        </div>

      </section>

    </main>
  );
}