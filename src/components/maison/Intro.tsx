import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Intro() {
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const start = performance.now();
    const duration = 2600;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setCount(Math.floor(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setShow(false), 700);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    if (!show) document.body.style.overflow = "";
  }, [show]);

  const word = "MAISON NORD";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.2, ease: [0.85, 0, 0.15, 1] }}
          className="fixed inset-0 z-[200] bg-background flex flex-col"
        >
          {/* Top meta row */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center justify-between px-6 md:px-12 pt-6 md:pt-10 text-[10px] tracking-[0.4em] uppercase text-ivory/45"
          >
            <span>Geneva — MMXXVI</span>
            <span>Winter Collection</span>
          </motion.div>

          {/* Center brand */}
          <div className="flex-1 flex items-center justify-center px-6">
            <h1 className="font-serif text-[14vw] md:text-[10vw] leading-none text-ivory flex">
              {word.split("").map((c, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 1.1, delay: 0.4 + i * 0.06, ease: [0.7, 0, 0.2, 1] }}
                  className="inline-block"
                >
                  {c === " " ? "\u00A0" : c}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* Bottom progress + tagline */}
          <div className="px-6 md:px-12 pb-8 md:pb-10">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="text-center font-serif italic text-base md:text-xl text-ivory/65 mb-8"
            >
              Winter Tailoring for the Quietly Distinguished
            </motion.p>

            <div className="flex items-center justify-between text-[10px] tracking-[0.4em] uppercase text-ivory/45 mb-3">
              <span>Entering the Atelier</span>
              <span className="tabular-nums text-primary">{String(count).padStart(3, "0")} / 100</span>
            </div>
            <div className="h-px w-full bg-border overflow-hidden">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: count / 100 }}
                transition={{ ease: "linear" }}
                style={{ transformOrigin: "left" }}
                className="h-full bg-primary"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
