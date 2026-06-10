#!/usr/bin/env node
/**
 * content-manager.js
 * ------------------
 * Pequeño agente de línea de comandos para actualizar los datos del sitio
 * (data/site-content.json) sin tocar el código.
 *
 * Uso:
 *   node agents/content-manager.js set stats.hectareas 300000
 *   node agents/content-manager.js set brand.tagline "Nuevo lema"
 *   node agents/content-manager.js get stats.hectareas
 *   node agents/content-manager.js show
 *
 * Las rutas usan notación con puntos (ej: stats.hectareas).
 */

const fs = require("fs");
const path = require("path");

const DATA_PATH = path.join(__dirname, "..", "data", "site-content.json");

function load() {
  return JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
}

function save(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2) + "\n", "utf8");
}

function getPath(obj, keys) {
  return keys.reduce((acc, k) => (acc == null ? acc : acc[k]), obj);
}

function setPath(obj, keys, value) {
  const last = keys[keys.length - 1];
  const parent = keys.slice(0, -1).reduce((acc, k) => {
    if (acc[k] == null || typeof acc[k] !== "object") acc[k] = {};
    return acc[k];
  }, obj);
  parent[last] = value;
}

function coerce(raw) {
  // Convierte números cuando corresponde, deja el resto como string.
  if (raw === "true") return true;
  if (raw === "false") return false;
  if (raw !== "" && !isNaN(Number(raw))) return Number(raw);
  return raw;
}

function main() {
  const [cmd, keyPath, ...rest] = process.argv.slice(2);

  if (!cmd || cmd === "help") {
    console.log(
      [
        "Comandos:",
        "  show                      Muestra todo el contenido",
        "  get <ruta>                Lee un valor (ej: stats.hectareas)",
        "  set <ruta> <valor>        Cambia un valor",
      ].join("\n")
    );
    return;
  }

  const data = load();

  if (cmd === "show") {
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  if (!keyPath) {
    console.error("Falta la ruta. Ej: stats.hectareas");
    process.exit(1);
  }

  const keys = keyPath.split(".");

  if (cmd === "get") {
    console.log(getPath(data, keys));
    return;
  }

  if (cmd === "set") {
    const value = coerce(rest.join(" "));
    setPath(data, keys, value);
    save(data);
    console.log(`OK: ${keyPath} = ${JSON.stringify(value)}`);
    return;
  }

  console.error(`Comando desconocido: ${cmd}`);
  process.exit(1);
}

main();
