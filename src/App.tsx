import { useEffect, useMemo, useRef, useState } from "react";
import { useTheatre } from "./lib/theatre";
import ParticleField from "./lib/ParticleField";
import AnexosShow from "./components/AnexosShow";
import { ESCENAS, CAPITULOS, PRESENTERS, MIN_TOTALES } from "./acts";
import { NOTAS } from "./acts/notes";

// Cortina de entrada del teatro.
function Preloader() {
  const [gone, setGone] = useState(false);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setHidden(true); return; }
    const t1 = setTimeout(() => setGone(true), 1300);
    const t2 = setTimeout(() => setHidden(true), 2100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  if (hidden) return null;
  return (
    <div className={`fixed inset-0 z-[100] bg-stage flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] ${gone ? "-translate-y-full" : ""}`} aria-hidden="true">
      <div className="text-center">
        <div className="font-display text-5xl md:text-6xl font-semibold">Panoplia<span className="text-spark">.</span></div>
        <div className="mt-2 text-sm tracking-[0.3em] uppercase text-faint">La defensa</div>
        <div className="mt-6 h-px w-48 mx-auto bg-hairline overflow-hidden">
          <div className="h-full bg-spark animate-[bar_1.3s_ease-out_forwards]" style={{ width: 0 }} />
        </div>
        <style>{`@keyframes bar { to { width: 100%; } }`}</style>
      </div>
    </div>
  );
}

// Índice (Esc): el guion completo agrupado por capítulo, con presentador y minutos.
function Indice({ esc, onJump, onClose }: { esc: number; onJump: (n: number) => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[90] bg-stage/96 backdrop-blur-sm overflow-y-auto" onClick={onClose}>
      <div className="max-w-2xl mx-auto px-8 py-14" onClick={(e) => e.stopPropagation()}>
        <p className="act-kicker mb-1">El guion · {MIN_TOTALES} minutos · 5 voces</p>
        {CAPITULOS.map((c, ci) => {
          const escenas = ESCENAS.map((e, i) => ({ ...e, i })).filter((e) => e.cap === ci && !e.id.startsWith("cap"));
          if (!escenas.length) return null;
          const min = ESCENAS.filter((e) => e.cap === ci).reduce((s, e) => s + e.min, 0);
          return (
            <div key={ci} className="mt-6">
              <div className="flex items-baseline gap-3 mb-1.5">
                <span className="font-display text-lg font-semibold" style={{ color: c.color }}>{c.num} · {c.titulo}</span>
                <span className="text-[11px] text-faint">≈{min.toFixed(1).replace(".", ",")} min</span>
              </div>
              {escenas.map((e) => (
                <button key={e.id} onClick={() => { onJump(e.i); onClose(); }}
                  className={`flex items-baseline gap-2 w-full text-left py-1.5 ${e.i === esc ? "text-spark" : "text-ivory hover:text-spark"}`}>
                  <span className="font-display text-xl font-semibold transition-colors">{e.label}</span>
                  <span className="toc-leader" aria-hidden="true" />
                  <span className="h-5 px-1.5 rounded bg-stage-soft border border-hairline text-[10px] font-bold text-ivory-dim grid place-items-center self-center">
                    {PRESENTERS[e.pres].ini}
                  </span>
                  <span className="text-faint text-xs tabular-nums w-14 text-right">pág. {e.i + 1}</span>
                </button>
              ))}
            </div>
          );
        })}
        <p className="mt-10 text-xs text-faint">Esc cierra · ←/→ navegar · T cronómetro de ensayo · números saltan de escena</p>
      </div>
    </div>
  );
}

