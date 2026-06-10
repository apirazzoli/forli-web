import Link from "next/link";
import content from "../data/site-content.json";

export default function Layout({ children }) {
  const { brand, fruits } = content;
  return (
    <>
      <nav className="nav">
        <Link href="/" className="logo">
          {brand.name.toUpperCase()}
        </Link>
        <div className="links">
          <Link href="/">Inicio</Link>
          <Link href="/about">Nosotros</Link>
          <div className="dropdown">
            <span className="dropdown-label">
              {fruits.menuLabel}
              <span className="caret">▾</span>
            </span>
            <div className="dropdown-menu">
              {fruits.items.map((f) => (
                <Link href={`/fruta/${f.slug}`} key={f.slug}>
                  {f.name}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/contacto">Contacto</Link>
        </div>
      </nav>

      <main>{children}</main>

      <footer className="footer">
        <div className="brand">{brand.name.toUpperCase()}</div>
        <div className="contact">
          {brand.email} &nbsp;·&nbsp; {brand.phone}
        </div>
      </footer>
    </>
  );
}
