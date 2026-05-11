import { motion } from "framer-motion";
import wool from "@/assets/texture-wool.jpg";
import stitch from "@/assets/atelier-stitch.jpg";

const stats = [
  { v: "120h", l: "Average tailoring time" },
  { v: "08",   l: "Master hands per piece" },
  { v: "100%", l: "Selected winter fabrics" },
  { v: "∞",    l: "Lifetime alteration service" },
];

export function Atelier() {
  return (
    <section id="atelier" className="relative py-32 md:py-44 px-6 md:px-12 bg-card/40 border-y border-border">
      <div className="max-w-[1500px] mx-auto">
        <p className="text-[11px] tracking-[0.4em] uppercase text-primary mb-8">— The Atelier</p>
        <h2 className="font-serif text-5xl md:text-7xl text-ivory leading-[1] max-w-4xl">
          Crafted in <em className="italic text-primary">hours</em>,<br/>not minutes.
        </h2>

        <div className="grid lg:grid-cols-12 gap-10 mt-20 items-start">
          <div className="lg:col-span-5 space-y-6 text-ivory/65 text-base leading-relaxed">
            <p>Each Maison Nord coat begins as a paper pattern, drawn for one body. From the first canvas to the final lining, eight master tailors carry the piece through more than a hundred hours of measured, patient work.</p>
            <p>We source from the same cashmere and wool houses that have supplied European couture for generations. We do not rush the cloth. We do not rush the hand.</p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <motion.img initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} src={wool} alt="Macro of luxury wool weave" loading="lazy" className="w-full h-72 md:h-96 object-cover" />
            <motion.img initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.15 }} src={stitch} alt="Hand stitching detail" loading="lazy" className="w-full h-72 md:h-96 object-cover mt-12" />
          </div>
        </div>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 border-t border-border pt-14">
          {stats.map((s, i) => (
            <motion.div key={s.l} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }}>
              <div className="font-serif text-5xl md:text-7xl text-ivory">{s.v}</div>
              <div className="mt-3 text-[11px] tracking-[0.25em] uppercase text-ivory/50">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
