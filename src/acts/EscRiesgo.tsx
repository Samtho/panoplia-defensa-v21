import { useRef } from "react";
import { useEntrance, Count } from "../lib/anim";

// Escena · El dinero que se enfría: la cifra que justifica actuar mañana mismo.
export default function EscRiesgo() {
  const root = useRef<HTMLElement>(null);
  useEntrance(root);

  return (
    <section ref={root} className="h-full w-full flex flex-col items-center justify-center text-center px-6">
      <p data-a className="act-kicker mb-6">Capítulo II · La urgencia</p>
      <div data-a className="act-giant text-blood">
        <Count to={1.04} decimals={2} suffix=" M€" duration={1.8} delay={0.4} />
      </div>
      <h2 data-a className="font-display text-3xl md:text-5xl font-semibold mt-4 max-w-3xl leading-[1.1]">
        se están enfriando en solo <span className="text-blood">44 clientes</span>.
      </h2>
      <p data-a className="mt-7 text-lg text-ivory-dim max-w-2xl leading-relaxed">
        Clientes que compraban mucho y han dejado de hacerlo. Recuperarlos no requiere tecnología
        nueva: requiere <strong className="text-ivory">una lista, un teléfono y un protocolo de retención</strong>.
        Es la primera acción de la hoja de ruta.
      </p>
      <div data-a className="mt-10 flex gap-12">
        <div>
          <div className="font-display text-4xl font-semibold text-ivory">6,8%</div>
          <div className="text-xs text-faint mt-1">de toda la facturación del periodo</div>
        </div>
        <div>
          <div className="font-display text-4xl font-semibold text-ivory">0 €</div>
          <div className="text-xs text-faint mt-1">de inversión necesaria para actuar</div>
        </div>
      </div>
    </section>
  );
}
