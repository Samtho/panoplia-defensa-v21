import type { EChartsCoreOption } from "echarts";
import { S } from "./stage";

// Gráficos del ala de Anexos: el cuadro de mando "de siguiente nivel" (oscuro, con
// gradientes, zoom temporal y detalle al pasar el cursor). Datos: cubo real filtrado.

const FONT = "Inter, system-ui, sans-serif";
const baseText = { fontFamily: FONT, color: S.dim };
const tooltip = {
  backgroundColor: "#0d1117", borderColor: S.hairline,
  textStyle: { color: S.ivory, fontFamily: FONT, fontSize: 12 },
};

export function mensualPremiumOption(data: { mes: string; v: number }[]): EChartsCoreOption {
  return {
    textStyle: baseText,
    grid: { left: 56, right: 20, top: 18, bottom: 64 },
    tooltip: { ...tooltip, trigger: "axis", valueFormatter: (v: number) => `${Math.round(v).toLocaleString("es-ES")} €` },
    dataZoom: [
      { type: "inside" },
      { type: "slider", height: 22, bottom: 10, borderColor: S.hairline, backgroundColor: "transparent",
        fillerColor: "rgba(45,212,197,0.12)", handleStyle: { color: S.spark },
        textStyle: { color: S.faint, fontSize: 10 }, dataBackground: { lineStyle: { color: S.hairline }, areaStyle: { color: "rgba(184,180,168,0.08)" } } },
    ],
    xAxis: {
      type: "category", data: data.map((d) => d.mes),
      axisLine: { lineStyle: { color: S.hairline } }, axisTick: { show: false },
      axisLabel: { color: S.faint, fontSize: 10 },
    },
    yAxis: {
      type: "value",
      axisLabel: { color: S.faint, formatter: (v: number) => `${Math.round(v / 1000)}k` },
      splitLine: { lineStyle: { color: "rgba(255,255,255,0.05)" } },
    },
    series: [{
      type: "line", smooth: 0.35, symbol: "none", sampling: "lttb",
      lineStyle: { width: 2.5, color: S.spark },
      areaStyle: {
        color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [
          { offset: 0, color: "rgba(45,212,197,0.32)" }, { offset: 1, color: "rgba(45,212,197,0.0)" }] },
      },
      data: data.map((d) => Math.round(d.v)),
    }],
  };
}

export function generosPremiumOption(rows: { nombre: string; v: number }[]): EChartsCoreOption {
  const max = Math.max(...rows.map((r) => r.v));
  return {
    textStyle: baseText,
    grid: { left: 170, right: 70, top: 6, bottom: 8 },
    tooltip: { ...tooltip, valueFormatter: (v: number) => `${Math.round(v).toLocaleString("es-ES")} €` },
    xAxis: { type: "value", show: false, max: max * 1.08 },
    yAxis: {
      type: "category", inverse: true, data: rows.map((r) => r.nombre),
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: S.ivory, fontSize: 11.5 },
    },
    series: [{
      type: "bar", barWidth: "55%",
      data: rows.map((r, i) => ({
        value: Math.round(r.v),
        itemStyle: {
          borderRadius: [0, 6, 6, 0],
          color: { type: "linear", x: 0, y: 0, x2: 1, y2: 0, colorStops: [
            { offset: 0, color: i === 0 ? "#0d8f84" : "#1d3733" }, { offset: 1, color: i === 0 ? "#2dd4c5" : "#2d5a52" }] },
        },
      })),
      label: { show: true, position: "right", color: S.dim, fontWeight: 600, fontSize: 11,
        formatter: (p: { value: number }) => `${(p.value / 1e6).toFixed(2).replace(".", ",")} M€` },
      animationDelay: (i: number) => i * 90,
    }],
  };
}

export function donutPremiumOption(esp: number, exp: number): EChartsCoreOption {
  return {
    textStyle: baseText,
    tooltip: { ...tooltip, valueFormatter: (v: number) => `${Math.round(v).toLocaleString("es-ES")} €` },
    series: [{
      type: "pie", radius: ["62%", "85%"], center: ["50%", "52%"],
      itemStyle: { borderColor: S.stage, borderWidth: 3 },
      label: { color: S.ivory, fontSize: 12, formatter: "{b}\n{d}%" },
      data: [
        { name: "España", value: Math.round(esp), itemStyle: { color: "#3a4a46" } },
        { name: "Exportación", value: Math.round(exp), itemStyle: { color: S.spark } },
      ],
    }],
  };
}

export function aniosPremiumOption(rows: { anio: string; v: number }[]): EChartsCoreOption {
  return {
    textStyle: baseText,
    grid: { left: 56, right: 16, top: 16, bottom: 28 },
    tooltip: { ...tooltip, valueFormatter: (v: number) => `${Math.round(v).toLocaleString("es-ES")} €` },
    xAxis: { type: "category", data: rows.map((r) => r.anio), axisLine: { lineStyle: { color: S.hairline } }, axisTick: { show: false }, axisLabel: { color: S.faint } },
    yAxis: { type: "value", axisLabel: { color: S.faint, formatter: (v: number) => `${(v / 1e6).toFixed(1)}M` }, splitLine: { lineStyle: { color: "rgba(255,255,255,0.05)" } } },
    series: [{
      type: "bar", barWidth: "52%",
      data: rows.map((r) => ({
        value: Math.round(r.v),
        itemStyle: { borderRadius: [5, 5, 0, 0],
          color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [
            { offset: 0, color: "#2dd4c5" }, { offset: 1, color: "#0d4d47" }] } },
      })),
      animationDelay: (i: number) => i * 110,
    }],
  };
}
