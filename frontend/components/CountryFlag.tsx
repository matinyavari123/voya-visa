/**
 * پرچم‌های ساده‌شده‌ی کشورها، کشیده‌شده با SVG.
 * TODO: وقتی عکس واقعی کشورها رسید، این‌ها به نشان کوچک گوشه‌ی کارت تبدیل می‌شن.
 */
import type { JSX } from "react";

const W = 60;
const H = 40;

/** نوار افقی */
const H3 = (a: string, b: string, c: string) => (
  <>
    <rect width={W} height={H / 3} fill={a} />
    <rect y={H / 3} width={W} height={H / 3} fill={b} />
    <rect y={(2 * H) / 3} width={W} height={H / 3} fill={c} />
  </>
);

/** نوار عمودی */
const V3 = (a: string, b: string, c: string) => (
  <>
    <rect width={W / 3} height={H} fill={a} />
    <rect x={W / 3} width={W / 3} height={H} fill={b} />
    <rect x={(2 * W) / 3} width={W / 3} height={H} fill={c} />
  </>
);

/** صلیب اسکاندیناوی */
const NordicCross = (bg: string, cross: string, inner?: string) => (
  <>
    <rect width={W} height={H} fill={bg} />
    <path d={`M22,0 V40 M0,17 H60`} stroke={cross} strokeWidth="8" fill="none" />
    {inner && <path d={`M22,0 V40 M0,17 H60`} stroke={inner} strokeWidth="3.5" fill="none" />}
  </>
);

const UnionJack = (x = 0, y = 0, w = 30, h = 20) => (
  <g transform={`translate(${x},${y}) scale(${w / 60},${h / 40})`}>
    <rect width={W} height={H} fill="#012169" />
    <path d="M0,0 L60,40 M60,0 L0,40" stroke="#FFFFFF" strokeWidth="8" />
    <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="3.5" />
    <path d="M30,0 V40 M0,20 H60" stroke="#FFFFFF" strokeWidth="13" />
    <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="7" />
  </g>
);

const star = (cx: number, cy: number, r: number, fill = "#FFFFFF") => {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 ? r * 0.4 : r;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    pts.push(`${(cx + rad * Math.cos(a)).toFixed(2)},${(cy + rad * Math.sin(a)).toFixed(2)}`);
  }
  return <polygon points={pts.join(" ")} fill={fill} />;
};

