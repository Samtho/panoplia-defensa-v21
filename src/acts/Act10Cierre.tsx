import { useRef } from "react";
import { useEntrance } from "../lib/anim";

// Escena · La tesis: detrás, las partículas (las ventas) forman la flecha que sube
// del rojo (la caída) al turquesa (el plan).
export default function Act10Cierre() {
  const root = useRef<HTMLElement>(null);
  useEntrance(root);

  return (
    <section ref={root} className="h-full w-full flex flex-col items-center justify-center text-center px-6">
      <p data-a className="act-kicker mb-8">Cierre · La tesis</p>
      <h2 data-a className="act-title max-w-5xl">
        De <span className="text-blood">decirse exportadora</span><br />
        a <span className="text-spark">serlo de verdad</span>.
      </h2>
      <p data-a className="mt-8 text-lg md:text-xl text-ivory-dim max-w-3xl leading-relaxed">
        Con sus propios datos, herramientas abiertas y sin inversión externa: un diagnóstico honesto,
        una matriz para decidir, un modelo que se explica y una hoja de ruta que ya está en marcha.
      </p>
      <p data-a className="mt-12 text-sm text-faint">
        Las partículas del fondo son las mismas del principio: las ventas de Panoplia, ahora apuntando hacia arriba.
      </p>
    </section>
  );
}
