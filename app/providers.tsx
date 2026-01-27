"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 👇 SSR + first render me kuch bhi render mat karo
  if (!mounted) return null;

  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
