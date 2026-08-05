# Documentación interna

Esta carpeta es para vos (el dev), no para las tiendas ni para los reviewers.
`BUILD.md`, en la raíz, ya aclara que estos archivos no forman parte del
paquete que se sube a Chrome Web Store / AMO.

Orden sugerido de lectura:

1. **[architecture.md](./architecture.md)** — cómo se relacionan los 4 archivos
   de la extensión (`background.js`, `content.js`, `popup.js`,
   `transcript-sources.js`), qué corre dónde, y cómo se hablan entre sí.
2. **[content-js-map.md](./content-js-map.md)** — el mapa detallado de
   `content.js` (el archivo grande, ~1800 líneas). Agrupa las funciones por
   responsabilidad, con línea de inicio, para que puedas ubicarte rápido y
   para que sirva de base cuando decidan partirlo en archivos.
3. **[known-issues.md](./known-issues.md)** — bugs ya encontrados y
   corregidos, con la causa raíz. Sirve para no repetir el mismo error al
   tocar código cercano.

## Por qué content.js es tan grande

El proyecto no usa bundler (ver `BUILD.md`): lo que está en el repo es
exactamente lo que carga el navegador, sin build step, para que sea fácil de
auditar por los reviewers de las tiendas. Eso significa que separar código en
módulos no se puede hacer con `import`/`export` — hay que declarar varios
archivos JS en el manifest y dejar que compartan el scope global, como ya se
hizo con `transcript-sources.js` en el background. `content-js-map.md` está
organizado pensando en esa futura división: cada sección del mapa es
candidata a ser su propio archivo.
