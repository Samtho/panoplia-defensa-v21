import { useRef } from "react";
import { useEntrance } from "../lib/anim";

// Escena 1 · Portada: cada partícula del fondo es venta real. La historia empieza dispersa.
export default function EscPortada() {
  const root = useRef<HTMLElement>(null);
  useEntrance(root);

  return (
    <section ref={root} className="relative h-full w-full flex flex-col items-center justify-center text-center px-6">
      <p data-a className="act-kicker mb-6">Defensa del TFM · Business Analytics e IA · INESDI</p>
      <h1 data-a className="act-title max-w-5xl" style={{ fontSize: "clamp(2.8rem, 8vw, 7.5rem)" }}>
        372.979 líneas de factura.<br />
        <span className="text-spark">Una historia que nadie había leído.</span>
      </h1>
      <p data-a className="mt-8 text-lg md:text-xl text-ivory-dim max-w-2xl leading-relaxed">
        Cada punto que flota en esta pantalla es venta real de <strong className="text-ivory">Panoplia de
        Libros</strong>. Durante 20 minutos vamos a ordenarlos hasta que cuenten lo que la empresa no sabía de sí misma.
      </p>
      <p data-a className="mt-12 text-sm text-faint">Grupo 4 · cinco voces, una historia · pulsa →</p>
    </section>
  );
}
