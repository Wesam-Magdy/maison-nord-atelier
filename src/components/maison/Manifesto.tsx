import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const text =
  "We do not design for seasons. We design for arrival, for presence, and for the quiet confidence of winter — for the woman and the man who let the coat speak before they do.";

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 30%"] });
  const words = text.split(" ");

  return (
    <section ref={ref} id="manifesto" className="relative py-32 md:py-56 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <p className="text-[11px] tracking-[0.4em] uppercase text-primary mb-10">— Manifesto · I</p>
        <p className="font-serif text-3xl md:text-6xl leading-[1.15] text-ivory">
          {words.map((w, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            const Word = () => {
              const opacity = useTransform(scrollYProgress, [start, end], [0.18, 1]);
              return (
                <motion.span style={{ opacity }} className="inline-block mr-[0.25em]">
                  {w}
                </motion.span>
              );
            };
            return <Word key={i} />;
          })}
        </p>
        <div className="mt-20 grid md:grid-cols-3 gap-12 text-sm text-ivory/60 max-w-5xl">
          <div><span className="text-primary mr-3">N°01</span>Quiet over loud.</div>
          <div><span className="text-primary mr-3">N°02</span>Hand over machine.</div>
          <div><span className="text-primary mr-3">N°03</span>Time over trend.</div>
        </div>
      </div>
    </section>
  );
}
