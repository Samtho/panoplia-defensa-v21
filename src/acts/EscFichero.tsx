import { useRef } from "react";
import { useEntrance, Count } from "../lib/anim";

// Escena · El fichero de la biblioteca: 722 fichas de cartón, una por cliente B2B real.
// Pestaña turquesa = Campeón · pestaña roja (sobresale) = En Riesgo · sin pestaña = resto.
function Bloque({ n, cols, tab, dim, label, sub, color }: {
  n: number; cols: number; tab?: string; dim?: boolean; label: string; sub: string; color: string;
}) {
  return (
    <div data-a className="text-center">
      <div className="grid gap-[3px] justify-center" style={{ gridTemplateColumns: `repeat(${cols}, 13px)` }}>
        {Array.from({ length: n }, (_, i) => (
          <span key={i}
            className={`ficha ${tab === "blood" ? "tab-riesgo" : ""} ${dim ? "opacity-30" : ""}`}
            style={{ ["--tab" as string]: tab === "spark" ? "#2dd4c5" : tab === "blood" ? "#e85d4b" : "transparent" }} />
        ))}
      </div>
      <div className="mt-3 font-display text-2xl font-semibold" style={{ color }}>{label}</div>
      <div className="text-xs text-faint mt-0.5 max-w-[200px] mx-auto leading-snug">{sub}</div>
    </div>
  );
}

export default function EscFichero() {
  const root = useRef<HTMLElement>(null);
  useEntrance(root, (tl) => {
    tl.from(".ficha", { opacity: 0, y: 8, duration: 0.25, ease: "power1.out", stagger: { each: 0.0012, from: "start" } }, "-=0.5");
  });

  return (
    <section ref={root} className="h-full w-full flex items-center px-6 md:px-14">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-[1fr_1.4fr] gap-10 items-center">
        <div>
          <p data-a className="act-kicker mb-4">Capítulo II · ¿A qué lectores cuidar?</p>
          <h2 data-a className="font-display text-4xl md:text-6xl font-semibold leading-[1.02]">
            El fichero:<br /><span className="text-spark">722 fichas de cliente.</span>
          </h2>
          <p data-a className="mt-6 text-ivory-dim text-lg leading-relaxed">
            Como en toda biblioteca, cada cliente tiene su ficha, clasificada con RFM: cuán{" "}
            <em>reciente</em> compra, con qué <em>frecuencia</em> y cuánto <em>dinero</em> deja.
            Y el fichero dice dos cosas urgentes:
          </p>
          <div data-a className="mt-7 space-y-3 text-sm">
            <p className="text-ivory"><span className="text-spark font-semibold">El 24% paga el 75%</span>: 175 Campeones sostienen el negocio.</p>
            <p className="text-ivory"><span className="text-blood font-semibold">44 fichas se están enfriando</span>: compraban mucho, ya no →{" "}
              <strong className="text-blood"><Count to={1.04} decimals={2} suffix=" M€" duration={1.4} delay={1.2} /></strong> en juego.</p>
          </div>
        </div>

        <div className="flex items-start justify-center gap-10 flex-wrap">
          <Bloque n={175} cols={11} tab="spark" color="#2dd4c5" label="175 Campeones" sub="24% de los clientes · 75% de las ventas" />
          <Bloque n={44} cols={4} tab="blood" color="#e85d4b" label="44 En Riesgo" sub="1,04 M€ enfriándose · retención urgente" />
          <Bloque n={503} cols={20} dim color="#b8b4a8" label="503 restantes" sub="leales, ocasionales o dormidos" />
        </div>
      </div>
    </section>
  );
}
