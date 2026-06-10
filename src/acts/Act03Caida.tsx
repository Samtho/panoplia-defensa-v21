import { useRef } from "react";
import EChart from "../components/EChart";
import { useEntrance, Count } from "../lib/anim";
import { caidaOption } from "../charts/stage";

// Acto 3 · El problema no es solo dónde vende: es que vende cada vez menos.
export default function Act03Caida() {
  const root = useRef<HTMLElement>(null);
  useEntrance(root);

  return (
    <section ref={root} className="relative h-full w-full flex items-center px-6 md:px-14 overflow-hidden">
      {/* páginas que se desprenden del libro (las ventas que se van) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {Array.from({ length: 14 }, (_, i) => (
          <span key={i} className="page-fall" style={{
            left: `${(i * 7.3 + 4) % 96}%`,
            animationDelay: `${(i * 0.9) % 7}s`,
            animationDuration: `${7 + (i % 5) * 1.6}s`,
            width: `${10 + (i % 3) * 4}px`,
            height: `${14 + (i % 4) * 5}px`,
          }} />
        ))}
      </div>
      <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10 items-center w-full max-w-7xl mx-auto">
        <div>
          <p data-a className="act-kicker mb-4">Acto 3 · ¿Lo está haciendo bien?</p>
          <h2 data-a className="font-display text-4xl md:text-6xl font-semibold leading-[1.02]">
            Cae un <span className="text-blood">18,3%</span> mientras el sector sube.
          </h2>
          <p data-a className="mt-6 text-ivory-dim text-lg leading-relaxed max-w-lg">
            Del pico de <strong className="text-ivory">3,28 M€ en 2022</strong> a{" "}
            <strong className="text-ivory">2,68 M€ en 2025</strong>. En el mismo periodo, el mercado
            editorial español creció un <strong className="text-leaf">6,3%</strong>: Panoplia pierde
            cuota, no mercado.
          </p>
          <div data-a className="mt-8 flex gap-10">
            <div>
              <div className="font-display text-5xl font-semibold text-blood">
                <Count to={-18.3} decimals={1} suffix="%" duration={1.8} delay={0.7} />
              </div>
              <div className="text-xs text-faint mt-1">acumulado desde el pico (2022-2025)</div>
            </div>
            <div>
              <div className="font-display text-5xl font-semibold text-blood">
                <Count to={-13.3} decimals={1} suffix="%" duration={1.8} delay={0.9} />
              </div>
              <div className="text-xs text-faint mt-1">solo en 2025: se acelera</div>
            </div>
          </div>
        </div>
        <div data-a className="rounded-2xl border border-hairline bg-stage-soft p-4">
          <EChart option={caidaOption()} height={440} />
        </div>
      </div>
    </section>
  );
}
