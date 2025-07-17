import { useEffect } from "react";
import { useLocation } from "wouter";

export const useScrollToTop = () => {
  const [location] = useLocation();

  useEffect(() => {
    // Delay for smooth rendering
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  }, [location]);
};
