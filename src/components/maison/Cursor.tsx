import { useEffect, useRef } from "react";

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let x = 0, y = 0, tx = 0, ty = 0;
    const move = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    const enter = () => el.classList.add("is-hover");
    const leave = () => el.classList.remove("is-hover");
    window.addEventListener("mousemove", move);
    document.querySelectorAll("a,button,[data-cursor='hover']").forEach(n => {
      n.addEventListener("mouseenter", enter);
      n.addEventListener("mouseleave", leave);
    });
    let raf = 0;
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={ref} className="cursor-halo" aria-hidden />;
}
