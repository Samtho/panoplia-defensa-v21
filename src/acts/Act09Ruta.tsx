import { useRef } from "react";
import EChart from "../components/EChart";
import { useEntrance } from "../lib/anim";
import { proyeccionOption } from "../charts/stage";

// Acto 9 · La hoja de ruta y lo que vale: escenario del simulador del cuadro de mando
// (retener a los 44 "En Riesgo" ≈ +0,21 M€/año; desarrollar México ≈ +0,19 M€) → ≈3,08 M€.
const HORIZONTES = [
  { plazo: "0-90 días", titulo: "Frenar la fuga", txt: "Protocolo de retención para los 44 'En Riesgo' (1,04 M€ en juego) y coste en cada línea." },
  { plazo: "6 meses", titulo: "Diversificar", txt: "Desarrollo activo de México (ya es el 2º mercado) y migración del catálogo a PostgreSQL." },
  { plazo: "12+ meses", titulo: "Institucionalizar", txt: "Arquitectura cloud y un responsable de gobernanza: que el marco sobreviva al TFM." },
];

export default function Act09Ruta() {
  const root = useRef<HTMLElement>(null);
  useEntrance(root);

  return (
    <section ref={root} className="h-full w-full flex items-center px-6 md:px-14">
      <div className="max-w-7xl mx-auto w-full">
        <p data-a className="act-kicker mb-3">Acto 9 · ¿Qué hacer ahora?</p>
        <h2 data-a className="font-display text-4xl md:text-5xl font-semibold leading-[1.05] max-w-4xl">
          Tres horizontes para volver a crecer, <span className="text-spark">sin inversión externa.</span>
        </h2>

        <div className="grid lg:grid-cols-[1fr_1.25fr] gap-8 mt-8 items-center">
          <div className="space-y-3">
            {HORIZONTES.map((h) => (
              <div key={h.plazo} data-a className="rounded-xl border border-hairline bg-stage-soft px-5 py-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-spark font-display text-xl font-semibold whitespace-nowrap">{h.plazo}</span>
                  <span className="font-semibold text-ivory">{h.titulo}</span>
                </div>
                <p className="text-sm text-ivory-dim mt-1 leading-relaxed">{h.txt}</p>
              </div>
            ))}
          </div>
          <div data-a className="rounded-2xl border border-hairline bg-stage-soft p-4">
            <p className="text-sm text-ivory-dim mb-1 px-2">
              Solo las dos primeras palancas (retener el riesgo +0,21 · México +0,19) devuelven la
              facturación a <strong className="text-spark">≈3,08 M€</strong>, camino del pico.
            </p>
            <EChart option={proyeccionOption(3.08)} height={340} />
            <p className="text-[11px] text-faint px-2">Escenario ilustrativo del simulador del cuadro de mando, sobre la serie real 2021-2025.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
