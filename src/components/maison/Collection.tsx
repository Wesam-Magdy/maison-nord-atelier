import { motion } from "framer-motion";
import mayfair from "@/assets/coat-mayfair.jpg";
import aspen from "@/assets/coat-aspen.jpg";
import vienna from "@/assets/coat-vienna.jpg";
import oslo from "@/assets/coat-oslo.jpg";
import geneva from "@/assets/coat-geneva.jpg";

const pieces = [
  { n: "N°01", name: "The Mayfair Coat",       desc: "Camel virgin wool, double-breasted, hand-finished horn buttons.", img: mayfair },
  { n: "N°02", name: "The Aspen Long Coat",    desc: "Heavyweight melton, alpine cut, storm-tested, snow-bound elegance.", img: aspen },
  { n: "N°03", name: "The Vienna Wool Jacket", desc: "Tailored mid-length, structured shoulder, navy worsted wool.", img: vienna },
  { n: "N°04", name: "The Oslo Cashmere Wrap", desc: "Pure Mongolian cashmere, shawl collar, ivory drape.", img: oslo },
  { n: "N°05", name: "The Geneva Evening Coat",desc: "Silk-lined evening tailoring, fluid silhouette, after-dark.", img: geneva },
];

export function Collection() {
  return (
    <section id="collection" className="relative py-32 md:py-44 px-6 md:px-12">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-end justify-between mb-16 md:mb-24 flex-wrap gap-6">
          <div>
            <p className="text-[11px] tracking-[0.4em] uppercase text-primary mb-6">— The Collection</p>
            <h2 className="font-serif text-5xl md:text-7xl text-ivory leading-[1]">Five pieces.<br/><em className="italic text-ivory/70">One winter.</em></h2>
          </div>
          <p className="max-w-sm text-ivory/60 text-sm leading-relaxed">A short, deliberate edit. Each coat is produced in a strictly limited run and offered first to private clients before public release.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
          {pieces.map((p, i) => (
            <motion.article
              key={p.n}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, delay: (i % 3) * 0.1, ease: [0.7, 0, 0.2, 1] }}
              className={`group ${i === 1 ? "lg:mt-24" : ""} ${i === 4 ? "lg:mt-16" : ""}`}
              data-cursor="hover"
            >
              <a href="#appointment" className="block">
                <div className="relative aspect-[3/4] overflow-hidden bg-card">
                  <img src={p.img} alt={p.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-700" />
                  <div className="absolute top-5 left-5 text-[10px] tracking-[0.4em] uppercase text-primary">{p.n}</div>
                  <div className="absolute bottom-5 right-5 text-[10px] tracking-[0.3em] uppercase text-ivory/0 group-hover:text-ivory/90 translate-y-2 group-hover:translate-y-0 transition-all duration-500">Discover Piece →</div>
                </div>
                <div className="mt-6 flex items-start justify-between gap-6">
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl text-ivory">{p.name}</h3>
                    <p className="mt-2 text-sm text-ivory/55 max-w-xs leading-relaxed">{p.desc}</p>
                  </div>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-ivory/40 mt-2 shrink-0">By Order</span>
                </div>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
