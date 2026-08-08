"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function RegisterPage() {
  const router = useRouter();

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleRegister(e: FormEvent) {
    e.preventDefault();

    const cleanNickname = nickname.trim();
    const cleanEmail = email.trim();

    if (!cleanNickname || !cleanEmail || !password) {
      setMessage("Заповни всі поля.");
      return;
    }

    if (cleanNickname.length < 3) {
      setMessage("Нікнейм має містити мінімум 3 символи.");
      return;
    }

    if (cleanNickname.length > 20) {
      setMessage("Нікнейм має містити максимум 20 символів.");
      return;
    }

    if (password.length < 6) {
      setMessage("Пароль має містити мінімум 6 символів.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        data: {
          nickname: cleanNickname,
        },
      },
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setMessage(
      "Акаунт створено! Перевір пошту та підтвердь email."
    );

    setLoading(false);

    setTimeout(() => {
      router.push("/login");
    }, 2500);
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <Link
          href="/forum"
          className="text-gray-600 hover:text-blue-600 transition"
        >
          ← Назад до форуму
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mt-6 mb-2">
          Реєстрація
        </h1>

        <p className="text-gray-600 mb-8">
          Створи акаунт для участі у форумі.
        </p>

        <form onSubmit={handleRegister} className="space-y-5">

          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Нікнейм
            </label>

            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Введи свій нікнейм"
              maxLength={20}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@gmail.com"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Пароль
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Мінімум 6 символів"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 rounded-xl transition"
          >
            {loading ? "Створення..." : "Зареєструватися"}
          </button>

        </form>

        {message && (
          <div className="mt-5 bg-gray-100 rounded-xl p-4 text-gray-800">
            {message}
          </div>
        )}

        <p className="text-center text-gray-600 mt-6">
          Вже маєш акаунт?{" "}
          <Link
            href="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Увійти
          </Link>
        </p>

      </div>
    </main>
  );
}