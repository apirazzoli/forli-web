import { useEffect } from "react";
import Link from "next/link";
import content from "../data/site-content.json";

export default function Layout({ children }) {
  const { brand, fruits } = content;

  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("revealed"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));

    const catchSkipped = () => {
      let pending = false;
      els.forEach((el) => {
        if (el.classList.contains("revealed")) return;
        if (el.getBoundingClientRect().bottom < 0) {
          el.classList.add("revealed");
          io.unobserve(el);
        } else {
          pending = true;
        }
      });
      if (!pending) window.removeEventListener("scroll", catchSkipped);
    };
    window.addEventListener("scroll", catchSkipped, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", catchSkipped);
    };
  }, []);

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
