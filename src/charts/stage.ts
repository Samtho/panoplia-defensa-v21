import type { EChartsCoreOption } from "echarts";
import { ventasAnualesReal, mercadosReal, matriz, MERCADOS_ORDEN } from "../data/computed";
import { benchmark } from "../data/benchmark";

// Paleta del escenario (espejo de los tokens CSS de index.css)
export const S = {
  stage: "#07090d",
  panel: "#0d1117",
  ivory: "#f2efe7",
  dim: "#b8b4a8",
  faint: "#6b6a62",
  hairline: "#232a33",
  spark: "#2dd4c5",
  sparkDeep: "#0d8f84",
  ember: "#e8a33d",
  blood: "#e85d4b",
  leaf: "#46c08b",
};
const FONT = "Inter, system-ui, sans-serif";
const baseText = { fontFamily: FONT, color: S.dim };

const PAIS: Record<string, string> = Object.fromEntries(mercadosReal.map((m) => [m.iso, m.pais]));
const GENEROS = matriz.map((f) => f.genero);

// ---------- Acto 3: la caída (índice 2022 = 100) ----------
export function caidaOption(): EChartsCoreOption {
  const serie = ventasAnualesReal;
  return {
    textStyle: baseText,
    animationDuration: 2400,
    animationEasing: "cubicOut" as const,
    grid: { left: 56, right: 36, top: 56, bottom: 44 },
    xAxis: {
      type: "category",
      data: serie.map((p) => p.anio),
      axisLine: { lineStyle: { color: S.hairline } },
      axisTick: { show: false },
      axisLabel: { color: S.faint, fontSize: 13 },
    },
    yAxis: {
      type: "value",
      min: 70,
      max: 105,
      splitLine: { lineStyle: { color: S.hairline, type: "dashed" } },
      axisLabel: { color: S.faint },
    },
    series: [
      {
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 10,
        data: serie.map((p) => p.indice),
        lineStyle: { color: S.blood, width: 4 },
        itemStyle: { color: S.blood, borderColor: S.stage, borderWidth: 3 },
        label: { show: true, position: "top", color: S.ivory, fontWeight: 600, fontSize: 13, formatter: "{c}" },
        areaStyle: {
          color: {
            type: "linear", x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(232,93,75,0.25)" },
              { offset: 1, color: "rgba(232,93,75,0.0)" },
            ],
          },
        },
        markLine: {
          symbol: "none",
          data: [{ yAxis: 100 }],
          lineStyle: { color: S.faint, type: "dashed" },
          label: { formatter: "pico 2022 = 100", color: S.faint, position: "insideEndTop" },
        },
      },
    ],
    graphic: [
      {
        type: "text", right: 36, top: 16,
        style: { text: "El sector, mientras tanto: +6,3% (FGEE 2024)", fill: S.leaf, fontFamily: FONT, fontWeight: 600, fontSize: 14 },
      },
    ],
  };
}

// ---------- Acto 2: el mapa del dinero ----------
const GEO: Record<string, [number, number]> = {
  ES: [-3.7038, 40.4168], MX: [-99.1332, 19.4326], PE: [-77.0428, -12.0464],
  DE: [13.405, 52.52], CL: [-70.6693, -33.4489], AU: [151.2093, -33.8688],
  SE: [18.0686, 59.3293], GB: [-0.1278, 51.5074], NI: [-86.2362, 12.1149],
  VE: [-66.9036, 10.4806], BE: [4.3517, 50.8503], PL: [21.0122, 52.2297],
};
const MADRID = GEO.ES;

export function mapaOption(): EChartsCoreOption {
  const exp = mercadosReal.filter((m) => m.iso !== "ES" && GEO[m.iso]);
  const maxV = Math.max(...exp.map((m) => m.ventasEuro));
  return {
    textStyle: baseText,
    backgroundColor: "transparent",
    geo: {
      map: "world",
      roam: false,
      center: [-32, 16],
      zoom: 1.7,
      itemStyle: { areaColor: "#10161d", borderColor: "#1f2933", borderWidth: 0.6 },
      emphasis: { disabled: true },
      silent: true,
    },
    series: [
      {
        type: "lines",
        coordinateSystem: "geo",
        zlevel: 2,
        effect: { show: true, period: 4.2, trailLength: 0.32, symbol: "arrow", symbolSize: 8, color: S.spark },
        lineStyle: { curveness: 0.32 },
        data: exp.map((m) => ({
          coords: [MADRID, GEO[m.iso]],
          name: m.pais,
          lineStyle: {
            width: Math.max(0.7, 4 * Math.sqrt(m.ventasEuro / maxV)),
            color: S.spark,
            opacity: 0.55,
          },
        })),
      },
      {
        type: "effectScatter",
        coordinateSystem: "geo",
        zlevel: 3,
        rippleEffect: { brushType: "stroke", scale: 3 },
        symbolSize: (val: number[]) => 5 + 16 * Math.sqrt((val[2] as number) / maxV),
        label: {
          show: true, position: "right",
          formatter: (p: { name: string }) => p.name.replace(" (origen)", ""),
          color: S.ivory, fontSize: 12, fontWeight: 500,
        },
        data: [
          { name: "Madrid (origen)", value: [...MADRID, maxV], itemStyle: { color: S.ivory } },
          ...exp.map((m) => ({
            name: m.pais,
            value: [...GEO[m.iso], m.ventasEuro],
            itemStyle: { color: S.spark },
          })),
        ],
      },
    ],
  };
}

