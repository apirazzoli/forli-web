import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import getContent from "../../lib/content";

const WORLD_MAP_SRC =
  "https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg";

function AppleMarker() {
  return (
    <svg viewBox="0 0 24 24" className="apple-marker" aria-hidden="true">
      <path
        d="M12 7.5c-1.2-1-2.9-1.4-4.4-.7C5.2 7.9 4.2 10.6 4.8 13.4c.6 2.9 2.4 5.6 4.4 6.3.9.3 1.9.1 2.8-.4.9.5 1.9.7 2.8.4 2-.7 3.8-3.4 4.4-6.3.6-2.8-.4-5.5-2.8-6.6-1.5-.7-3.2-.3-4.4.7z"
        fill="#A32D2D"
      />
      <path
        d="M12.2 7.2c.1-1.6.9-3 2.3-3.8"
        fill="none"
        stroke="#4A3522"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M13 5.2c1.6-1.8 3.9-1.9 4.9-1.6-.3 1.5-1.8 3.2-3.7 3.2-.5 0-.9-.1-1.2-.3z"
        fill="#3C7252"
      />
    </svg>
  );
}

function CherryMarker() {
  return (
    <svg viewBox="0 0 24 24" className="apple-marker" aria-hidden="true">
      <path
        d="M8.5 9.5C9.5 6 12 3.6 15.5 2.8M15 9.8c-1.8-3.4-3-5.3-6.5-7"
        fill="none"
        stroke="#4A3522"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M15.2 3.1c2-1 4.1-.7 5.2 0-.7 1.3-2.5 2.3-4.3 1.9-.4-.1-.7-.3-.9-.5z"
        fill="#3C7252"
      />
      <circle cx="7.5" cy="14.5" r="5" fill="#A32D2D" />
      <circle cx="15.5" cy="16.5" r="4.5" fill="#7C1F1F" />
    </svg>
  );
}

export default function Fruta({ slug }) {
  const { locale } = useRouter();
  const content = getContent(locale);
  const { brand, fruits, ui } = content;
  const fruit = fruits.items.find((f) => f.slug === slug);
  const others = fruits.items.filter((f) => f.slug !== slug);

  return (
    <Layout>
      <Head>
        <title>{fruit.name} — {brand.name}</title>
        <meta name="description" content={fruit.body} />
      </Head>

      <div className="container">
        <div className="section-head">
          <h2>{fruit.name}</h2>
        </div>
        <p className="intro">{fruit.intro}</p>
      </div>

      <div className="fruit-photo" data-reveal="left">
        <img src={fruit.image} alt={fruit.imageAlt} />
        {fruit.imageCredit && (
          <span className="fruit-credit">{fruit.imageCredit}</span>
        )}
      </div>

      <div className="container">
        <p className="fruit-body" data-reveal="right">{fruit.body}</p>

        {fruit.extra &&
          fruit.extra.map((block, i) => (
            <section
              className="extra-block"
              data-reveal={i % 2 === 0 ? "left" : "right"}
              key={block.title}
            >
              <div className="section-head">
                <h2>{block.title}</h2>
              </div>
              <p className="fruit-body extra-body">{block.body}</p>
            </section>
          ))}

        {fruit.gallery && (
          <section className="varieties" data-reveal="left">
            <div className="section-head">
              <h2>{fruit.gallery.title}</h2>
            </div>
            <div className="varieties-grid">
              {fruit.gallery.items.map((g) => (
                <div className="variety" key={g.name}>
                  <div className="variety-photo">
                    <img src={g.image} alt={g.imageAlt} loading="lazy" />
                  </div>
                  <div className="variety-name">{g.name}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {fruit.varieties && (
          <section className="varieties" data-reveal="right">
            <div className="section-head">
              <h2>{fruit.varieties.title}</h2>
            </div>
            <div className="varieties-grid">
              {fruit.varieties.items.map((v) => (
                <div className="variety" key={v.name}>
                  <div className="variety-photo">
                    <img src={v.image} alt={v.imageAlt} loading="lazy" />
                  </div>
                  <div className="variety-name">{v.name}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {fruit.exportMap && (
          <section className="export-map-section" data-reveal="left">
            <div className="section-head">
              <h2>{fruit.exportMap.title}</h2>
            </div>
            <div className="export-map">
              <img
                src={WORLD_MAP_SRC}
                alt=""
                className="export-map-base"
              />
              {fruit.exportMap.destinations.map((d) => (
                <div
                  className="export-pin"
                  key={d.name}
                  style={{ left: `${d.x}%`, top: `${d.y}%` }}
                >
                  {fruit.exportMap.marker === "cherry" ? (
                    <CherryMarker />
                  ) : (
                    <AppleMarker />
                  )}
                  <span className="export-pin-label">{d.name}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {fruit.quality && (
          <section className="quality" data-reveal="right">
            <div className="section-head">
              <h2>{fruit.quality.title}</h2>
            </div>
            <p className="quality-intro">{fruit.quality.intro}</p>
            <ul className="quality-list">
              {fruit.quality.items.map((q) => (
                <li key={q.label}>
                  <span className="quality-label">{q.label}:</span> {q.text}
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="fruit-others" data-reveal="left">
          <div className="fruit-others-label">{ui.alsoGrow}</div>
          <div className="fruit-others-links">
            {others.map((f) => (
              <Link href={`/fruta/${f.slug}`} key={f.slug} className="tab-btn">
                {f.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export function getStaticPaths({ locales }) {
  const es = getContent("es");
  return {
    paths: locales.flatMap((locale) =>
      es.fruits.items.map((f) => ({ params: { slug: f.slug }, locale }))
    ),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  return { props: { slug: params.slug } };
}
