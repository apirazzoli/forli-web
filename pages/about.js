import { useState } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import content from "../data/site-content.json";

export default function About() {
  const { brand, about } = content;
  const [active, setActive] = useState(about.tabs[0].id);

  const activeTab = about.tabs.find((t) => t.id === active);

  return (
    <Layout>
      <Head>
        <title>Nosotros — {brand.name}</title>
        <meta name="description" content={about.intro} />
      </Head>

      <div className="container">
        <div className="section-head">
          <h2>Nosotros</h2>
        </div>

        <p className="intro" data-reveal="left">{about.intro}</p>

        <div className="tabs" data-reveal="right">
          {about.tabs.map((t) => (
            <button
              key={t.id}
              className={`tab-btn ${active === t.id ? "active" : ""}`}
              onClick={() => setActive(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="tab-panel">{activeTab?.body}</div>

        <div style={{ height: 80 }} />
      </div>
    </Layout>
  );
}
