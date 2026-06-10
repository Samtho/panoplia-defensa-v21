import { createElement, type ComponentType } from "react";
import type { FieldLayout } from "../lib/ParticleField";
import EscPortada from "./EscPortada";
import Act01Apertura from "./Act01Apertura";
import EscEquipo from "./EscEquipo";
import Act03Caida from "./Act03Caida";
import EscMapaDeck from "./EscMapaDeck";
import EscSplit from "./EscSplit";
import EscEstanteria from "./EscEstanteria";
import EscFichero from "./EscFichero";
import EscRiesgo from "./EscRiesgo";
import Act06Matriz from "./Act06Matriz";
import Act07Modelo from "./Act07Modelo";
import EscDecisiones from "./EscDecisiones";
import Act08Dato from "./Act08Dato";
import Act09Ruta from "./Act09Ruta";
import EscArquitectura from "./EscArquitectura";
import Act10Cierre from "./Act10Cierre";
import EscGracias from "./EscGracias";
import CardCapitulo from "./CardCapitulo";

// ---------- Quién presenta (iniciales por escena; se ajustan cuando el equipo decida) ----------
export const PRESENTERS: Record<string, { ini: string; nombre: string }> = {
  SO: { ini: "SO", nombre: "Samuel" },
  EH: { ini: "EH", nombre: "Ernesto" },
  HV: { ini: "HV", nombre: "Héctor V." },
  HR: { ini: "HR", nombre: "Héctor R." },
  VS: { ini: "VS", nombre: "Valeria" },
};

// ---------- Capítulos (color = tinte de la atmósfera del escenario) ----------
export const CAPITULOS = [
  { num: "·", titulo: "Apertura", color: "#2dd4c5" },
  { num: "I", titulo: "El diagnóstico", color: "#e85d4b" },
  { num: "II", titulo: "Catálogo y clientes", color: "#e8a33d" },
  { num: "III", titulo: "La máquina de decidir", color: "#7fb4ff" },
  { num: "IV", titulo: "El plan", color: "#46c08b" },
  { num: "V", titulo: "Cierre", color: "#2dd4c5" },
];

export type Escena = {
  id: string;
  cap: number;          // índice en CAPITULOS
  label: string;        // para el índice
  pres: keyof typeof PRESENTERS;
  min: number;          // minutos sugeridos (ensayo)
  field?: FieldLayout;  // capa de partículas persistente
  Comp: ComponentType;
};

// helper: tarjeta de capítulo ya configurada
function card(cap: number, frase: string, pres: keyof typeof PRESENTERS): ComponentType {
  const c = CAPITULOS[cap];
  const p = PRESENTERS[pres];
  return function Card() {
    return createElement(CardCapitulo, {
      num: c.num, titulo: c.titulo, frase, presenta: `${p.ini} · ${p.nombre}`, color: c.color,
    });
  };
}

// ---------- El guion: 22 escenas · ≈20 minutos · 5 voces ----------
export const ESCENAS: Escena[] = [
  // Apertura · SO (≈3 min)
  { id: "portada", cap: 0, label: "372.979 líneas de factura", pres: "SO", min: 0.5, field: "drift", Comp: EscPortada },
  { id: "somos", cap: 0, label: "«Somos exportadores»", pres: "SO", min: 1.5, Comp: Act01Apertura },
  { id: "equipo", cap: 0, label: "Cinco voces, un relevo", pres: "SO", min: 1, field: "drift", Comp: EscEquipo },

  // Capítulo I · El diagnóstico · EH (≈4 min)
  { id: "cap1", cap: 1, label: "— Capítulo I —", pres: "EH", min: 0.2, Comp: card(1, "¿Está Panoplia tomando las decisiones correctas? Primero, la verdad incómoda.", "EH") },
  { id: "caida", cap: 1, label: "La caída (-18,3%)", pres: "EH", min: 1.5, Comp: Act03Caida },
  { id: "mapa", cap: 1, label: "El mapa del dinero (3D)", pres: "EH", min: 1.3, Comp: EscMapaDeck },
  { id: "split", cap: 1, label: "Todo en la misma cesta", pres: "EH", min: 1, field: "split", Comp: EscSplit },

  // Capítulo II · Catálogo y clientes · HV (≈4 min)
  { id: "cap2", cap: 2, label: "— Capítulo II —", pres: "HV", min: 0.2, Comp: card(2, "Lo que la facturación escondía: un catálogo 13 veces mayor y clientes que nadie miraba.", "HV") },
  { id: "catalogo", cap: 2, label: "La estantería (99.985 títulos)", pres: "HV", min: 1.3, Comp: EscEstanteria },
  { id: "clientes", cap: 2, label: "El fichero (722 clientes)", pres: "HV", min: 1.5, Comp: EscFichero },
  { id: "riesgo", cap: 2, label: "1,04 M€ enfriándose", pres: "HV", min: 1, Comp: EscRiesgo },

  // Capítulo III · La máquina de decidir · HR (≈4 min)
  { id: "cap3", cap: 3, label: "— Capítulo III —", pres: "HR", min: 0.2, Comp: card(3, "De los datos a la decisión: una matriz que prioriza y un modelo que aprende.", "HR") },
  { id: "matriz", cap: 3, label: "La matriz (108 cruces)", pres: "HR", min: 1.5, Comp: Act06Matriz },
  { id: "modelo", cap: 3, label: "El torneo de modelos", pres: "HR", min: 1.2, Comp: Act07Modelo },
  { id: "decisiones", cap: 3, label: "Un modelo, tres decisiones", pres: "HR", min: 1.1, Comp: EscDecisiones },

  // Capítulo IV · El plan · VS (≈4 min)
  { id: "cap4", cap: 4, label: "— Capítulo IV —", pres: "VS", min: 0.2, Comp: card(4, "Qué hacer mañana, en seis meses y en un año, sin pedirle un euro a nadie.", "VS") },
  { id: "dato", cap: 4, label: "El dato a oscuras (75%)", pres: "VS", min: 1.2, Comp: Act08Dato },
  { id: "ruta", cap: 4, label: "La hoja de ruta", pres: "VS", min: 1.5, Comp: Act09Ruta },
  { id: "arquitectura", cap: 4, label: "El viaje del dato (Azure)", pres: "VS", min: 1, Comp: EscArquitectura },

  // Cierre · SO (≈2 min)
  { id: "tesis", cap: 5, label: "La tesis", pres: "SO", min: 1.2, field: "arrow", Comp: Act10Cierre },
  { id: "gracias", cap: 5, label: "Gracias · preguntas", pres: "SO", min: 0.5, field: "drift", Comp: EscGracias },
];

export const MIN_TOTALES = Math.round(ESCENAS.reduce((s, e) => s + e.min, 0));
