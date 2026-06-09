import { useRef } from "react";
import { useEntrance } from "../lib/anim";
import { operatingPoints } from "../data/operating";

// Escena · Un modelo, tres decisiones: el umbral es una elección de negocio, no técnica.
const TONE: Record<string, { text: string; border: string; bg: string }> = {
  potenciar: { text: "text-leaf", border: "border-leaf/40", bg: "bg-leaf/5" },
  vigilar: { text: "text-ember", border: "border-ember/40", bg: "bg-ember/5" },
  reducir: { text: "text-blood", border: "border-blood/40", bg: "bg-blood/5" },
};

export default function EscDecisiones() {
  const root = useRef<HTMLElement>(null);
  useEntrance(root);

  return (
    <section ref={root} className="h-full w-full flex flex-col items-center justify-center px-6 md:px-14">
      <p data-a className="act-kicker mb-3">Capítulo III · El modelo al servicio del negocio</p>
      <h2 data-a className="font-display text-4xl md:text-6xl font-semibold text-center leading-[1.02] max-w-4xl">
        Un modelo, <span className="text-spark">tres formas de decidir</span>.
      </h2>
      <p data-a className="mt-5 text-ivory-dim text-lg text-center max-w-3xl">
        ¿No perderse ningún superventas o apostar solo a lo seguro? No hay una respuesta correcta:
        hay una <strong className="text-ivory">decisión estratégica</strong>. El mismo modelo sirve a las tres.
      </p>

      <div className="mt-10 grid md:grid-cols-3 gap-5 w-full max-w-5xl">
        {operatingPoints.map((o) => {
          const t = TONE[o.color];
          return (
            <div key={o.key} data-a className={`rounded-2xl border ${t.border} ${t.bg} px-6 py-6 text-center`}>
              <div className={`font-semibold text-lg ${t.text}`}>{o.label}</div>
              <div className="text-xs text-faint mt-1 h-8">{o.objetivo}</div>
              <div className={`font-display text-6xl font-semibold mt-3 ${t.text}`}>{Math.round(o.recall * 100)}%</div>
              <div className="text-xs text-ivory-dim mt-1">de los superventas, capturados</div>
              <div className="mt-4 hairline-t pt-3 flex justify-center gap-7 text-sm">
                <div>
                  <div className={`font-display text-2xl font-semibold ${t.text}`}>{Math.round(o.precision * 100)}%</div>
                  <div className="text-[10px] text-faint">apuestas que aciertan</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-semibold text-ivory">{o.apuestas.toLocaleString("es-ES")}</div>
                  <div className="text-[10px] text-faint">títulos apostados</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p data-a className="mt-7 text-sm text-faint">Sobre 22.520 casos de validación ciega · umbrales 0,27 / 0,32 / 0,48</p>
    </section>
  );
}
