import { useRef } from "react";
import EChart from "../components/EChart";
import { useEntrance, Count } from "../lib/anim";
import { benchmarkRaceOption } from "../charts/stage";

// Escena · El torneo de modelos: 8 familias compiten sobre el mismo problema.
export default function Act07Modelo() {
  const root = useRef<HTMLElement>(null);
  useEntrance(root);

  return (
    <section ref={root} className="h-full w-full flex items-center px-6 md:px-14">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-[1fr_1.25fr] gap-10 items-center">
        <div>
          <p data-a className="act-kicker mb-3">Capítulo III · ¿Se puede predecir el éxito de un título?</p>
          <h2 data-a className="font-display text-4xl md:text-6xl font-semibold leading-[1.02]">
            Hicimos competir a <span className="text-spark">8 familias</span> de algoritmos.
          </h2>
          <p data-a className="mt-6 text-ivory-dim text-lg leading-relaxed max-w-lg">
            Mismo problema, mismas reglas, validación ciega: empezamos con XGBoost y ampliamos a un
            torneo completo. Gana el <strong className="text-spark">gradient boosting</strong>, y ninguna
            familia (ni la red neuronal) lo supera.
          </p>
          <div data-a className="mt-8 flex gap-12">
            <div>
              <div className="font-display text-5xl font-semibold text-spark">
                <Count to={0.645} decimals={3} duration={1.6} delay={0.6} />
              </div>
              <div className="text-xs text-faint mt-1">ROC-AUC del ganador (azar = 0,500)</div>
            </div>
            <div>
              <div className="font-display text-5xl font-semibold text-ivory">
                <Count to={112598} duration={1.8} delay={0.8} />
              </div>
              <div className="text-xs text-faint mt-1">pares título-mercado para entrenar</div>
            </div>
          </div>
          <p data-a className="mt-6 text-sm text-faint max-w-lg">
            Honesto: el techo (~0,64) dice que anticipar un título concreto es difícil. El valor está en
            explicar qué mueve la demanda: el precio y el mercado, no el subgénero.
          </p>
        </div>
        <div data-a className="rounded-2xl border border-hairline bg-stage-soft p-4">
          <EChart option={benchmarkRaceOption()} height={380} />
        </div>
      </div>
    </section>
  );
}
