import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import getContent from "../lib/content";

export default function Home() {
  const { locale } = useRouter();
  const { brand, map, home } = getContent(locale);

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    map.query
  )}&z=${map.zoom}&output=embed`;

  return (
    <Layout>
      <Head>
        <title>{brand.name} — {brand.tagline}</title>
        <meta name="description" content={home.heroSubtitle} />
      </Head>

      <section className="hero hero-photo">
        <div className="hero-bg" aria-hidden="true">
          <img src={home.heroImage} alt="" />
        </div>
        <div className="hero-content">
          <span className="kicker">{brand.tagline}</span>
          <h1>{home.heroTitle}</h1>
          <p>{home.heroSubtitle}</p>
          <Link href="/about" className="btn">
            {home.heroCtaLabel}
          </Link>
        </div>
      </section>

      <div className="container">
        {home.features.map((f, i) => (
          <section
            className={`split ${i % 2 === 1 ? "reverse" : ""}`}
            data-reveal={i % 2 === 0 ? "left" : "right"}
            key={i}
          >
            <div className="split-photo">
              <img src={f.image} alt={f.imageAlt} loading="lazy" />
            </div>
            <div className="split-text">
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          </section>
        ))}
      </div>

      <section className="map-section" data-reveal="left">
        <div className="container">
          <div className="section-head">
            <h2>{map.title}</h2>
          </div>
        </div>
        <div className="map-frame">
          <iframe
            src={mapSrc}
            title={map.title}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <div className="container">
        <section className="cards">
          {home.sections.map((s, i) => (
            <div
              className="card"
              data-reveal={i % 2 === 0 ? "left" : "right"}
              style={{ transitionDelay: `${i * 120}ms` }}
              key={i}
            >
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </section>
      </div>

      <section className="banner" data-reveal="right">
        <img
          src={home.banner.image}
          alt={home.banner.imageAlt}
          className="banner-bg"
          loading="lazy"
        />
        <div className="banner-overlay">
          <h2>{home.banner.title}</h2>
          <p>{home.banner.body}</p>
        </div>
      </section>
    </Layout>
  );
}
