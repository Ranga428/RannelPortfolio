"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const handler = () => {};
    document.addEventListener('wheel', handler, { passive: false });
    return () => document.removeEventListener('wheel', handler);
  }, []);

  return (
    <main>Hello</main>
  );
}
