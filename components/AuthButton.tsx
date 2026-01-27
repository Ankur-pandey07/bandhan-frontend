"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <span className="text-sm text-gray-400">Loading…</span>;
  }

  if (session) {
    return (
      <button
        onClick={() => signOut()}
        className="text-sm underline"
      >
        Logout
      </button>
    );
  }

  return (
    <button
      onClick={() => signIn()}
      className="text-sm underline"
    >
      Login
    </button>
  );
}
