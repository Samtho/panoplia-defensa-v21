import { useRef } from "react";
import { useEntrance } from "../lib/anim";

// Escena · Lo que nos llevamos (take-aways) y lo que haríamos después (next steps).
// Aldo lo pidió explícitamente: "los take away que se llevan de esto... next steps".
// Y es lo que Fran valora en la defensa: hipótesis, resultados y conclusiones.
const APRENDIZAJES = [
  { t: "El problema, antes que el modelo", d: "Sin una buena definición y datos de calidad, ningún algoritmo sirve. El 75% de líneas sin coste nos lo recordó en cada paso." },
  { t: "El valor está en la decisión, no en el AUC", d: "Un modelo del montón (0,64) se vuelve útil cuando lo conviertes en tres formas de decidir según el objetivo." },
  { t: "Sin inversión externa", d: "Una distribuidora puede competir con sus propios datos y herramientas abiertas. El método lo puso el máster; el problema, Panoplia." },
];
const PROXIMOS = [
  { t: "Registrar el coste por línea", d: "Es la palanca nº1: desbloquea el margen real y la mitad de los análisis que hoy no se pueden cerrar." },
  { t: "Reentrenar con coste y devoluciones", d: "Con esas variables nuevas, el modelo puede superar el techo de 0,64 que hoy reconocemos con honestidad." },
  { t: "Industrializar en Azure", d: "Desplegar la arquitectura y nombrar un responsable del dato: que el marco sobreviva al TFM." },
];

export default function EscAprendizajes() {
  const root = useRef<HTMLElement>(null);
  useEntrance(root);

  return (
    <section ref={root} className="h-full w-full flex flex-col items-center justify-center px-6 md:px-14">
      <p data-a className="act-kicker mb-3">Cierre · Lo que nos llevamos</p>
      <h2 data-a className="font-display text-4xl md:text-5xl font-semibold text-center leading-[1.05] max-w-4xl">
        Tres aprendizajes, <span className="text-spark">tres próximos pasos.</span>
      </h2>

      <div className="mt-10 grid lg:grid-cols-2 gap-6 w-full max-w-6xl">
        <div data-a className="rounded-2xl border border-hairline bg-stage-soft p-7">
          <h3 className="font-display text-xl font-semibold text-ivory mb-5 flex items-center gap-2">
            <span className="text-spark">✦</span> Lo que aprendimos
          </h3>
          <ul className="space-y-4">
            {APRENDIZAJES.map((a, i) => (
              <li key={i} className="flex gap-3">
                <span className="font-display text-2xl font-semibold text-faint shrink-0 w-7">{i + 1}</span>
                <div>
                  <div className="font-semibold text-ivory">{a.t}</div>
                  <div className="text-sm text-ivory-dim leading-snug mt-0.5">{a.d}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div data-a className="rounded-2xl border border-spark/25 bg-spark/[0.04] p-7">
          <h3 className="font-display text-xl font-semibold text-ivory mb-5 flex items-center gap-2">
            <span className="text-spark">→</span> Qué haríamos después
          </h3>
          <ul className="space-y-4">
            {PROXIMOS.map((a, i) => (
              <li key={i} className="flex gap-3">
                <span className="font-display text-2xl font-semibold text-spark shrink-0 w-7">{i + 1}</span>
                <div>
                  <div className="font-semibold text-ivory">{a.t}</div>
                  <div className="text-sm text-ivory-dim leading-snug mt-0.5">{a.d}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p data-a className="mt-8 text-sm text-faint max-w-3xl text-center">
        Ingeniería de datos, BI, machine learning y cloud: el método lo dio el máster; lo difícil fue
        convertir 372.979 líneas de factura en una decisión que Panoplia puede tomar mañana.
      </p>
    </section>
  );
}
