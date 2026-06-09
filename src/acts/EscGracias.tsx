import { useRef } from "react";
import { useEntrance } from "../lib/anim";

// Escena final · Gracias + puerta a las preguntas y al cuadro de mando.
const DASHBOARD_URL = "https://samtho.github.io/panoplia-dashboard/";

export default function EscGracias() {
  const root = useRef<HTMLElement>(null);
  useEntrance(root);

  return (
    <section ref={root} className="h-full w-full flex flex-col items-center justify-center text-center px-6">
      <h2 data-a className="act-giant">Gracias<span className="text-spark">.</span></h2>
      <p data-a className="mt-6 text-xl text-ivory-dim">Preguntas del tribunal · estamos listos.</p>

      <div data-a className="mt-12 rounded-2xl border border-hairline bg-stage-soft px-8 py-6 max-w-xl">
        <p className="text-sm text-faint mb-2">Toda la evidencia, navegable e interactiva:</p>
        <a href={DASHBOARD_URL} target="_blank" rel="noreferrer" className="font-display text-2xl font-semibold text-spark hover:underline">
          {DASHBOARD_URL.replace("https://", "")}
        </a>
        <p className="text-xs text-faint mt-3">
          cuadro de mando · vista Power BI · anexos técnicos con el código de los modelos
        </p>
      </div>

      <div data-a className="colofon mt-10 max-w-xl text-sm text-ivory-dim leading-relaxed">
        <span className="text-faint not-italic text-[10px] tracking-[0.25em] uppercase block mb-2">Colofón</span>
        Esta defensa se compuso con 372.979 líneas de factura reales, 99.985 títulos y 722 clientes,
        y se terminó de contar ante el tribunal de INESDI en junio de 2026.
      </div>
      <p data-a className="mt-6 text-sm text-faint">Grupo 4 · Máster en Business Analytics e IA</p>
    </section>
  );
}
