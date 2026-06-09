import { useRef } from "react";
import { useEntrance } from "../lib/anim";

// Tarjeta de capítulo, como en una novela: letra capitular iluminada + relevo de presentador.
export default function CardCapitulo({
  num, titulo, frase, presenta, color,
}: {
  num: string; titulo: string; frase: string; presenta: string; color: string;
}) {
  const root = useRef<HTMLElement>(null);
  useEntrance(root);
  const inicial = titulo.charAt(0);
  const resto = titulo.slice(1);

  return (
    <section ref={root} className="h-full w-full flex flex-col items-center justify-center text-center px-6">
      <p data-a className="text-sm tracking-[0.3em] uppercase text-faint mb-8">Capítulo {num}</p>
      <h2 data-a className="font-display font-semibold leading-[0.95] max-w-4xl" style={{ fontSize: "clamp(2.6rem, 7vw, 6rem)" }}>
        <span style={{ color, display: "inline-block", fontSize: "1.35em", lineHeight: 0.8, fontWeight: 700 }}>
          {inicial}
        </span>
        {resto}
      </h2>
      <p data-a className="mt-7 text-lg text-ivory-dim max-w-2xl font-display italic">{frase}</p>
      <div data-a className="mt-12 flex items-center gap-3">
        <span className="h-9 px-3 rounded-full grid place-items-center text-sm font-bold text-stage" style={{ background: color }}>
          {presenta.split("·")[0].trim()}
        </span>
        <span className="text-sm text-faint">lee este capítulo · {presenta.split("·")[1]?.trim()}</span>
      </div>
    </section>
  );
}
