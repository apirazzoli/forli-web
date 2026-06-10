import Link from "next/link";
import content from "../data/site-content.json";

export default function Layout({ children }) {
  const { brand } = content;
  return (
    <>
      <nav className="nav">
        <Link href="/" className="logo">
          {brand.name.toUpperCase()}
        </Link>
        <div className="links">
          <Link href="/">Inicio</Link>
          <Link href="/about">Nosotros</Link>
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
