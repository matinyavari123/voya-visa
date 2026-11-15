import { geoPath, geoEquirectangular } from "d3-geo";
import { feature, mesh } from "topojson-client";
import { readFileSync, writeFileSync } from "node:fs";

const W = 2048, H = 1024;
const topo = JSON.parse(readFileSync("/home/claude/voya-visa/node_modules/world-atlas/countries-50m.json", "utf8"));
const land = feature(topo, topo.objects.countries);
const borders = mesh(topo, topo.objects.countries, (a, b) => a !== b);

const projection = geoEquirectangular().fitSize([W, H], { type: "Sphere" });
const path = geoPath(projection);

const graticule = [];
for (let lon = -180; lon <= 180; lon += 20) graticule.push(path({ type: "LineString", coordinates: [[lon, -90], [lon, 90]] }));
for (let lat = -80; lat <= 80; lat += 20) {
  const pts = [];
  for (let lon = -180; lon <= 180; lon += 2) pts.push([lon, lat]);
  graticule.push(path({ type: "LineString", coordinates: pts }));
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#0E2C25"/>
  <g fill="none" stroke="#1C4A3C" stroke-width="1.5">${graticule.map((d) => `<path d="${d}"/>`).join("")}</g>
  <path d="${path(land)}" fill="#C9D3A0" stroke="none"/>
  <path d="${path(borders)}" fill="none" stroke="#0E2C25" stroke-width="1.1" stroke-opacity="0.55"/>
</svg>`;

writeFileSync("/tmp/claude-0/-home-claude/ede85164-ae65-5e94-a478-231655591b6e/scratchpad/globe/world.svg", svg);
console.log("svg bytes", svg.length);
