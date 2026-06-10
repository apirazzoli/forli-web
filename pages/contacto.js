import Head from "next/head";
import Layout from "../components/Layout";
import content from "../data/site-content.json";

export default function Contacto() {
  const { brand, contact, map } = content;

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    map.query
  )}&z=${map.zoom}&output=embed`;

  return (
    <Layout>
      <Head>
        <title>Contacto — {brand.name}</title>
        <meta name="description" content={contact.intro} />
      </Head>

      <div className="container">
        <div className="section-head">
          <h2>{contact.title}</h2>
        </div>

        <p className="intro" data-reveal="left">{contact.intro}</p>

        <div className="contact-grid">
          <div className="contact-item" data-reveal="left">
            <div className="contact-label">Email</div>
            <a href={`mailto:${brand.email}`} className="contact-value">
              {brand.email}
            </a>
          </div>
          <div className="contact-item" data-reveal="right" style={{ transitionDelay: "120ms" }}>
            <div className="contact-label">Teléfono</div>
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="contact-value">
              {brand.phone}
            </a>
          </div>
          <div className="contact-item" data-reveal="left" style={{ transitionDelay: "240ms" }}>
            <div className="contact-label">Ubicación</div>
            <div className="contact-value">{contact.location}</div>
          </div>
        </div>
      </div>

      <div className="map-frame contact-map" data-reveal="right">
        <iframe
          src={mapSrc}
          title="Ubicación"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </Layout>
  );
}
