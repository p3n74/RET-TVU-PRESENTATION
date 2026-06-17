// A real paper figure wrapped in a hairline <figure> — no fake browser/IDE chrome.
export function Figure({
  src,
  alt,
  caption,
  label,
}: {
  src: string;
  alt: string;
  caption: string;
  label?: string;
}) {
  return (
    <figure className="figure">
      <div className="figure__frame">
        <img src={src} alt={alt} loading="lazy" decoding="async" />
      </div>
      <figcaption className="figure__caption">
        {label ? <span className="figure__label">{label}</span> : null}
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}
