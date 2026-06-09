import { useEffect, useRef } from "react";
import { reducedMotion } from "./anim";

// Campo de partículas persistente: las mismas ~1.500 partículas (las ventas de Panoplia)
// se reorganizan entre escenas. Es el hilo conductor visual de la historia.
export type FieldLayout = "hidden" | "drift" | "split" | "clientes" | "arrow";

const N = 1500;
const SPARK: RGB = [45, 212, 197];
const IVORY: RGB = [184, 180, 168];
const BLOOD: RGB = [232, 93, 75];
type RGB = [number, number, number];
type P = { x: number; y: number; tx: number; ty: number; c: RGB; tc: RGB; a: number; ta: number; r: number };

// aleatorio determinista (misma composición en cada pase)
function rng(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) / 2147483647);
}

function targetsFor(layout: FieldLayout, w: number, h: number): { x: number; y: number; c: RGB; a: number }[] {
  const rnd = rng(42);
  const out: { x: number; y: number; c: RGB; a: number }[] = [];

  if (layout === "drift") {
    for (let i = 0; i < N; i++) {
      out.push({ x: rnd() * w, y: rnd() * h, c: i % 9 === 0 ? SPARK : IVORY, a: 0.22 + rnd() * 0.2 });
    }
  } else if (layout === "split") {
    // 91,86% del dinero en el bloque España; 8,14% en la columna export (proporción real)
    const nEsp = Math.round(N * 0.9186);
    for (let i = 0; i < N; i++) {
      if (i < nEsp) {
        out.push({ x: w * 0.08 + rnd() * w * 0.5, y: h * 0.26 + rnd() * h * 0.5, c: IVORY, a: 0.5 });
      } else {
        out.push({ x: w * 0.74 + rnd() * w * 0.045, y: h * 0.26 + rnd() * h * 0.5, c: SPARK, a: 0.95 });
      }
    }
  } else if (layout === "clientes") {
    // 722 puntos = 722 clientes B2B reales, en tres multitudes separadas:
    // 175 Campeones (turquesa) · 44 En Riesgo (rojo) · 503 restantes (tenues).
    const grid = (n: number, cols: number, cx: number, cy: number, cellW: number, cellH: number, c: RGB, a: number) => {
      const rows = Math.ceil(n / cols);
      const gw = (cols - 1) * cellW, gh = (rows - 1) * cellH;
      for (let k = 0; k < n; k++) {
        const col = Math.floor(k / rows), row = k % rows;
        out.push({ x: cx - gw / 2 + col * cellW, y: cy - gh / 2 + row * cellH, c, a });
      }
    };
    const cy = h * 0.52;
    grid(175, 10, w * 0.50, cy, 13, 13, SPARK, 0.95);   // Campeones
    grid(44, 4, w * 0.645, cy, 13, 13, BLOOD, 0.95);    // En Riesgo
    grid(503, 18, w * 0.80, cy, 9, 9, IVORY, 0.3);      // Resto
    for (let i = 722; i < N; i++) out.push({ x: rnd() * w, y: rnd() * h, c: IVORY, a: 0 });
  } else if (layout === "arrow") {
    // flecha ascendente: del rojo (la caída) al turquesa (el plan)
    const x0 = w * 0.12, y0 = h * 0.78, x1 = w * 0.86, y1 = h * 0.24;
    const nShaft = Math.round(N * 0.8);
    for (let i = 0; i < N; i++) {
      if (i < nShaft) {
        const t = rnd();
        const jx = (rnd() - 0.5) * 26, jy = (rnd() - 0.5) * 26;
        const c: RGB = t < 0.4 ? BLOOD : t < 0.6 ? IVORY : SPARK;
        out.push({ x: x0 + (x1 - x0) * t + jx, y: y0 + (y1 - y0) * t + jy, c, a: 0.75 });
      } else {
        // punta de flecha
        const t = rnd(), s = rnd();
        const baseX = x1, baseY = y1;
        const dirX = (x1 - x0) / Math.hypot(x1 - x0, y1 - y0), dirY = (y1 - y0) / Math.hypot(x1 - x0, y1 - y0);
        const perpX = -dirY, perpY = dirX;
        const back = t * 90, side = (s - 0.5) * (1 - t) * 110;
        out.push({ x: baseX - dirX * back + perpX * side, y: baseY - dirY * back + perpY * side, c: SPARK, a: 0.9 });
      }
    }
  } else {
    for (let i = 0; i < N; i++) out.push({ x: rnd() * w, y: rnd() * h, c: IVORY, a: 0 });
  }
  return out;
}

