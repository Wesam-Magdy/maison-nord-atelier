const items = [
  "Cashmere", "Wool", "Leather", "Fur-Free Luxury", "Tailored Coats", "Winter MMXXVI",
];

export function Marquee() {
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className="relative border-y border-border bg-background overflow-hidden py-6">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="font-serif text-3xl md:text-5xl text-ivory/80 mx-10 inline-flex items-center gap-10">
            {t}
            <span className="text-primary text-base">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
