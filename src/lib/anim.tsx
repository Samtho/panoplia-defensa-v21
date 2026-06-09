import { useEffect, useRef, useState, type RefObject } from "react";
import gsap from "gsap";

export const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Entrada estándar de un acto: los elementos [data-a] suben en cascada.
// `build` permite añadir coreografía extra al timeline (tachados, contadores...).
export function useEntrance(
  ref: RefObject<HTMLElement | null>,
  build?: (tl: gsap.core.Timeline, root: HTMLElement) => void,
) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (reducedMotion()) {
      gsap.set(root.querySelectorAll("[data-a]"), { opacity: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from("[data-a]", { y: 44, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.14 });
      build?.(tl, root);
    }, root);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

// Contador animado para cifras protagonistas.
export function Count({
  to,
  decimals = 0,
  suffix = "",
  duration = 1.6,
  delay = 0,
  className,
}: {
  to: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  const [val, setVal] = useState(reducedMotion() ? to : 0);
  const obj = useRef({ v: 0 });

  useEffect(() => {
    if (reducedMotion()) {
      setVal(to);
      return;
    }
    const tween = gsap.to(obj.current, {
      v: to,
      duration,
      delay,
      ease: "power2.out",
      onUpdate: () => setVal(obj.current.v),
    });
    return () => {
      tween.kill();
    };
  }, [to, duration, delay]);

  const txt = val.toLocaleString("es-ES", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return (
    <span className={className}>
      {txt}
      {suffix}
    </span>
  );
}
