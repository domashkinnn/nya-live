"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="absolute top-0 left-0 w-full z-50">

      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">

        <Link
          href="/"
          className="text-white text-2xl font-bold"
        >
          Nya Live
        </Link>

        <nav className="flex items-center gap-6 text-white font-medium">

          <a
            href="/#history"
            className="hover:text-blue-400 transition"
          >
            Історія
          </a>

          <a
            href="/#gallery"
            className="hover:text-blue-400 transition"
          >
            Галерея
          </a>

          <Link
            href="/people"
            className="hover:text-blue-400 transition"
          >
            Відомі люди
          </Link>

          <a
            href="/#support"
            className="hover:text-blue-400 transition"
          >
            Підтримати
          </a>

          <Link
            href="/forum"
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl transition"
          >
            Форум
          </Link>

          {!user && (
            <>
              <Link
                href="/login"
                className="hover:text-blue-400 transition"
              >
                Увійти
              </Link>

              <Link
                href="/register"
                className="bg-white text-blue-700 hover:bg-gray-100 px-5 py-2 rounded-xl transition"
              >
                Реєстрація
              </Link>
            </>
          )}

        </nav>

      </div>

    </header>
  );
}