import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import content from "../../data/site-content.json";

export default function Fruta({ fruit }) {
  const { brand, fruits } = content;
  const others = fruits.items.filter((f) => f.slug !== fruit.slug);

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

      <div className="fruit-photo">
        <img src={fruit.image} alt={fruit.imageAlt} />
      </div>

      <div className="container">
        <p className="fruit-body">{fruit.body}</p>

        <div className="fruit-others">
          <div className="fruit-others-label">También cultivamos</div>
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

export function getStaticPaths() {
  return {
    paths: content.fruits.items.map((f) => ({ params: { slug: f.slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const fruit = content.fruits.items.find((f) => f.slug === params.slug);
  return { props: { fruit } };
}
