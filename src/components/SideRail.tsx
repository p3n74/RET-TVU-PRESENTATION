import { navSections } from "../content";
import { useScrollSpy } from "../hooks/useScrollSpy";

const ids = navSections.map((s) => s.id);

// N3 · Side-rail. A thin fixed strip with the vertical wordmark and a scroll-spy
// index of numbered sections. Collapses to a top strip on narrow viewports (CSS).
export function SideRail() {
  const active = useScrollSpy(ids);

  return (
    <nav className="rail" aria-label="Sections">
      <a className="rail__wordmark" href="#top">
        ESPF&middot;SR
      </a>
      <ol className="rail__dots">
        {navSections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`rail__dot ${active === s.id ? "is-active" : ""}`}
              aria-current={active === s.id ? "true" : undefined}
            >
              <span className="rail__tick" aria-hidden="true" />
              <span className="rail__label">{s.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
