"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setEmail(user.email || "");
      }
    }

    loadUser();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-[550px]">

        <h1 className="text-4xl font-bold text-center text-black mb-8">
          Мій профіль
        </h1>

        <div className="space-y-6">

          <div>
            <p className="text-gray-500">
              Email
            </p>

            <p className="text-2xl font-bold text-black">
              {email}
            </p>
          </div>

          <button
            onClick={logout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold"
          >
            Вийти
          </button>

        </div>

      </div>

    </main>
  );
}