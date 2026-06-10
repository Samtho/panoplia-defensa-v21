import { useEffect, useRef } from "react";
import { Deck, MapView, type MapViewState } from "@deck.gl/core";
import { GeoJsonLayer, ArcLayer, ScatterplotLayer } from "@deck.gl/layers";
import { useEntrance, Count, reducedMotion } from "../lib/anim";
import { mercadosReal } from "../data/computed";

// Escena · El mapa del dinero en deck.gl (el motor de visualización geoespacial de Carto):
// arcos 3D desde Madrid con cámara inclinada que respira. Datos reales de exportación.
const GEO: Record<string, [number, number]> = {
  ES: [-3.7038, 40.4168], MX: [-99.1332, 19.4326], PE: [-77.0428, -12.0464],
  DE: [13.405, 52.52], CL: [-70.6693, -33.4489], AU: [151.2093, -33.8688],
  SE: [18.0686, 59.3293], GB: [-0.1278, 51.5074], NI: [-86.2362, 12.1149],
  VE: [-66.9036, 10.4806], BE: [4.3517, 50.8503], PL: [21.0122, 52.2297],
};
const MADRID = GEO.ES;
const SPARK: [number, number, number] = [45, 212, 197];
const IVORY: [number, number, number] = [242, 239, 231];

export default function EscMapaDeck() {
  const root = useRef<HTMLElement>(null);
  const holder = useRef<HTMLDivElement>(null);
  useEntrance(root);

  useEffect(() => {
    const el = holder.current;
    if (!el) return;
    let deck: Deck<MapView> | null = null;
    let raf = 0;
    let disposed = false;

    const exp = mercadosReal.filter((m) => m.iso !== "ES" && GEO[m.iso]);
    const maxV = Math.max(...exp.map((m) => m.ventasEuro));
    const arcs = exp.map((m) => ({
      from: MADRID, to: GEO[m.iso], pais: m.pais, v: m.ventasEuro,
      w: Math.max(0.7, 7 * Math.sqrt(m.ventasEuro / maxV)),
    }));

    import("../data/world.json").then((mod) => {
      if (disposed) return;
      const world = (mod.default ?? mod) as unknown as GeoJSON.FeatureCollection;

      const baseView: MapViewState = { longitude: -42, latitude: 22, zoom: 1.55, pitch: 48, bearing: 0 };
      const t0 = performance.now();

      const layers = (pulse: number) => [
        new GeoJsonLayer({
          id: "world", data: world, stroked: true, filled: true,
          getFillColor: [16, 22, 29, 255], getLineColor: [33, 44, 54, 255], lineWidthMinPixels: 0.5,
        }),
        new ArcLayer({
          id: "flujos", data: arcs, greatCircle: false,
          getSourcePosition: (d: (typeof arcs)[number]) => d.from,
          getTargetPosition: (d: (typeof arcs)[number]) => d.to,
          getSourceColor: [...IVORY, 110] as [number, number, number, number],
          getTargetColor: [...SPARK, 235] as [number, number, number, number],
          getWidth: (d: (typeof arcs)[number]) => d.w * (0.85 + 0.3 * pulse),
          getHeight: 0.42,
          updateTriggers: { getWidth: pulse },
        }),
        new ScatterplotLayer({
          id: "destinos", data: [{ pos: MADRID, v: maxV, esMadrid: true }, ...exp.map((m) => ({ pos: GEO[m.iso], v: m.ventasEuro, esMadrid: false }))],
          getPosition: (d: { pos: [number, number] }) => d.pos,
          getRadius: (d: { v: number; esMadrid: boolean }) => (d.esMadrid ? 90000 : 60000 + 260000 * Math.sqrt(d.v / maxV) * (0.9 + 0.25 * pulse)),
          getFillColor: (d: { esMadrid: boolean }) => (d.esMadrid ? [...IVORY, 230] : [...SPARK, 200]) as [number, number, number, number],
          updateTriggers: { getRadius: pulse },
        }),
      ];

      deck = new Deck({
        parent: el,
        views: new MapView({ repeat: false }),
        initialViewState: baseView,
        controller: false,
        style: { position: "absolute", inset: "0" },
        layers: layers(0.5),
      });

      if (!reducedMotion()) {
        const loop = (now: number) => {
          if (disposed) return;
          const t = (now - t0) / 1000;
          const pulse = 0.5 + 0.5 * Math.sin(t * 2.1);
          deck?.setProps({
            layers: layers(pulse),
            viewState: { ...baseView, bearing: Math.sin(t * 0.16) * 7, latitude: 22 + Math.sin(t * 0.11) * 2 },
          });
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
      }
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      deck?.finalize();
    };
  }, []);

  return (
    <section ref={root} className="relative h-full w-full">
      <div ref={holder} className="absolute inset-0" />

      {/* Panel de lectura sobre el mapa */}
      <div className="absolute left-6 md:left-14 top-1/2 -translate-y-1/2 max-w-md pointer-events-none">
        <p data-a className="act-kicker mb-4">Capítulo I · ¿A dónde va el dinero?</p>
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
      <p data-a className="absolute bottom-14 right-6 text-[10px] text-faint">visualización geoespacial: deck.gl (el motor de Carto)</p>
    </section>
  );
}
