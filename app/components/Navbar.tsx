"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

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

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="absolute left-0 top-0 z-50 w-full">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* LOGO */}

        <Link
          href="/"
          onClick={closeMenu}
          className="text-2xl font-bold text-white transition hover:text-cyan-300 sm:text-3xl"
        >
          Nya Live
        </Link>


        {/* DESKTOP NAVIGATION */}

        <nav className="hidden items-center gap-5 text-white font-medium lg:flex">

          <a
            href="/#history"
            className="transition hover:text-blue-300"
          >
            Історія
          </a>

          <a
            href="/#gallery"
            className="transition hover:text-blue-300"
          >
            Галерея
          </a>

          <Link
            href="/people"
            className="transition hover:text-blue-300"
          >
            Відомі люди
          </Link>

          <a
            href="/#support"
            className="transition hover:text-blue-300"
          >
            Підтримати
          </a>

          <Link
            href="/forum"
            className="rounded-xl bg-blue-600 px-5 py-2.5 transition hover:bg-blue-700"
          >
            Форум
          </Link>

          {!user && (
            <>
              <Link
                href="/login"
                className="transition hover:text-blue-300"
              >
                Увійти
              </Link>

              <Link
                href="/register"
                className="rounded-xl bg-white px-5 py-2.5 text-blue-700 transition hover:bg-gray-100"
              >
                Реєстрація
              </Link>
            </>
          )}

          {user && (
            <Link
              href="/profile"
              className="rounded-xl bg-white/15 px-5 py-2.5 backdrop-blur transition hover:bg-white/25"
            >
              👤 Профіль
            </Link>
          )}

        </nav>


        {/* MOBILE MENU BUTTON */}

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur transition hover:bg-white/25 lg:hidden"
          aria-label="Відкрити меню"
        >
          {menuOpen ? (
            <span className="text-2xl">✕</span>
          ) : (
            <span className="text-2xl">☰</span>
          )}
        </button>

      </div>


      {/* MOBILE MENU */}

      {menuOpen && (

        <div className="mx-4 rounded-2xl border border-white/20 bg-black/75 p-4 shadow-2xl backdrop-blur-xl lg:hidden">

          <nav className="flex flex-col gap-2">

            <a
              href="/#history"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              🏛️ Історія
            </a>

            <a
              href="/#gallery"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              📸 Галерея
            </a>

            <Link
              href="/people"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              👥 Відомі люди
            </Link>

            <a
              href="/#support"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              ❤️ Підтримати
            </a>

            <Link
              href="/forum"
              onClick={closeMenu}
              className="mt-2 rounded-xl bg-blue-600 px-4 py-3 text-center font-bold text-white transition hover:bg-blue-700"
            >
              💬 Форум
            </Link>


            {!user && (
              <>

                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3 text-center font-semibold text-white transition hover:bg-white/10"
                >
                  🔐 Увійти
                </Link>

                <Link
                  href="/register"
                  onClick={closeMenu}
                  className="rounded-xl bg-white px-4 py-3 text-center font-bold text-blue-700 transition hover:bg-gray-100"
                >
                  ✨ Реєстрація
                </Link>

              </>
            )}


            {user && (
              <Link
                href="/profile"
                onClick={closeMenu}
                className="rounded-xl bg-white/15 px-4 py-3 text-center font-bold text-white transition hover:bg-white/25"
              >
                👤 Мій профіль
              </Link>
            )}

          </nav>

        </div>

      )}

    </header>
  );
}