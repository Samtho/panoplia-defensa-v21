import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import EChart from "../components/EChart";
import { useEntrance, Count } from "../lib/anim";
import { mapaOption } from "../charts/stage";

// Acto 2 · ¿A dónde va el dinero? Mapa full-bleed con los flujos reales de exportación.
export default function Act02Mapa() {
  const root = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  useEntrance(root);

  useEffect(() => {
    // El geojson es pesado: se registra bajo demanda y solo una vez.
    if (echarts.getMap("world")) {
      setReady(true);
      return;
    }
    import("../data/world.json").then((mod) => {
      echarts.registerMap("world", (mod.default ?? mod) as never);
      setReady(true);
    });
  }, []);

  return (
    <section ref={root} className="relative h-full w-full">
      {ready && <EChart option={mapaOption()} height="100%" className="absolute inset-0" />}

      {/* Panel de lectura sobre el mapa */}
      <div className="absolute left-6 md:left-14 top-1/2 -translate-y-1/2 max-w-md pointer-events-none">
        <p data-a className="act-kicker mb-4">Acto 2 · ¿A dónde va el dinero?</p>
        <h2 data-a className="font-display text-4xl md:text-6xl font-semibold leading-[1.02]">
          La exportación es, en realidad, México.
        </h2>
        <p data-a className="mt-6 text-ivory-dim text-lg leading-relaxed">
          De los <strong className="text-ivory">1,26 M€</strong> exportados,{" "}
          <strong className="text-spark">México concentra el 77%</strong> (969.603 €). Los otros once
          mercados son hilos finos: la diversificación aún no existe.
        </p>
        <div data-a className="mt-8 flex flex-col gap-2.5 items-start">
          <span className="sello text-spark" style={{ transform: "rotate(-2.5deg)" }}>México · 77% de la exportación</span>
          <span className="sello text-ivory-dim" style={{ transform: "rotate(1.5deg)" }}>Perú · 0,87% del total</span>
          <span className="sello text-faint" style={{ transform: "rotate(-1deg)" }}>Alemania 0,32 · Chile 0,27 · y 7 más</span>
        </div>
        <div data-a className="mt-7 flex gap-10">
          <div>
            <div className="font-display text-4xl font-semibold text-spark"><Count to={12} duration={1.2} delay={0.6} /></div>
            <div className="text-xs text-faint mt-1">mercados activos</div>
          </div>
          <div>
            <div className="font-display text-4xl font-semibold text-spark"><Count to={8.14} decimals={2} suffix="%" duration={1.6} delay={0.8} /></div>
            <div className="text-xs text-faint mt-1">del negocio sale de España</div>
          </div>
        </div>
      </div>
    </section>
  );
}
