"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    router.push("/forum");
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        <Link
          href="/forum"
          className="text-gray-600 hover:text-blue-600 transition"
        >
          ← Назад до форуму
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mt-6 mb-2">
          Вхід
        </h1>

        <p className="text-gray-600 mb-8">
          Увійди, щоб створювати теми та коментувати.
        </p>

        <form onSubmit={handleLogin} className="space-y-5">

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
              placeholder="Пароль"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 rounded-xl transition"
          >
            {loading ? "Вхід..." : "Увійти"}
          </button>

        </form>

        {message && (
          <div className="mt-5 bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
            {message}
          </div>
        )}

        <p className="text-center text-gray-600 mt-6">
          Немає акаунта?{" "}
          <Link
            href="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Зареєструватися
          </Link>
        </p>

      </div>
    </main>
  );
}