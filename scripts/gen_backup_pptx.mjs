// Backup en PowerPoint de la web de defensa v1 (10 actos), por si falla todo el día D.
import Pptx from "pptxgenjs";
const p = new Pptx();
p.defineLayout({ name: "W", width: 13.33, height: 7.5 });
p.layout = "W";
const STAGE = "07090d", IVORY = "F2EFE7", DIM = "B8B4A8", SPARK = "2DD4C5", BLOOD = "E85D4B", LEAF = "46C08B";

function slide({ kicker, title, big, bigColor, bullets, note }) {
  const s = p.addSlide();
  s.background = { color: STAGE };
  if (kicker) s.addText(kicker.toUpperCase(), { x: 0.7, y: 0.55, w: 12, h: 0.4, fontSize: 13, color: SPARK, charSpacing: 4, bold: true, fontFace: "Arial" });
  if (title) s.addText(title, { x: 0.7, y: 1.1, w: 11.9, h: 1.6, fontSize: 40, color: IVORY, bold: true, fontFace: "Georgia" });
  if (big) s.addText(big, { x: 0.7, y: 2.7, w: 11.9, h: 2.1, fontSize: 96, color: bigColor || SPARK, bold: true, fontFace: "Georgia" });
  if (bullets) s.addText(bullets.map((b) => ({ text: b, options: { bullet: { code: "2022" }, breakLine: true } })),
    { x: 0.75, y: big ? 5.0 : 3.0, w: 11.8, h: 2.2, fontSize: 18, color: DIM, fontFace: "Arial", lineSpacing: 30 });
  if (note) s.addText(note, { x: 0.7, y: 6.9, w: 12, h: 0.4, fontSize: 11, color: "6B6A62", fontFace: "Arial" });
  return s;
}

slide({ kicker: "TFM INESDI · Grupo 4 · Panoplia de Libros, S.L.", title: "«Somos exportadores.»", big: "91,86%", bullets: ["…de la facturación es España (14,20 M€ de 15,45 M€).", "Esta es la historia de cómo pasar de declararse exportadora a serlo de verdad, con sus propios datos."], note: "Backup de la web de defensa (panoplia-defensa) · acto 1" });
slide({ kicker: "Acto 2 · ¿A dónde va el dinero?", title: "La exportación es, en realidad, México.", big: "77%", bullets: ["De los 1,26 M€ exportados, México concentra el 77% (969.603 €).", "12 mercados activos; once son hilos finos: la diversificación aún no existe."] });
slide({ kicker: "Acto 3 · ¿Lo está haciendo bien?", title: "Cae un 18,3% mientras el sector sube.", big: "-18,3%", bigColor: BLOOD, bullets: ["Del pico de 3,28 M€ (2022) a 2,68 M€ (2025). En 2025: -13,3% (se acelera).", "El sector editorial español creció +6,3% (FGEE 2024): pierde cuota, no mercado."] });
slide({ kicker: "Acto 4 · ¿Qué tiene realmente en el catálogo?", title: "99.985 títulos. El 5% hace el 53% de las ventas.", bullets: ["El catálogo en Excel tenía ≈7.479 referencias: el universo real es 13 veces mayor.", "Cola larguísima: el 1% ya concentra el 29,5% de las ventas; el 20%, el 78,7%."] });
slide({ kicker: "Acto 5 · ¿A qué clientes cuidar?", title: "722 clientes. 175 sostienen el negocio.", big: "1,04 M€", bigColor: BLOOD, bullets: ["Los Campeones (24% de los clientes, RFM) generan el 75% de las ventas.", "44 clientes 'En Riesgo' acumulan 1,04 M€ que se está enfriando: retención urgente."] });
slide({ kicker: "Acto 6 · ¿Qué potenciar y dónde?", title: "108 cruces género × mercado, 4 decisiones.", bullets: ["Score multi-criterio (CAGR 25 · tendencia 25 · aceleración 15 · cuota 20 · estabilidad 15).", "19 Potenciar · 32 Mantener · 38 Vigilar · 16 Reducir.", "Perú encabeza la apuesta: Historia y Pensamiento y Literatura con 0,82."] });
slide({ kicker: "Acto 7 · ¿Se puede predecir el éxito de un título?", title: "Un modelo que compite, gana y se adapta.", bullets: ["8 familias de algoritmos sobre el mismo problema: gana gradient boosting (familia XGBoost), AUC 0,645.", "Un modelo, tres decisiones: cobertura máxima (captura 85%), equilibrio (64%), riesgo mínimo (61% de acierto).", "Validación ciega 80/20 sobre 112.598 pares título-mercado. Techo honesto ~0,64."] });
slide({ kicker: "Acto 8 · ¿Se puede confiar en el dato?", title: "El dato a oscuras.", big: "75%", bigColor: BLOOD, bullets: ["3 de cada 4 líneas de factura no registran coste: sin coste no hay margen real.", "El marco que lo reenciende: coste por línea · modelo único (PostgreSQL) · responsable del dato · pipeline reproducible · indicadores de salud."] });
slide({ kicker: "Acto 9 · ¿Qué hacer ahora?", title: "Tres horizontes, sin inversión externa.", bullets: ["0-90 días: retener a los 44 'En Riesgo' y registrar el coste por línea.", "6 meses: desarrollar México y migrar el catálogo a PostgreSQL.", "12+ meses: institucionalizar (cloud + responsable de gobernanza).", "Solo dos palancas (+0,21 retención, +0,19 México) devuelven la facturación a ≈3,08 M€."] });
slide({ kicker: "Acto final · La tesis", title: "De decirse exportadora a serlo de verdad.", bullets: ["Con sus propios datos, herramientas abiertas y sin inversión externa.", "Cuadro de mando completo: samtho.github.io/panoplia-dashboard", "Grupo 4 · Máster en Business Analytics e IA · INESDI · 2026"] });

await p.writeFile({ fileName: "/Users/samuelortega/Desktop/TFM/documento/Defensa_Backup_Web_10actos.pptx" });
console.log("PPTX backup generado");
