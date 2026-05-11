const cols = [
  { t: "Maison",     items: ["Manifesto", "The Atelier", "Sustainability", "Press"] },
  { t: "Collection", items: ["Winter MMXXVI", "Coats", "Cashmere", "Archive"] },
  { t: "Services",   items: ["Private Fitting", "Bespoke Commission", "Lifetime Care", "Concierge"] },
  { t: "Contact",    items: ["Geneva Atelier", "private@maisonnord.com", "+41 22 000 00 00"] },
];

export function Footer() {
  return (
    <footer className="relative bg-background pt-24 pb-10 px-6 md:px-12 border-t border-border">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-5">
            <p className="font-serif text-5xl md:text-7xl text-ivory leading-[1]">Maison <em className="italic text-primary">Nord</em></p>
            <p className="mt-6 text-ivory/55 max-w-sm leading-relaxed">Winter tailoring for the quietly distinguished. Crafted in Geneva, worn from Aspen to Tokyo.</p>

            <form onSubmit={(e) => { e.preventDefault(); alert("Welcome to Maison Nord."); }} className="mt-10 flex border-b border-input max-w-md">
              <input type="email" required placeholder="Your email" className="bg-transparent flex-1 py-3 text-ivory placeholder:text-ivory/30 outline-none" />
              <button className="text-[11px] tracking-[0.3em] uppercase text-ivory/80 hover:text-primary px-4">Subscribe →</button>
            </form>
            <p className="mt-3 text-[10px] tracking-[0.3em] uppercase text-ivory/40">Private letters, four times a year.</p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-8">
            {cols.map(c => (
              <div key={c.t}>
                <p className="text-[10px] tracking-[0.3em] uppercase text-primary mb-5">{c.t}</p>
                <ul className="space-y-3 text-sm text-ivory/65">
                  {c.items.map(i => <li key={i}><a href="#" className="link-underline hover:text-ivory">{i}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-border text-[10px] tracking-[0.3em] uppercase text-ivory/40">
          <p>© MMXXVI Maison Nord — All Rights Reserved</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary">Instagram</a>
            <a href="#" className="hover:text-primary">Pinterest</a>
            <a href="#" className="hover:text-primary">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
