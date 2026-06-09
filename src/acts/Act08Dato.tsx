import { useRef } from "react";
import { useEntrance } from "../lib/anim";

// Acto 8 · El dato a oscuras: una rejilla de 100 celdas donde solo 25 tienen luz.
// (75% de las líneas de factura no registran coste: sin coste no hay margen real.)
const PILARES = [
  "Coste en cada línea de factura",
  "Un modelo único (Excel → PostgreSQL)",
  "Responsable y diccionario del dato",
  "Pipeline reproducible",
  "Indicadores de salud del dato",
];

export default function Act08Dato() {
  const root = useRef<HTMLElement>(null);
  // las celdas "apagadas" se apagan en oleada tras la entrada
  useEntrance(root, (tl) => {
    tl.to(".cell-off", {
      opacity: 0.06,
      duration: 0.022,
      stagger: { each: 0.022, from: "random" },
      ease: "none",
    }, "+=0.4");
  });

  // 100 celdas; las 25 "con coste" repartidas de forma determinista
  const lit = new Set<number>();
  let s = 7;
  while (lit.size < 25) { s = (s * 16807) % 2147483647; lit.add(s % 100); }

  return (
    <section ref={root} className="h-full w-full flex items-center px-6 md:px-14">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
        <div>
          <p data-a className="act-kicker mb-4">Acto 8 · ¿Se puede confiar en el dato?</p>
          <h2 data-a className="font-display text-5xl md:text-7xl font-semibold leading-[0.98]">
            El <span className="text-blood">75%</span> del dato está a oscuras.
          </h2>
          <p data-a className="mt-6 text-ivory-dim text-lg leading-relaxed max-w-lg">
            Tres de cada cuatro líneas de factura <strong className="text-ivory">no registran el coste</strong>:
            sin coste no hay margen real, y sin margen real no hay decisiones fiables. Es el problema
            que sostiene a todos los demás.
          </p>
          <div data-a className="mt-8">
            <p className="text-sm font-semibold text-spark mb-3">El marco que lo reenciende (5 pilares):</p>
            <ul className="space-y-1.5">
              {PILARES.map((p, i) => (
                <li key={p} className="text-ivory-dim text-sm flex items-center gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-spark/15 text-spark grid place-items-center text-[10px] font-bold shrink-0">{i + 1}</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div data-a className="grid grid-cols-10 gap-1.5 max-w-md mx-auto w-full" aria-hidden="true">
          {Array.from({ length: 100 }, (_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-[3px] ${lit.has(i) ? "bg-spark" : "cell-off bg-ivory-dim/40"}`}
            />
          ))}
          <p className="col-span-10 text-center text-xs text-faint mt-3">
            100 líneas de factura: solo <span className="text-spark font-semibold">25 con coste registrado</span>
          </p>
        </div>
      </div>
    </section>
  );
}
