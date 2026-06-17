import { useEffect, useState } from "react";

// Tracks which section is currently in view using IntersectionObserver
// (never scroll listeners). Returns the id of the most-visible section.
export function useScrollSpy(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }
        let best = "";
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio >= bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        }
        if (best) setActive(best);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
