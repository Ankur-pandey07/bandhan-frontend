"use client";

import { ReactNode, useEffect } from "react";

export default function ExploreLayout({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    const openMoods = () => {
      window.history.pushState({}, "", "/dashboard/explore/moods");
    };

    window.addEventListener("open-moods", openMoods);

    return () => {
      window.removeEventListener("open-moods", openMoods);
    };
  }, []);

  return <>{children}</>;
}
