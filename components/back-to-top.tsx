"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 560);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  function returnToTop() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    window.setTimeout(() => document.getElementById("page-top")?.focus({ preventScroll: true }), reduceMotion ? 0 : 450);
  }

  return <button type="button" className={`back-to-top ${visible ? "visible" : ""}`} onClick={returnToTop} aria-label="Back to top" aria-hidden={!visible} tabIndex={visible ? 0 : -1}><ArrowUp aria-hidden="true"/><span>Top</span></button>;
}