// ---------- Acto 6: la matriz 108 cruces (cascada de celdas) ----------
export function matrizOption(): EChartsCoreOption {
  const byGenero = Object.fromEntries(matriz.map((f) => [f.genero, f]));
  const data: { value: [number, number, number] }[] = [];
  GENEROS.forEach((gname, yi) => {
    MERCADOS_ORDEN.forEach((iso, xi) => {
      const celda = byGenero[gname].celdas.find((c) => c.iso === iso);
      if (celda && celda.score !== null) data.push({ value: [xi, yi, celda.score] });
    });
  });
  return {
    textStyle: baseText,
    grid: { left: 168, right: 24, top: 8, bottom: 92 },
    animationDelay: (idx: number) => idx * 14, // cascada celda a celda
    xAxis: {
      type: "category",
      data: MERCADOS_ORDEN.map((iso) => PAIS[iso]),
      axisLine: { lineStyle: { color: S.hairline } },
      axisTick: { show: false },
      axisLabel: { color: S.dim, rotate: 40, fontSize: 11 },
    },
    yAxis: {
      type: "category",
      data: GENEROS,
      inverse: true,
      axisLine: { lineStyle: { color: S.hairline } },
      axisTick: { show: false },
      axisLabel: { color: S.ivory, fontWeight: 500, fontSize: 11 },
    },
    visualMap: {
      type: "piecewise",
      orient: "horizontal",
      bottom: 8,
      left: "center",
      itemWidth: 13,
      itemHeight: 13,
      textStyle: { color: S.dim, fontSize: 11 },
      pieces: [
        { min: 0.75, max: 1, label: "Potenciar (≥0,75)", color: S.leaf },
        { min: 0.55, max: 0.75, label: "Mantener", color: "#2d7a64" },
        { min: 0.35, max: 0.55, label: "Vigilar", color: S.ember },
        { min: 0, max: 0.35, label: "Reducir (<0,35)", color: S.blood },
      ],
    },
    series: [
      {
        type: "heatmap",
        data,
        label: {
          show: true, color: "#fff", fontWeight: 600, fontSize: 9.5,
          formatter: (p: { value: [number, number, number] }) => p.value[2].toFixed(2),
        },
        itemStyle: { borderColor: S.stage, borderWidth: 2 },
      },
    ],
  };
}

// ---------- Acto 7: benchmark (carrera de barras) ----------
export function benchmarkRaceOption(): EChartsCoreOption {
  const rows = benchmark;
  return {
    textStyle: baseText,
    grid: { left: 210, right: 64, top: 6, bottom: 22 },
    animationDuration: 1800,
    animationDelay: (idx: number) => idx * 160,
    animationEasing: "cubicOut" as const,
    xAxis: {
      type: "value", min: 0.5, max: 0.7,
      axisLabel: { color: S.faint },
      splitLine: { lineStyle: { color: S.hairline, type: "dashed" } },
    },
    yAxis: {
      type: "category", inverse: true,
      data: rows.map((r) => r.modelo),
      axisLine: { lineStyle: { color: S.hairline } },
      axisTick: { show: false },
      axisLabel: { color: S.ivory, fontSize: 12 },
    },
    series: [
      {
        type: "bar", barWidth: "60%",
        data: rows.map((r) => ({
          value: r.auc,
          itemStyle: { color: r.ganador ? S.spark : "#23413e", borderRadius: [0, 4, 4, 0] },
        })),
        label: {
          show: true, position: "right", color: S.dim, fontWeight: 600,
          formatter: (p: { value: number }) => p.value.toFixed(3),
        },
      },
    ],
  };
}

// ---------- Acto 9: la proyección (escenario del simulador) ----------
export function proyeccionOption(proj: number): EChartsCoreOption {
  const hist = ventasAnualesReal.map((p) => p.ventasM); // 2021-2025 reales
  const last = hist[hist.length - 1];
  const p1 = last + (proj - last) / 3;
  const p2 = last + (2 * (proj - last)) / 3;
  return {
    textStyle: baseText,
    animationDuration: 2200,
    grid: { left: 56, right: 28, top: 36, bottom: 36 },
    xAxis: {
      type: "category",
      data: ["2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028"],
      boundaryGap: false,
      axisLine: { lineStyle: { color: S.hairline } },
      axisTick: { show: false },
      axisLabel: { color: S.faint },
    },
    yAxis: {
      type: "value", min: 2.4, max: 3.6,
      axisLabel: { color: S.faint, formatter: "{value} M€" },
      splitLine: { lineStyle: { color: S.hairline, type: "dashed" } },
    },
    series: [
      {
        name: "Histórico", type: "line", smooth: true, symbol: "circle", symbolSize: 8,
        data: [...hist, null, null, null],
        lineStyle: { color: S.faint, width: 2.5 },
        itemStyle: { color: S.faint },
      },
      {
        name: "Con la hoja de ruta", type: "line", smooth: true, symbol: "circle", symbolSize: 8,
        data: [null, null, null, null, last, Number(p1.toFixed(2)), Number(p2.toFixed(2)), Number(proj.toFixed(2))],
        lineStyle: { color: S.spark, width: 4, type: "dashed" },
        itemStyle: { color: S.spark },
        areaStyle: {
          color: {
            type: "linear", x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(45,212,197,0.22)" },
              { offset: 1, color: "rgba(45,212,197,0.0)" },
            ],
          },
        },
        markLine: {
          symbol: "none", data: [{ yAxis: 3.28 }],
          lineStyle: { color: S.ember, type: "dashed" },
          label: { formatter: "pico 2022 · 3,28 M€", color: S.ember, position: "insideStartTop" },
        },
      },
    ],
  };
}
