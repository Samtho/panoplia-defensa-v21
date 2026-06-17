// Modo orador (tecla N): qué decir en cada escena + la pregunta probable de cada jurado.
// Jurados: Aldo (técnica/ETL) · Alberto (visualización) · Carolina (negocio/storytelling) · Fran (tutor).
export type Nota = { decir: string; q?: string; a?: string; by?: string };

export const NOTAS: Record<string, Nota> = {
  portada: { decir: "Energía y calma. Cada punto que flota es venta real; en 20 minutos los vamos a ordenar hasta que cuenten lo que la empresa no sabía." },
  somos: {
    decir: "El gancho: Panoplia se declara exportadora, pero el 91,86% de su facturación es España. Ese contraste es todo el proyecto.",
    by: "Carolina", q: "¿Por qué esa frase de apertura?", a: "Es su autoimagen real (web corporativa). El dato la desmiente, y de esa brecha nace nuestro trabajo.",
  },
  equipo: { decir: "El relevo: cinco voces, cinco fases, seis objetivos. Cada capítulo lo cuenta quien lo construyó." },
  cap1: { decir: "Entra Ernesto. Capítulo I: el diagnóstico, la verdad incómoda." },
  caida: {
    decir: "Cae 18,3% desde el pico de 2022 mientras el sector crece 6,3%. Pierde cuota, no mercado.",
    by: "Fran", q: "¿La caída es estacional o puntual?", a: "Estructural: la media móvil de 3 meses lo confirma, y 2025 se acelera a -13,3%.",
  },
  mapa: {
    decir: "La exportación es, en realidad, México: el 77% de todo lo que sale. El resto, hilos finos.",
    by: "Alberto", q: "¿Qué herramienta de visualización es ese mapa?", a: "deck.gl, el motor de visualización geoespacial que usa Carto: arcos 3D sobre datos reales.",
  },
  split: { decir: "91,86% vs 8,14%: casi todo el dinero duerme en la misma cesta. Esa es la vulnerabilidad a resolver." },
  cap2: { decir: "Entra Héctor V. Capítulo II: lo que la facturación escondía." },
  catalogo: {
    decir: "El Excel decía 7.479 títulos; la facturación demostró 99.985: 13 veces más. El 5% hace el 53% de las ventas.",
    by: "Aldo", q: "¿Cómo reconstruisteis los 99.985 títulos?", a: "Desde la facturación con Python/pandas: agregando líneas por título, porque no existía catálogo de referencia completo.",
  },
  clientes: {
    decir: "Cada ficha es un cliente real, clasificado con RFM. 175 Campeones (24%) pagan el 75%.",
    by: "Carolina", q: "¿Qué es RFM en una frase?", a: "Recencia, frecuencia y dinero: mide cómo de valioso y activo es cada cliente para priorizar la gestión comercial.",
  },
  riesgo: { decir: "1,04 M€ enfriándose en solo 44 clientes. La primera acción de la hoja de ruta: una lista, un teléfono, 0€ de inversión." },
  cap3: { decir: "Entra Héctor R. Capítulo III: de los datos a la decisión." },
  matriz: {
    decir: "108 cruces género×mercado, score multicriterio. 19 a potenciar; Perú encabeza con 0,82.",
    by: "Fran", q: "¿Por qué Perú lidera si vende poco?", a: "El score premia trayectoria y cuota relativa, no volumen absoluto; por eso lo presentamos junto al tamaño de cada mercado.",
  },
  modelo: {
    decir: "Empezamos con XGBoost y lo pusimos a competir con 8 familias. Gana gradient boosting, AUC 0,645. Reconocemos el techo de ~0,64 con honestidad.",
    by: "Aldo", q: "¿Por qué no sube más el AUC?", a: "Faltan variables clave (coste y devoluciones) y la identidad del título domina. Lo decimos claro: el valor está en explicar el porqué, no en inflar la métrica.",
  },
  decisiones: { decir: "El mismo modelo, tres umbrales: cobertura máxima, equilibrio o riesgo mínimo. Es una decisión estratégica, no técnica." },
  cap4: { decir: "Entra Valeria. Capítulo IV: qué hacer mañana, en seis meses y en un año." },
  dato: { decir: "El 75% de las líneas no registra coste: sin coste no hay margen real. No lo maquillamos: lo convertimos en el primer pilar de la gobernanza." },
  ruta: { decir: "Tres horizontes. Solo dos palancas (retener el riesgo + desarrollar México) devuelven la facturación a ≈3,08 M€." },
  arquitectura: {
    decir: "De 10 hojas de Excel a una arquitectura cloud. Todo reproducible, ninguna caja negra.",
    by: "Aldo", q: "¿Dónde se entrenan y dónde corren los modelos?", a: "La base de datos está en Azure (PostgreSQL); los modelos se entrenan desde un notebook conectado a ella. Reproducible; el despliegue como servicio es el siguiente paso.",
  },
  aprendizajes: { decir: "Cierra Samuel. Take-aways + próximos pasos, y un guiño: el método lo dio el máster, lo difícil fue convertir el dato en una decisión." },
  tesis: { decir: "Remate fuerte: de decirse exportadora a serlo de verdad, con sus propios datos y sin inversión externa." },
  gracias: { decir: "Gracias y puerta abierta a preguntas. Enlaza al cuadro de mando completo y al ala de Anexos (tecla A) si quieren ver lo técnico." },
};
