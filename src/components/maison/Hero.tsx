import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import hero from "@/assets/hero.jpg";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <section ref={ref} id="top" className="relative h-[100svh] min-h-[680px] overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0 will-change-transform">
        <img src={hero} alt="Model in long charcoal wool coat on a misty cobblestone street" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/10 to-transparent" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-12 max-w-[1600px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }}
          className="text-[11px] md:text-xs tracking-[0.4em] uppercase text-primary mb-6"
        >
          Winter Collection — MMXXVI
        </motion.p>

        <h1 className="font-serif text-[14vw] md:text-[8vw] leading-[0.95] text-ivory max-w-[10ch]">
          {"The Coat".split("").map((c, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 + i * 0.04, ease: [0.7, 0, 0.2, 1] }} className="inline-block">{c === " " ? "\u00A0" : c}</motion.span>
          ))}
          <br />
          <em className="not-italic">
            {"That Defines".split("").map((c, i) => (
              <motion.span key={i} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.6 + i * 0.04, ease: [0.7, 0, 0.2, 1] }} className="inline-block italic">{c === " " ? "\u00A0" : c}</motion.span>
            ))}
          </em>
          <br />
          <span className="text-primary">
            {"Winter.".split("").map((c, i) => (
              <motion.span key={i} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.0 + i * 0.04, ease: [0.7, 0, 0.2, 1] }} className="inline-block">{c}</motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.4 }}
          className="mt-8 max-w-xl text-base md:text-lg text-ivory/70 leading-relaxed"
        >
          Tailored outerwear, crafted for cold cities, private evenings,
          and the timeless presence of those who never need to announce themselves.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.6 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a href="#collection" className="group inline-flex items-center gap-3 bg-ivory text-background px-7 py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-primary transition-colors">
            View Collection
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a href="#appointment" className="inline-flex items-center gap-3 border border-ivory/40 text-ivory px-7 py-4 text-[11px] tracking-[0.3em] uppercase hover:border-primary hover:text-primary transition-colors">
            Book Private Fitting
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 2 }}
        className="absolute right-6 md:right-12 bottom-10 z-10 text-[10px] tracking-[0.4em] uppercase text-ivory/50 [writing-mode:vertical-rl] rotate-180"
      >
        Scroll · Maison Nord
      </motion.div>
    </section>
  );
}
