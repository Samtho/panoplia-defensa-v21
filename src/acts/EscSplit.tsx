import { useRef } from "react";
import { useEntrance } from "../lib/anim";

// Escena · Todo el dinero, repartido a la vista: el campo de partículas (detrás) se divide
// en el bloque España (91,86%) y la columna export (8,14%). Aquí solo van las etiquetas.
export default function EscSplit() {
  const root = useRef<HTMLElement>(null);
  useEntrance(root);

  return (
    <section ref={root} className="relative h-full w-full">
      <div className="absolute top-20 left-0 right-0 text-center px-6">
        <p data-a className="act-kicker mb-3">Capítulo I · La fotografía completa</p>
        <h2 data-a className="font-display text-4xl md:text-5xl font-semibold">
          Cada punto es dinero. <span className="text-blood">Casi todo duerme en la misma cesta.</span>
        </h2>
      </div>

      {/* etiquetas sobre los dos bloques de partículas */}
      <div className="absolute left-[8%] right-[42%] bottom-[12%] pointer-events-none">
        <div data-a>
          <div className="font-display text-5xl md:text-6xl font-semibold text-ivory">91,86%</div>
          <div className="text-sm text-ivory-dim mt-1">España · 14,20 M€ · un solo mercado</div>
        </div>
      </div>
      <div className="absolute left-[68%] bottom-[12%] pointer-events-none">
        <div data-a>
          <div className="font-display text-5xl md:text-6xl font-semibold text-spark">8,14%</div>
          <div className="text-sm text-ivory-dim mt-1">Exportación · 1,26 M€ · once países</div>
        </div>
      </div>

      <p data-a className="absolute bottom-16 left-0 right-0 text-center text-sm text-faint px-6">
        Una contracción del mercado doméstico no tendría con qué compensarse. Esa es la vulnerabilidad que el resto de la historia intenta resolver.
      </p>
    </section>
  );
}
