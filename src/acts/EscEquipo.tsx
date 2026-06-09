import { useRef } from "react";
import { useEntrance } from "../lib/anim";

// Escena 3 · El equipo y el plan del relevo: quién cuenta qué.
const RELEVO = [
  { ini: "SO", rol: "Apertura y cierre", tema: "La tesis" },
  { ini: "EH", rol: "Capítulo I", tema: "El diagnóstico" },
  { ini: "HV", rol: "Capítulo II", tema: "Catálogo y clientes" },
  { ini: "HR", rol: "Capítulo III", tema: "La máquina de decidir" },
  { ini: "VS", rol: "Capítulo IV", tema: "El plan" },
];

export default function EscEquipo() {
  const root = useRef<HTMLElement>(null);
  useEntrance(root);

  return (
    <section ref={root} className="h-full w-full flex flex-col items-center justify-center px-6">
      <p data-a className="act-kicker mb-4">La expedición</p>
      <h2 data-a className="act-title text-center max-w-4xl" style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.6rem)" }}>
        Cinco personas, cinco fases,<br />seis objetivos. <span className="text-spark">Un relevo.</span>
      </h2>
      <div className="mt-12 flex flex-wrap justify-center gap-4 max-w-5xl">
        {RELEVO.map((p) => (
          <div key={p.ini} data-a className="rounded-2xl border border-hairline bg-stage-soft px-6 py-5 text-center w-44">
            <div className="h-12 w-12 mx-auto rounded-full bg-spark/15 text-spark grid place-items-center font-display text-lg font-bold">
              {p.ini}
            </div>
            <div className="mt-3 text-sm font-semibold text-ivory">{p.rol}</div>
            <div className="text-xs text-faint mt-0.5">{p.tema}</div>
          </div>
        ))}
      </div>
      <p data-a className="mt-10 text-sm text-faint max-w-xl text-center">
        Ingeniería de datos · análisis · BI · machine learning · cloud: cada capítulo lo cuenta quien lo construyó.
      </p>
    </section>
  );
}
