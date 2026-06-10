# Forli — Web institucional

Sitio web de marca construido con **Next.js**. Páginas de Inicio y Nosotros,
con todo el contenido editable desde un único archivo JSON.

## Requisitos

- [Node.js](https://nodejs.org) 18 o superior (incluye `npm`).

## Cómo correrlo

```bash
cd forli-web
npm install
npm run dev
```

Abrí http://localhost:3000 en el navegador.

## Estructura

```
forli-web/
├── data/
│   └── site-content.json     ← EDITÁ ACÁ los textos y números
├── components/
│   └── Layout.js             Navbar + footer compartidos
├── pages/
│   ├── _app.js               Carga estilos globales
│   ├── index.js              Página de Inicio
│   └── about.js              Página Nosotros (con tabs)
├── styles/
│   └── globals.css           Estilos
├── agents/
│   └── content-manager.js    Agente CLI para editar datos sin tocar código
├── next.config.js
└── package.json
```

## Editar el contenido

Toda la información (nombre de marca, hectáreas, secciones, tabs) vive en
[`data/site-content.json`](data/site-content.json). Cambiá los valores y
recargá la página.

### Con el agente (opcional)

En lugar de editar el JSON a mano:

```bash
node agents/content-manager.js show
node agents/content-manager.js get stats.hectareas
node agents/content-manager.js set stats.hectareas 300000
node agents/content-manager.js set brand.tagline "Nuevo lema"
```

## Publicar en Vercel

1. Subí la carpeta `forli-web` a un repositorio de GitHub.
2. Importá el repo en [vercel.com](https://vercel.com) — detecta Next.js solo.
3. Deploy automático. Listo.
