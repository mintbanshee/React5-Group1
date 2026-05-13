// src/components/BackToTop.tsx

import { useEffect, useState } from "react";

// ============================================================
// 📌 Back-to-Top Floating Button
// Appears after the user scrolls down ~300px.
// Smoothly scrolls back to the top when clicked.
// ============================================================

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show / hide the button based on scroll position
  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > 300);
    }

    window.addEventListener("scroll", handleScroll);

    // Run once on mount in case user is already scrolled
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to top
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      type="button"
      className={`back-to-top ${isVisible ? "visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
    >
      ↑
    </button>
  );
}