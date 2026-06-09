import { useMemo, useRef } from "react";
import { useEntrance, Count } from "../lib/anim";
import { longTail } from "../data/computed";

const base = import.meta.env.BASE_URL;
const COVERS = ["truenos.jpg", "caminar.webp", "fiestas.jpg", "sadako.jpg", "georgia.jpg"];
// Colores de lomo para la cabeza iluminada (la zona que vende)
const HEAD_COLORS = ["#2dd4c5", "#e8a33d", "#46c08b", "#7fb4ff", "#0d8f84"];

// Interpola la curva long tail real (pct títulos -> pct ventas acumulado).
function cumAt(pct: number): number {
  const pts = longTail.puntos;
  if (pct <= pts[0].pctTitulos) return (pct / pts[0].pctTitulos) * pts[0].pctVentas;
  for (let i = 1; i < pts.length; i++) {
    if (pct <= pts[i].pctTitulos) {
      const a = pts[i - 1], b = pts[i];
      return a.pctVentas + ((pct - a.pctTitulos) / (b.pctTitulos - a.pctTitulos)) * (b.pctVentas - a.pctVentas);
    }
  }
  return 100;
}

// Escena · La estantería: cada lomo ≈ 1.000 títulos reales; su altura, las ventas de ese tramo.
// La cabeza está iluminada; el resto se hunde en la oscuridad (el cementerio de los libros olvidados).
export default function EscEstanteria() {
  const root = useRef<HTMLElement>(null);
  useEntrance(root, (tl) => {
    tl.from(".lomo", { scaleY: 0, duration: 0.5, ease: "power2.out", stagger: 0.012 }, "-=0.4");
  });

  // 100 lomos = percentiles del catálogo (cada lomo ≈ 1.000 títulos)
  const lomos = useMemo(() => {
    const bands: number[] = [];
    for (let c = 0; c < 100; c++) bands.push(Math.max(0.12, cumAt(c + 1) - cumAt(c)));
    const max = Math.max(...bands);
    return bands.map((b, i) => ({
      h: Math.max(4, Math.sqrt(b / max) * 100), // % de la altura del estante (escala comprimida)
      head: i < 5,
      color: i < 5 ? HEAD_COLORS[i] : undefined,
      dim: i >= 5 ? Math.max(0.08, 0.5 - (i / 100) * 0.45) : 1,
    }));
  }, []);

  return (
    <section ref={root} className="h-full w-full flex flex-col px-6 md:px-14 pt-20 pb-10">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-[1.15fr_1fr] gap-8 items-end">
        <div>
          <p data-a className="act-kicker mb-3">Capítulo II · ¿Qué tiene realmente en el catálogo?</p>
          <h2 data-a className="font-display text-4xl md:text-5xl font-semibold leading-[1.05]">
            <Count to={99985} duration={2} className="text-spark" /> títulos.{" "}
            <span className="text-spark">El 5% sostiene la librería.</span>
          </h2>
        </div>
        <p data-a className="text-ivory-dim leading-relaxed text-sm md:text-base">
          El Excel decía ≈7.479 referencias: el catálogo real, reconstruido desde la facturación, es{" "}
          <strong className="text-ivory">13 veces mayor</strong>. Cada lomo de esta estantería son
          ≈1.000 títulos; su altura, lo que venden de verdad (el 5% hace el 53%).
        </p>
      </div>

      {/* la estantería */}
      <div data-a className="relative flex-1 mt-6 max-w-7xl mx-auto w-full min-h-0">
        {/* superventas reales apoyados sobre la cabeza */}
        <div className="absolute left-[1%] -top-2 flex gap-1.5 z-10">
          {COVERS.map((c, i) => (
            <img key={c} src={`${base}covers/${c}`} alt="" loading="lazy"
              className="h-24 w-16 object-cover rounded-[3px] shadow-2xl border border-hairline"
              style={{ transform: `rotate(${(i - 2) * 1.6}deg)` }} />
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-10 top-24 flex items-end gap-[0.35%]">
          {lomos.map((l, i) => (
            <div key={i} className="lomo flex-1"
              style={{
                height: `${l.h}%`,
                background: l.head
                  ? l.color
                  : `rgba(184,180,168,${l.dim})`,
                boxShadow: l.head ? `0 0 18px ${l.color}55` : undefined,
              }} />
          ))}
        </div>
        {/* la balda */}
        <div className="absolute inset-x-0 bottom-9 h-px bg-hairline" />
        {/* penumbra creciente hacia la cola */}
        <div className="absolute inset-y-0 right-0 w-2/3 pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, rgba(7,9,13,0.85))" }} />
        <div className="absolute left-[1%] bottom-1 text-xs text-spark font-semibold">← la cabeza: 5% de los títulos, 53% de las ventas</div>
        <div className="absolute right-[2%] bottom-1 text-xs text-faint italic">el cementerio de los libros olvidados →</div>
      </div>

      <p data-a className="max-w-7xl mx-auto w-full mt-3 text-xs text-faint">
        Curva real de concentración del catálogo (2021-2026) · escala de altura comprimida para que la cola sea visible · el 75% de las líneas no registra coste
      </p>
    </section>
  );
}