const flags: Record<string, JSX.Element> = {
  uk: <>{UnionJack(0, 0, 60, 40)}</>,

  usa: (
    <>
      <rect width={W} height={H} fill="#FFFFFF" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect key={i} y={(i * H) / 13} width={W} height={H / 13} fill="#B31942" />
      ))}
      <rect width={24} height={H * (7 / 13)} fill="#0A3161" />
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3, 4].map((col) => (
          <circle key={`${row}-${col}`} cx={2.8 + col * 4.6} cy={2.6 + row * 4.6} r={1.1} fill="#FFFFFF" />
        )),
      )}
    </>
  ),

  germany: H3("#000000", "#DD0000", "#FFCE00"),
  netherlands: H3("#AE1C28", "#FFFFFF", "#21468B"),
  russia: H3("#FFFFFF", "#0039A6", "#D52B1E"),

  france: V3("#002654", "#FFFFFF", "#ED2939"),
  italy: V3("#008C45", "#F4F5F0", "#CD212A"),
  ireland: V3("#169B62", "#FFFFFF", "#FF883E"),
  belgium: V3("#000000", "#FAE042", "#ED2939"),

  poland: (
    <>
      <rect width={W} height={H / 2} fill="#FFFFFF" />
      <rect y={H / 2} width={W} height={H / 2} fill="#DC143C" />
    </>
  ),

  spain: (
    <>
      <rect width={W} height={H} fill="#AA151B" />
      <rect y={H / 4} width={W} height={H / 2} fill="#F1BF00" />
    </>
  ),

  czechia: (
    <>
      <rect width={W} height={H / 2} fill="#FFFFFF" />
      <rect y={H / 2} width={W} height={H / 2} fill="#D7141A" />
      <polygon points="0,0 30,20 0,40" fill="#11457E" />
    </>
  ),

  switzerland: (
    <>
      <rect width={W} height={H} fill="#DA291C" />
      <rect x={26.5} y={9} width={7} height={22} fill="#FFFFFF" />
      <rect x={19} y={16.5} width={22} height={7} fill="#FFFFFF" />
    </>
  ),

  sweden: NordicCross("#006AA7", "#FECC00"),
  denmark: NordicCross("#C8102E", "#FFFFFF"),
  finland: NordicCross("#FFFFFF", "#003580"),
  norway: NordicCross("#BA0C2F", "#FFFFFF", "#00205B"),

  australia: (
    <>
      <rect width={W} height={H} fill="#00247D" />
      {UnionJack(0, 0, 30, 20)}
      {star(15, 31, 4)}
      {star(43, 8, 2.4)}
      {star(50, 17, 2.4)}
      {star(44, 27, 2.4)}
      {star(37, 20, 1.6)}
    </>
  ),

  "new-zealand": (
    <>
      <rect width={W} height={H} fill="#00247D" />
      {UnionJack(0, 0, 30, 20)}
      {star(46, 9, 2.4, "#CC142B")}
      {star(52, 20, 2.4, "#CC142B")}
      {star(44, 30, 2.4, "#CC142B")}
      {star(39, 19, 1.8, "#CC142B")}
    </>
  ),

  uae: (
    <>
      {H3("#00732F", "#FFFFFF", "#000000")}
      <rect width={15} height={H} fill="#FF0000" />
    </>
  ),

  kuwait: (
    <>
      {H3("#007A3D", "#FFFFFF", "#CE1126")}
      <polygon points="0,0 16,13.33 16,26.67 0,40" fill="#000000" />
    </>
  ),

  india: (
    <>
      {H3("#FF9933", "#FFFFFF", "#138808")}
      <circle cx={30} cy={20} r={5.5} fill="none" stroke="#000080" strokeWidth="1.2" />
      <circle cx={30} cy={20} r={1.2} fill="#000080" />
    </>
  ),

  singapore: (
    <>
      <rect width={W} height={H / 2} fill="#EF3340" />
      <rect y={H / 2} width={W} height={H / 2} fill="#FFFFFF" />
      <circle cx={13} cy={10} r={6.5} fill="#FFFFFF" />
      <circle cx={16.5} cy={10} r={6.5} fill="#EF3340" />
      {star(22, 6, 1.7)}
      {star(27, 9.5, 1.7)}
      {star(25, 15, 1.7)}
      {star(19, 15, 1.7)}
      {star(17, 9.5, 1.7)}
    </>
  ),

  taiwan: (
    <>
      <rect width={W} height={H} fill="#FE0000" />
      <rect width={30} height={20} fill="#000095" />
      <circle cx={15} cy={10} r={5} fill="#FFFFFF" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (Math.PI / 6) * i;
        return (
          <line
            key={i}
            x1={15 + 5 * Math.cos(a)}
            y1={10 + 5 * Math.sin(a)}
            x2={15 + 7.6 * Math.cos(a)}
            y2={10 + 7.6 * Math.sin(a)}
            stroke="#FFFFFF"
            strokeWidth="1.6"
          />
        );
      })}
    </>
  ),

  vietnam: (
    <>
      <rect width={W} height={H} fill="#DA251D" />
      {star(30, 20, 11, "#FFFF00")}
    </>
  ),
};

export default function CountryFlag({ slug, className = "" }: { slug: string; className?: string }) {
  const flag = flags[slug];
  if (!flag) return null;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="پرچم کشور"
      className={className}
      style={{ display: "block" }}
    >
      {flag}
    </svg>
  );
}