export default function ParticleField({ layout }: { layout: FieldLayout }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const parts = useRef<P[]>([]);
  const layoutRef = useRef(layout);
  layoutRef.current = layout;

  useEffect(() => {
    const cv = canvas.current;
    if (!cv) return;
    const ctx = cv.getContext("2d")!;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let raf = 0;

    function size() {
      cv!.width = cv!.clientWidth * dpr;
      cv!.height = cv!.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function retarget() {
      const w = cv!.clientWidth, h = cv!.clientHeight;
      const t = targetsFor(layoutRef.current, w, h);
      if (!parts.current.length) {
        const rnd = rng(7);
        parts.current = t.map((tt) => ({
          x: rnd() * w, y: rnd() * h, tx: tt.x, ty: tt.y,
          c: [...IVORY] as RGB, tc: tt.c, a: 0, ta: tt.a, r: 1.2 + rnd() * 1.4,
        }));
      } else {
        parts.current.forEach((p, i) => {
          p.tx = t[i].x; p.ty = t[i].y; p.tc = t[i].c; p.ta = t[i].a;
        });
      }
      if (reducedMotion()) {
        parts.current.forEach((p) => { p.x = p.tx; p.y = p.ty; p.c = [...p.tc] as RGB; p.a = p.ta; });
      }
    }

    function draw(now: number) {
      const w = cv!.clientWidth, h = cv!.clientHeight;
      ctx.clearRect(0, 0, w, h);
      const driftOn = layoutRef.current === "drift";
      for (let i = 0; i < parts.current.length; i++) {
        const p = parts.current[i];
        p.x += (p.tx - p.x) * 0.05;
        p.y += (p.ty - p.y) * 0.05;
        p.a += (p.ta - p.a) * 0.06;
        for (let k = 0; k < 3; k++) p.c[k] += (p.tc[k] - p.c[k]) * 0.06;
        if (p.a < 0.012) continue;
        let dx = 0, dy = 0;
        if (driftOn) {
          dx = Math.sin(now / 2400 + i) * 7;
          dy = Math.cos(now / 2900 + i * 1.7) * 7;
        }
        ctx.fillStyle = `rgba(${p.c[0] | 0},${p.c[1] | 0},${p.c[2] | 0},${p.a})`;
        ctx.beginPath();
        ctx.arc(p.x + dx, p.y + dy, p.r, 0, 7);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }

    size();
    retarget();
    raf = requestAnimationFrame(draw);
    const ro = new ResizeObserver(() => { size(); retarget(); });
    ro.observe(cv);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // al cambiar el layout, recalcula los objetivos (las partículas viajan)
  useEffect(() => {
    const cv = canvas.current;
    if (!cv || !parts.current.length) return;
    const t = targetsFor(layout, cv.clientWidth, cv.clientHeight);
    parts.current.forEach((p, i) => { p.tx = t[i].x; p.ty = t[i].y; p.tc = t[i].c; p.ta = t[i].a; });
    if (reducedMotion()) parts.current.forEach((p) => { p.x = p.tx; p.y = p.ty; p.c = [...p.tc] as RGB; p.a = p.ta; });
  }, [layout]);

  return <canvas ref={canvas} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />;
}
