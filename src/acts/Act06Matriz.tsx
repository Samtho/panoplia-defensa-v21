import { useRef } from "react";
import EChart from "../components/EChart";
import { useEntrance } from "../lib/anim";
import { matrizOption } from "../charts/stage";
import { matrizConteo } from "../data/computed";

// Acto 6 · La matriz de decisión: 108 cruces género × mercado cayendo en cascada.
const CHIPS = [
  { n: matrizConteo.POTENCIAR, label: "Potenciar", color: "text-leaf" },
  { n: matrizConteo.MANTENER, label: "Mantener", color: "text-ivory-dim" },
  { n: matrizConteo.VIGILAR, label: "Vigilar", color: "text-ember" },
  { n: matrizConteo.REDUCIR, label: "Reducir", color: "text-blood" },
];

export default function Act06Matriz() {
  const root = useRef<HTMLElement>(null);
  useEntrance(root);

  return (
    <section ref={root} className="h-full w-full flex flex-col px-6 md:px-14 pt-20 pb-6">
      <div className="max-w-7xl mx-auto w-full flex flex-wrap items-end justify-between gap-6">
        <div>
          <p data-a className="act-kicker mb-3">Acto 6 · ¿Qué potenciar y dónde?</p>
          <h2 data-a className="font-display text-4xl md:text-5xl font-semibold leading-[1.05]">
            108 cruces, 4 decisiones.{" "}
            <span className="text-spark">Perú encabeza la apuesta.</span>
          </h2>
        </div>
        <div data-a className="flex gap-8">
          {CHIPS.map((c) => (
            <div key={c.label} className="text-center">
              <div className={`font-display text-4xl font-semibold ${c.color}`}>{c.n}</div>
              <div className="text-xs text-faint mt-1">{c.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div data-a className="flex-1 mt-4 min-h-0 max-w-7xl mx-auto w-full rounded-2xl border border-hairline bg-stage-soft p-3">
        <EChart option={matrizOption()} height="100%" />
      </div>
      <p data-a className="max-w-7xl mx-auto w-full mt-3 text-sm text-faint">
        Score multi-criterio 0-1 (CAGR 25% · tendencia 25% · aceleración 15% · cuota relativa 20% ·
        estabilidad 15%). Perú × Historia y Pensamiento y Perú × Literatura lideran con 0,82.
      </p>
    </section>
  );
}
