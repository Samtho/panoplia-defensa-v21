import { useRef } from "react";
import { useEntrance, Count } from "../lib/anim";

// Acto 1 · El gancho: la empresa se define exportadora; el dato dice otra cosa.
export default function Act01Apertura() {
  const root = useRef<HTMLElement>(null);
  useEntrance(root, (tl) => {
    tl.to(".strike-line", { right: "-2%", duration: 0.55, ease: "power3.inOut" }, "+=0.5")
      .from(".reveal-late", { opacity: 0, y: 30, duration: 0.8, ease: "power3.out", stagger: 0.15 }, "+=0.25");
  });

  return (
    <section ref={root} className="h-full w-full flex flex-col items-center justify-center text-center px-6">
      <p data-a className="act-kicker mb-8">TFM INESDI · Grupo 4 · Panoplia de Libros, S.L.</p>

      <h1 data-a className="act-title relative inline-block max-w-5xl">
        <span className="relative inline-block">
          «Somos exportadores.»
          <span className="strike-line" aria-hidden="true" />
        </span>
      </h1>

      <div className="reveal-late mt-14">
        <div className="act-giant text-spark">
          <Count to={91.86} decimals={2} suffix="%" duration={2} delay={1.6} />
        </div>
        <p className="reveal-late mt-4 text-lg md:text-xl text-ivory-dim max-w-2xl">
          de la facturación es <strong className="text-ivory">España</strong>. Esta es la historia de cómo
          una distribuidora puede pasar de declararse exportadora a serlo de verdad, usando sus propios datos.
        </p>
      </div>

      <p className="reveal-late mt-14 text-sm text-faint">Pulsa → para empezar</p>
    </section>
  );
}
