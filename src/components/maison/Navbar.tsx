import { useEffect, useState } from "react";

const links = [
  { href: "#collection", label: "Collection" },
  { href: "#manifesto", label: "Manifesto" },
  { href: "#atelier", label: "Atelier" },
  { href: "#editorial", label: "Editorial" },
  { href: "#appointment", label: "Appointment" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/70 backdrop-blur-md border-b border-border" : "bg-transparent"}`}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
        <a href="#top" className="font-serif text-xl md:text-2xl tracking-[0.18em] text-ivory">
          MAISON&nbsp;NORD
        </a>
        <nav className="hidden md:flex items-center gap-10 text-[11px] tracking-[0.28em] uppercase text-ivory/80">
          {links.map(l => (
            <a key={l.href} href={l.href} className="link-underline hover:text-primary transition-colors">{l.label}</a>
          ))}
        </nav>
        <a href="#appointment" className="hidden md:inline-block text-[11px] tracking-[0.28em] uppercase border border-ivory/40 px-5 py-2.5 hover:bg-ivory hover:text-background transition-colors">
          Book Fitting
        </a>
        <button onClick={() => setOpen(v => !v)} className="md:hidden text-ivory text-xs tracking-[0.3em] uppercase" aria-label="Menu">
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border">
          <nav className="flex flex-col px-6 py-6 gap-5 text-sm tracking-[0.25em] uppercase text-ivory/85">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="hover:text-primary">{l.label}</a>
            ))}
            <a href="#appointment" onClick={() => setOpen(false)} className="text-primary">Book Private Fitting →</a>
          </nav>
        </div>
      )}
    </header>
  );
}