export default function App() {
  const [anexosOpen, setAnexosOpen] = useState(false);
  const [orador, setOrador] = useState(false);
  const { act: esc, go, next, prev, indexOpen, setIndexOpen } = useTheatre(ESCENAS.length, anexosOpen);
  const escena = ESCENAS[esc];
  const cap = CAPITULOS[escena.cap];
  const pres = PRESENTERS[escena.pres];
  const Current = escena.Comp;

  // Cronómetro de ensayo (T): arranca con el primer avance.
  const [showTimer, setShowTimer] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const t0 = useRef<number | null>(null);
  useEffect(() => {
    if (esc > 0 && t0.current === null) t0.current = Date.now();
  }, [esc]);
  useEffect(() => {
    const id = setInterval(() => { if (t0.current) setElapsed(Math.floor((Date.now() - t0.current) / 1000)); }, 1000);
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "t") setShowTimer((v) => !v);
      if (e.key.toLowerCase() === "a") setAnexosOpen((v) => !v);
      if (e.key.toLowerCase() === "n") setOrador((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => { clearInterval(id); window.removeEventListener("keydown", onKey); };
  }, []);
  const mmss = `${String(Math.floor(elapsed / 60)).padStart(2, "0")}:${String(elapsed % 60).padStart(2, "0")}`;

  // minuto sugerido acumulado hasta la escena actual (para comparar en ensayo)
  const minSugerido = useMemo(() => ESCENAS.slice(0, esc).reduce((s, e) => s + e.min, 0), [esc]);

  return (
    <div className="stage-grain fixed inset-0 overflow-hidden select-none bg-stage">
      <Preloader />

      {/* atmósfera del capítulo (tinte de luz que cambia con la historia) */}
      <div
        className="absolute inset-0 transition-[background] duration-1000 pointer-events-none"
        style={{ background: `radial-gradient(75% 90% at 50% 110%, ${cap.color}14, transparent 70%)` }}
        aria-hidden="true"
      />

      {/* las partículas: el hilo conductor (las ventas de Panoplia) */}
      <ParticleField layout={escena.field ?? "hidden"} />

      {/* cinta marcapáginas: baja a medida que avanza la lectura */}
      <div className="bookmark hidden md:block" style={{ height: `${36 + ((esc + 1) / ESCENAS.length) * 110}px` }} aria-hidden="true" />

      {/* progreso con marcas de capítulo */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[70] bg-hairline/50">
        <div className="h-full transition-[width] duration-700 ease-out" style={{ width: `${((esc + 1) / ESCENAS.length) * 100}%`, background: cap.color }} />
        {CAPITULOS.map((_, ci) => {
          const first = ESCENAS.findIndex((e) => e.cap === ci);
          if (first <= 0) return null;
          return <span key={ci} className="absolute top-0 h-full w-px bg-stage" style={{ left: `${(first / ESCENAS.length) * 100}%` }} />;
        })}
      </div>

      <header className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-6 md:px-10 h-16 pointer-events-none">
        <span className="font-display font-semibold text-lg">
          Panoplia<span className="text-spark">.</span>
          <span className="text-faint font-sans text-xs ml-2 tracking-[0.25em] uppercase hidden sm:inline">{cap.num !== "·" ? `Cap. ${cap.num} · ` : ""}{cap.titulo}</span>
        </span>
        <div className="flex items-center gap-4 pointer-events-auto">
          {showTimer && (
            <span className="text-xs tabular-nums text-faint">
              <span className="text-ivory font-semibold">{mmss}</span> · plan {minSugerido.toFixed(1).replace(".", ",")}′
            </span>
          )}
          {orador && <span className="text-[11px] text-spark font-semibold tracking-wide">● modo orador</span>}
          <button onClick={() => setAnexosOpen(true)} className="text-sm text-faint hover:text-spark transition-colors">
            anexos
          </button>
          <button onClick={() => setIndexOpen(true)} className="text-sm text-faint hover:text-spark transition-colors tabular-nums">
            pág. {esc + 1} de {ESCENAS.length} · índice
          </button>
        </div>
      </header>

      {/* la escena (remount = coreografía de entrada) */}
      <main key={esc} className="absolute inset-0 z-10">
        <Current />
      </main>

      {/* zonas de click en los bordes */}
      <button aria-label="Anterior" onClick={prev} className="fixed left-0 top-16 bottom-16 w-12 z-[50] opacity-0" />
      <button aria-label="Siguiente" onClick={next} className="fixed right-0 top-16 bottom-16 w-12 z-[50] opacity-0" />

      {/* HUD del presentador */}
      <footer className="fixed bottom-0 left-0 right-0 z-[60] flex items-center justify-between px-6 md:px-10 h-14 pointer-events-none">
        <div key={escena.pres} className="flex items-center gap-2.5 jury-pop">
          <span className="h-8 px-2.5 rounded-full grid place-items-center text-xs font-bold text-stage" style={{ background: cap.color }}>
            {pres.ini}
          </span>
          <span className="text-sm text-ivory-dim">{pres.nombre}</span>
        </div>
        <span className="text-[11px] text-faint hidden md:inline">← → pasar página · Esc índice · A anexos · N notas de orador · T ensayo</span>
      </footer>

      {orador && NOTAS[escena.id] && (
        <div className="fixed bottom-14 left-0 right-0 z-[65] px-6 md:px-10">
          <div className="mx-auto max-w-4xl rounded-t-2xl border border-hairline border-b-0 bg-stage-soft/95 backdrop-blur px-6 py-4">
            <div className="flex items-start gap-3">
              <span className="text-[10px] uppercase tracking-[0.2em] text-spark font-semibold mt-1 shrink-0">Decir</span>
              <p className="text-sm text-ivory leading-relaxed">{NOTAS[escena.id].decir}</p>
            </div>
            {NOTAS[escena.id].q && (
              <div className="flex items-start gap-3 mt-3 pt-3 border-t border-hairline">
                <span className="text-[10px] uppercase tracking-[0.2em] text-ember font-semibold mt-1 shrink-0">Si&nbsp;preguntan</span>
                <p className="text-sm text-ivory-dim leading-relaxed">
                  <span className="text-ember font-semibold">{NOTAS[escena.id].by}:</span> "{NOTAS[escena.id].q}" → {NOTAS[escena.id].a}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      {indexOpen && <Indice esc={esc} onJump={go} onClose={() => setIndexOpen(false)} />}
      {anexosOpen && <AnexosShow onClose={() => setAnexosOpen(false)} />}
    </div>
  );
}
