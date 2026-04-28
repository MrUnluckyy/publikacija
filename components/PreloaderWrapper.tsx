"use client";

import { useState, useEffect } from "react";
import Preloader from "./Preloader";

export default function PreloaderWrapper({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("preloader:shown")) {
      setReady(true);
      return;
    }
    const handler = () => setReady(true);
    window.addEventListener("preloader:done", handler);
    return () => window.removeEventListener("preloader:done", handler);
  }, []);

  return (
    <>
      <Preloader />
      <div style={{ visibility: ready ? "visible" : "hidden" }}>
        {children}
      </div>
    </>
  );
}
