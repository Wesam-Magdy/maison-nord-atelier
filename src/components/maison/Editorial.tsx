import { motion } from "framer-motion";
import night from "@/assets/editorial-night.jpg";
import morning from "@/assets/editorial-morning.jpg";
import arrival from "@/assets/editorial-arrival.jpg";

const stories = [
  { t: "After Dark in the City",       k: "Chapter I",   img: night,   p: "Wet streets, neon halos, and a silhouette that does not hurry. The Geneva walks the avenue at midnight." },
  { t: "Cold Mornings, Warm Interiors", k: "Chapter II",  img: morning, p: "The first frost on the window. A wrap of Mongolian cashmere. Coffee that cools slowly." },
  { t: "The Private Arrival",          k: "Chapter III", img: arrival, p: "Headlights at the entrance. A door held open. Winter understood as a quiet ceremony." },
];

export function Editorial() {
  return (
    <section id="editorial" className="relative py-32 md:py-44 px-6 md:px-12">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-20">
          <div>
            <p className="text-[11px] tracking-[0.4em] uppercase text-primary mb-6">— Editorial · Winter MMXXVI</p>
            <h2 className="font-serif text-5xl md:text-7xl text-ivory leading-[1]">Three chapters,<br/><em className="italic text-ivory/70">one season.</em></h2>
          </div>
        </div>

        <div className="space-y-32 md:space-y-44">
          {stories.map((s, i) => (
            <motion.article
              key={s.t}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1, ease: [0.7, 0, 0.2, 1] }}
              className={`grid lg:grid-cols-12 gap-8 lg:gap-16 items-center ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}
            >
              <div className="lg:col-span-7 group overflow-hidden" data-cursor="hover">
                <img src={s.img} alt={s.t} loading="lazy" className="w-full h-[60vh] md:h-[80vh] object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105" />
              </div>
              <div className="lg:col-span-5">
                <p className="text-[11px] tracking-[0.4em] uppercase text-primary mb-6">{s.k}</p>
                <h3 className="font-serif text-4xl md:text-6xl text-ivory leading-[1.05]">{s.t}</h3>
                <p className="mt-6 text-ivory/60 text-base leading-relaxed max-w-md">{s.p}</p>
                <a href="#appointment" className="link-underline inline-block mt-10 text-[11px] tracking-[0.3em] uppercase text-ivory/85 hover:text-primary">Read the Story →</a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
