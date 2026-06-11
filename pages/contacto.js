import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import getContent from "../lib/content";

export default function Contacto() {
  const { locale } = useRouter();
  const { brand, contact, map } = getContent(locale);

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    map.query
  )}&z=${map.zoom}&output=embed`;

  const labels =
    locale === "en"
      ? { email: "Email", phone: "Phone", location: "Location" }
      : { email: "Email", phone: "Teléfono", location: "Ubicación" };

  return (
    <Layout>
      <Head>
        <title>{contact.title} — {brand.name}</title>
        <meta name="description" content={contact.intro} />
      </Head>

      <div className="container">
        <div className="section-head">
          <h2>{contact.title}</h2>
        </div>

        <p className="intro" data-reveal="left">{contact.intro}</p>

        <div className="contact-grid">
          <div className="contact-item" data-reveal="left">
            <div className="contact-label">{labels.email}</div>
            <a href={`mailto:${brand.email}`} className="contact-value">
              {brand.email}
            </a>
          </div>
          <div className="contact-item" data-reveal="right" style={{ transitionDelay: "120ms" }}>
            <div className="contact-label">{labels.phone}</div>
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="contact-value">
              {brand.phone}
            </a>
          </div>
          <div className="contact-item" data-reveal="left" style={{ transitionDelay: "240ms" }}>
            <div className="contact-label">{labels.location}</div>
            <div className="contact-value">{contact.location}</div>
          </div>
        </div>
      </div>

      <div className="map-frame contact-map" data-reveal="right">
        <iframe
          src={mapSrc}
          title={contact.title}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </Layout>
  );
}
