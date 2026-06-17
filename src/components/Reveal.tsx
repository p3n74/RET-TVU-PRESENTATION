import { useEffect, useRef, useState, type ReactNode } from "react";

// One quiet, reveal-once entrance per element as it enters the viewport.
// Honours prefers-reduced-motion (the CSS collapses it to an instant fade).
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Component = Tag as "div";
  return (
    <Component
      ref={ref as React.Ref<HTMLDivElement>}
      className={`reveal ${shown ? "is-shown" : ""} ${className}`.trim()}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </Component>
  );
}
