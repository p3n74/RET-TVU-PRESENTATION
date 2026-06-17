import { SideRail } from "./components/SideRail";
import { Reveal } from "./components/Reveal";
import { Figure } from "./components/Figure";
import {
  meta,
  lede,
  burden,
  contributions,
  stages,
  resultsTable,
  lessons,
  hgt,
  limitations,
  conclusion,
} from "./content";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#pipeline">
        Skip to the work
      </a>
      <SideRail />

      <main className="page">
        {/* ---- Hero ---- */}
        <header id="top" className="hero" tabIndex={-1}>
          <p className="hero__venue mono">
            Research conference presentation &middot; {meta.date}
          </p>
          <h1 className="hero__title">
            Resistance,
            <br />
            <em>schedule by schedule.</em>
          </h1>
          <p className="hero__lede">{lede}</p>

          <dl className="hero__byline">
            <div>
              <dt>Authors</dt>
              <dd>
                {meta.authors.map((a) => a.name).join("  \u00b7  ")}
              </dd>
            </div>
            <div>
              <dt>Organism</dt>
              <dd>
                <i>{meta.organism}</i>
              </dd>
            </div>
          </dl>

          <p className="hero__thesis mono">{meta.thesisTitle}</p>
          <a className="link-cta" href="#pipeline">
            Read the pipeline <span aria-hidden="true">&darr;</span>
          </a>
        </header>

        {/* ---- Burden / why ---- */}
        <section id="burden" className="band band--burden">
          <Reveal as="h2" className="band__title">
            The problem has a body count.
          </Reveal>
          <ol className="stat-strip">
            {burden.map((b, i) => (
              <Reveal as="li" key={b.unit} className="stat" delay={i * 60}>
                <span className="stat__value mono">{b.value}</span>
                <span className="stat__unit">{b.unit}</span>
                <span className="stat__note">{b.note}</span>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* ---- Pipeline overview ---- */}
        <section id="pipeline" className="band band--pipeline">
          <div className="band__head">
            <Reveal as="h2" className="band__title">
              One auditable workflow, three layers.
            </Reveal>
            <Reveal as="p" className="band__sub" delay={80}>
              Genotype, schedule-driven pressure, and forward evolution sit in a
              single frozen configuration &mdash; so a scenario is reproducible
              and a comparison is fair.
            </Reveal>
          </div>
          <Reveal delay={120}>
            <Figure
              src="figures/pipeline.png"
              alt="Pipeline diagram with four boxes: Inputs (X_geno isolates, regimen YAML, PK/PD targets), Pressure mapping (linear/Hill/threshold to P(t)), Evolution engine (multi-locus Wright-Fisher), Outputs (trajectories, metrics)."
              caption={
                "The PK/PD-coupled evolutionary simulation pipeline: inputs \u2192 pressure mapping \u2192 Wright\u2013Fisher engine \u2192 outputs. A frozen configuration enables reproducible scenario comparison."
              }
              label="Fig. 1"
            />
          </Reveal>
          <ol className="contrib">
            {contributions.map((c, i) => (
              <Reveal as="li" key={i} className="contrib__item" delay={i * 50}>
                <span className="contrib__num mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p>{c}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* ---- Numbered stages ---- */}
        <ol className="stages">
          {stages.map((s) => (
            <li id={s.id} key={s.id} className="stage">
              <div className="stage__inner">
                <div className="stage__lead">
                  <Reveal className="stage__heading">
                    <span className="stage__num mono">{s.num}</span>
                    <p className="stage__kicker mono">{s.kicker}</p>
                    <h2 className="stage__title">{s.title}</h2>
                  </Reveal>
                  <Reveal as="p" className="stage__body" delay={60}>
                    {s.body}
                  </Reveal>
                  {s.aside ? (
                    <Reveal as="p" className="stage__aside mono" delay={100}>
                      {s.aside}
                    </Reveal>
                  ) : null}
                </div>
                {s.figure ? (
                  <Reveal className="stage__figure" delay={80}>
                    <Figure
                      src={s.figure.src}
                      alt={s.figure.alt}
                      caption={s.figure.caption}
                    />
                  </Reveal>
                ) : null}
              </div>
              {/* HGT figure rides alongside the robustness stage */}
              {s.id === "robustness" ? (
                <Reveal className="stage__extra" delay={120}>
                  <Figure
                    src="figures/hgt.png"
                    alt={hgt.alt}
                    caption={hgt.caption}
                  />
                </Reveal>
              ) : null}
            </li>
          ))}
        </ol>

        {/* ---- Results table ---- */}
        <section id="results" className="band band--results">
          <div className="band__head">
            <Reveal as="h2" className="band__title">
              What the schedules settle to.
            </Reveal>
            <Reveal as="p" className="band__sub" delay={80}>
              Terminal mean resistance frequency after 1000 generations, averaged
              over ten seeds. The ordering tracks exposure intensity; combination
              edges past every component.
            </Reveal>
          </div>
          <Reveal delay={120}>
            <table className="spec" aria-describedby="spec-cap">
              <caption id="spec-cap" className="spec__caption mono">
                Table I &mdash; {resultsTable.caption}
              </caption>
              <thead>
                <tr>
                  {resultsTable.columns.map((c, i) => (
                    <th key={c} scope="col" className={i > 0 ? "num" : ""}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {resultsTable.rows.map((row) => (
                  <tr key={row[0]}>
                    <th scope="row">{row[0]}</th>
                    <td className="num">{row[1]}</td>
                    <td
                      className={`num ${
                        row[2].startsWith("+") ? "is-up" : "is-down"
                      }`}
                    >
                      {row[2]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </section>

        {/* ---- Discussion / lessons ---- */}
        <section id="discussion" className="band band--lessons">
          <Reveal as="h2" className="band__title">
            Three lessons for schedule-aware simulation.
          </Reveal>
          <div className="lessons">
            {lessons.map((l, i) => (
              <Reveal as="article" key={i} className="lesson" delay={i * 70}>
                <span className="lesson__rule mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="lesson__head">{l.head}</h3>
                <p>{l.body}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---- Close: limitations + conclusion ---- */}
        <section id="close" className="band band--close">
          <div className="close__grid">
            <Reveal className="close__concl">
              <h2 className="band__title">Where this stands.</h2>
              <p className="close__lede">{conclusion}</p>
            </Reveal>
            <Reveal className="close__limits" delay={80}>
              <p className="close__limits-head mono">Scope &amp; limitations</p>
              <ul>
                {limitations.map((l, i) => (
                  <li key={i}>{l}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ---- Ft4 · Dense colophon ---- */}
        <footer className="colophon mono">
          <p className="colophon__cite">
            N. T. E. Pazon and C. V. M. Montero, &ldquo;{meta.manuscriptTitle}
            ,&rdquo; {meta.date}.
          </p>
          <p className="colophon__meta">
            Thesis &mdash; {meta.thesisTitle}. &nbsp;//&nbsp; Pipeline: empirical{" "}
            27-locus <i>S. maltophilia</i> panel (463 isolates) &rarr; YAML PK/PD
            schedule &rarr; multi-locus Wright&ndash;Fisher with optional HGT.
            &nbsp;//&nbsp; Figures generated from versioned configs with fixed
            seeds. &nbsp;//&nbsp; Index Terms: antimicrobial resistance,
            Wright&ndash;Fisher model, pharmacokinetics/pharmacodynamics, cyclical
            dosing, stewardship simulation.
          </p>
          <p className="colophon__refs">
            [1] Murray et al., &ldquo;Global burden of bacterial antimicrobial
            resistance in 2019,&rdquo; <i>The Lancet</i>, 399(10325):629&ndash;655,
            2022. &nbsp; [2] Laxminarayan et al., &ldquo;Antibiotic
            resistance&mdash;the need for global solutions,&rdquo;{" "}
            <i>Lancet Infect. Dis.</i>, 13(12):1057&ndash;1098, 2013. &nbsp; [3]
            Ventola, &ldquo;The antibiotic resistance crisis: Part 1,&rdquo;{" "}
            <i>P&amp;T</i>, 40(4):277&ndash;283, 2015.
          </p>
        </footer>
      </main>
    </>
  );
}
