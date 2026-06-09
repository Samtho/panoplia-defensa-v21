import { useCallback, useEffect, useRef, useState } from "react";

// Máquina de navegación del teatro: un acto a la vez, avance por rueda,
// teclado (incluye mando de presentación: flechas / AvPág) y gesto táctil.
export function useTheatre(total: number, disabled = false) {
  const [act, setAct] = useState(0);
  const [indexOpen, setIndexOpen] = useState(false);
  const lock = useRef(0); // hasta cuándo está bloqueada la navegación (ms epoch)

  const go = useCallback(
    (n: number) => {
      const now = Date.now();
      if (now < lock.current) return;
      const target = Math.max(0, Math.min(total - 1, n));
      setAct((current) => {
        if (target === current) return current;
        lock.current = now + 950; // absorbe la inercia del trackpad
        return target;
      });
    },
    [total],
  );

  const next = useCallback(() => setActSafe(1), []);
  const prev = useCallback(() => setActSafe(-1), []);
  // referencia estable al acto actual para los handlers
  const actRef = useRef(act);
  actRef.current = act;
  function setActSafe(delta: number) {
    goRef.current(actRef.current + delta);
  }
  const goRef = useRef(go);
  goRef.current = go;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (disabled) return;
      if (e.key === "Escape") {
        setIndexOpen((v) => !v);
        return;
      }
      if (indexOpen) return; // con el índice abierto, solo Esc
      if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        setActSafe(1);
      } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        setActSafe(-1);
      } else if (e.key === "Home") goRef.current(0);
      else if (e.key === "End") goRef.current(total - 1);
      else if (/^[0-9]$/.test(e.key)) goRef.current(e.key === "0" ? 9 : Number(e.key) - 1);
    };
    const onWheel = (e: WheelEvent) => {
      if (disabled || indexOpen) return;
      if (Math.abs(e.deltaY) < 24) return; // ignora microscrolls
      setActSafe(e.deltaY > 0 ? 1 : -1);
    };
    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => (touchY = e.touches[0].clientY);
    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 60) setActSafe(dy > 0 ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [indexOpen, total, disabled]);

  return { act, go, next, prev, indexOpen, setIndexOpen };
}
