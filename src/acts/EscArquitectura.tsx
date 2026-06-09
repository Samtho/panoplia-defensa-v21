import { useRef } from "react";
import { useEntrance } from "../lib/anim";

// Escena · El viaje del dato: de las hojas de Excel a una arquitectura que sobrevive al TFM.
const PASOS = [
  { n: "01", titulo: "Excel", det: "10 hojas en bruto · 372.979 registros", estado: "el origen" },
  { n: "02", titulo: "Python + PostgreSQL", det: "limpieza, normalización y modelo en estrella", estado: "construido" },
  { n: "03", titulo: "Power BI", det: "cuadro de mando ejecutivo · DAX · RFM · matriz", estado: "construido" },
  { n: "04", titulo: "Machine Learning", det: "scikit-learn · benchmark de 8 familias", estado: "construido" },
  { n: "05", titulo: "Azure", det: "Blob · PostgreSQL gestionado · Data Factory", estado: "PoC sobre Free Tier" },
];

export default function EscArquitectura() {
  const root = useRef<HTMLElement>(null);
  useEntrance(root);

  return (
    <section ref={root} className="h-full w-full flex flex-col items-center justify-center px-6 md:px-14">
      <p data-a className="act-kicker mb-3">Capítulo IV · ¿Y esto sobrevive al TFM?</p>
      <h2 data-a className="font-display text-4xl md:text-6xl font-semibold text-center leading-[1.02] max-w-4xl">
        El viaje del dato, <span className="text-spark">de Excel a la nube</span>.
      </h2>

      <div className="mt-12 flex flex-col lg:flex-row items-stretch gap-3 w-full max-w-6xl">
        {PASOS.map((p, i) => (
          <div key={p.n} data-a className="flex-1 flex lg:flex-col items-center gap-3">
            <div className="rounded-2xl border border-hairline bg-stage-soft px-5 py-5 text-center w-full">
              <div className="text-[10px] text-faint tracking-[0.2em]">{p.n}</div>
              <div className="font-display text-xl font-semibold text-ivory mt-1">{p.titulo}</div>
              <div className="text-xs text-ivory-dim mt-1.5 leading-snug">{p.det}</div>
              <div className={`text-[10px] uppercase tracking-wide mt-3 font-semibold ${p.estado === "el origen" ? "text-faint" : "text-spark"}`}>{p.estado}</div>
            </div>
            {i < PASOS.length - 1 && <div className="text-spark text-xl rotate-90 lg:rotate-0" aria-hidden="true">→</div>}
          </div>
        ))}
      </div>

      <p data-a className="mt-10 text-sm text-faint max-w-2xl text-center">
        Todo con herramientas abiertas y reproducibles: Panoplia puede repetir cada paso con datos
        nuevos. La capa cloud institucionaliza la solución sin cambiar ninguna pieza.
      </p>
    </section>
  );
}
