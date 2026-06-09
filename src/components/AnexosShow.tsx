import { useEffect, useMemo, useState } from "react";
import EChart from "./EChart";
import { cubo, cuboMes } from "../data/cubo";
import { mensualPremiumOption, generosPremiumOption, donutPremiumOption, aniosPremiumOption } from "../charts/anexo";

// El ala de Anexos: lo que se abre cuando el tribunal pregunta "¿y esto cómo está hecho?".
// Dos salas: El taller (cómo se construyó el dato, visual) y El cuadro de mando (interactivo).

const GEN: Record<number, string> = {
  1: "Arte y Humanidades", 2: "Autoayuda", 3: "Ciencia y Tecnología", 4: "Ciencias Sociales",
  5: "Historia y Pensamiento", 6: "Infantil y Juvenil", 7: "Literatura", 8: "Poesía y Teatro", 9: "Religión y Espiritualidad",
};
const ANIOS = [2021, 2022, 2023, 2024, 2025, 2026];

// ---------- Sala 1 · El taller ----------
function Taller() {
  const PASOS = [
    { n: "I", titulo: "Llegó una caja de Excel", dato: "10 hojas", det: "clientes, formas de pago, códigos de libros, proveedores, editoriales, facturas y albaranes. Sin modelo, sin catálogo de referencia." },
    { n: "II", titulo: "Python lo puso en limpio", dato: "372.979", det: "líneas de factura normalizadas con pandas: fechas, identificadores, géneros y mercados consistentes. Cada paso, en notebooks reproducibles." },
    { n: "III", titulo: "Apareció el catálogo real", dato: "13×", det: "el Excel decía ≈7.479 referencias; la facturación demostró 99.985 títulos únicos. El catálogo real era trece veces el que se gestionaba." },
    { n: "IV", titulo: "Lo ordenamos en estrella", dato: "1 + 6", det: "una tabla de hechos (cada línea de factura) rodeada de dimensiones: cliente, libro, fecha, género, editorial. PostgreSQL, consultable." },
    { n: "V", titulo: "Y lo pusimos a competir", dato: "8 modelos", det: "regresión, árboles, bagging, boosting y red neuronal sobre el mismo problema. Gana gradient boosting (AUC 0,645), validación ciega 80/20." },
  ];
  return (
    <div className="max-w-5xl mx-auto">
      <p className="text-ivory-dim text-lg leading-relaxed max-w-3xl">
        Detrás de cada cifra de la historia hay un taller. Este es el viaje del dato, en cinco actos:
      </p>
      <div className="mt-8 space-y-4">
        {PASOS.map((p) => (
          <div key={p.n} className="grid grid-cols-[64px_180px_1fr] md:grid-cols-[80px_220px_1fr] gap-5 items-center rounded-2xl border border-hairline bg-stage-soft px-6 py-5">
            <div className="font-display text-3xl font-bold text-faint">{p.n}</div>
            <div className="font-display text-4xl md:text-5xl font-semibold text-spark whitespace-nowrap">{p.dato}</div>
            <div>
              <div className="font-semibold text-ivory">{p.titulo}</div>
              <div className="text-sm text-ivory-dim leading-snug mt-1">{p.det}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-2xl border border-ember/30 bg-ember/5 px-6 py-4 text-sm text-ivory-dim">
        <strong className="text-ember">La cicatriz que encontramos:</strong> el 75% de las líneas no registra coste.
        No la maquillamos: la convertimos en el primer pilar de la propuesta de gobernanza del dato.
      </div>
      <p className="mt-5 text-xs text-faint">
        El código completo (limpieza, modelos, benchmark) está en los Anexos técnicos del cuadro de mando 1.0 y en el Anexo C del documento.
      </p>
    </div>
  );
}

// ---------- Sala 2 · El cuadro de mando interactivo ----------
function Cuadro() {
  const [anios, setAnios] = useState<Set<number>>(new Set());
  const [zona, setZona] = useState<"todos" | "esp" | "exp">("todos");
  const toggleAnio = (a: number) => setAnios((s) => { const n = new Set(s); if (n.has(a)) n.delete(a); else n.add(a); return n; });

  const f = useMemo(() => cubo.filter((r) =>
    (!anios.size || anios.has(r.a)) &&
    (zona === "todos" || (zona === "esp" ? r.p === "ES" : r.p !== "ES"))), [anios, zona]);
  const fMes = useMemo(() => cuboMes.filter((r) =>
    (!anios.size || anios.has(Number(r.m.slice(0, 4)))) &&
    (zona === "todos" || (zona === "esp" ? r.p === "ES" : r.p !== "ES"))), [anios, zona]);

  const ventas = f.reduce((s, r) => s + r.v, 0);
  const unidades = f.reduce((s, r) => s + r.u, 0);
  const esp = f.filter((r) => r.p === "ES").reduce((s, r) => s + r.v, 0);

  const mensual = useMemo(() => {
    const m: Record<string, number> = {};
    fMes.forEach((r) => (m[r.m] = (m[r.m] || 0) + r.v));
    return mensualPremiumOption(Object.keys(m).sort().map((k) => ({ mes: k, v: m[k] })));
  }, [fMes]);
  const generos = useMemo(() => {
    const m: Record<number, number> = {};
    f.forEach((r) => (m[r.g] = (m[r.g] || 0) + r.v));
    return generosPremiumOption(Object.keys(m).map((g) => ({ nombre: GEN[Number(g)], v: m[Number(g)] })).sort((a, b) => b.v - a.v));
  }, [f]);
  const porAnio = useMemo(() => {
    const m: Record<number, number> = {};
    f.forEach((r) => (m[r.a] = (m[r.a] || 0) + r.v));
    return aniosPremiumOption(ANIOS.filter((a) => m[a]).map((a) => ({ anio: String(a), v: m[a] })));
  }, [f]);
  const donut = useMemo(() => donutPremiumOption(esp, ventas - esp), [esp, ventas]);

  const Chip = ({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-sm border transition-colors ${on ? "bg-spark text-stage border-spark font-semibold" : "border-hairline text-ivory-dim hover:border-spark hover:text-spark"}`}>
      {children}
    </button>
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="text-xs text-faint mr-1">Años:</span>
        {ANIOS.map((a) => <Chip key={a} on={anios.has(a)} onClick={() => toggleAnio(a)}>{a}</Chip>)}
        <span className="text-xs text-faint ml-4 mr-1">Zona:</span>
        <Chip on={zona === "todos"} onClick={() => setZona("todos")}>Todo</Chip>
        <Chip on={zona === "esp"} onClick={() => setZona("esp")}>España</Chip>
        <Chip on={zona === "exp"} onClick={() => setZona("exp")}>Exportación</Chip>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {[
          { v: `${(ventas / 1e6).toFixed(2).replace(".", ",")} M€`, l: "Ventas netas" },
          { v: unidades.toLocaleString("es-ES"), l: "Unidades" },
          { v: ventas ? `${((100 * (ventas - esp)) / ventas).toFixed(1).replace(".", ",")}%` : "0%", l: "Peso de la exportación" },
          { v: unidades ? `${(ventas / unidades).toFixed(2).replace(".", ",")} €` : "0", l: "Precio medio por unidad" },
        ].map((k) => (
          <div key={k.l} className="rounded-2xl border border-hairline bg-stage-soft px-5 py-4">
            <div className="font-display text-3xl font-semibold text-ivory">{k.v}</div>
            <div className="text-xs text-faint mt-1">{k.l}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-3 rounded-2xl border border-hairline bg-stage-soft p-4">
          <h4 className="font-display font-semibold text-ivory mb-1">El pulso mes a mes <span className="text-faint text-xs font-sans">(arrastra el carril inferior para hacer zoom)</span></h4>
          <EChart option={mensual} height={250} />
        </div>
        <div className="rounded-2xl border border-hairline bg-stage-soft p-4 lg:col-span-2">
          <h4 className="font-display font-semibold text-ivory mb-1">Ventas por género</h4>
          <EChart option={generos} height={290} />
        </div>
        <div className="rounded-2xl border border-hairline bg-stage-soft p-4">
          <h4 className="font-display font-semibold text-ivory mb-1">España vs exportación</h4>
          <EChart option={donut} height={150} />
          <h4 className="font-display font-semibold text-ivory mb-1 mt-3">Por año</h4>
          <EChart option={porAnio} height={120} />
        </div>
      </div>
      <p className="text-xs text-faint mt-4">
        Cubo real (año × género × mercado) calculado del histórico completo. Todo se recalcula al filtrar: misma evidencia que el documento, en vivo.
      </p>
    </div>
  );
}

// ---------- El ala completa ----------
export default function AnexosShow({ onClose }: { onClose: () => void }) {
  const [sala, setSala] = useState<"taller" | "cuadro">("taller");
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" || e.key.toLowerCase() === "a") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[95] bg-stage overflow-y-auto">
      <header className="sticky top-0 z-10 bg-stage/95 backdrop-blur border-b border-hairline">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-display font-semibold text-lg">Anexos<span className="text-spark">.</span></span>
            <nav className="flex gap-1">
              {([["taller", "El taller del dato"], ["cuadro", "El cuadro de mando"]] as const).map(([k, label]) => (
                <button key={k} onClick={() => setSala(k)}
                  className={`px-4 py-1.5 text-sm rounded-full transition-colors ${sala === k ? "bg-spark text-stage font-semibold" : "text-ivory-dim hover:text-spark"}`}>
                  {label}
                </button>
              ))}
            </nav>
          </div>
          <button onClick={onClose} className="text-sm text-faint hover:text-spark transition-colors">← volver a la historia (Esc)</button>
        </div>
      </header>
      <main className="px-6 py-10">
        {sala === "taller" ? <Taller /> : <Cuadro />}
      </main>
    </div>
  );
}
