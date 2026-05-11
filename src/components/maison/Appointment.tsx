import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(4, "Please enter a phone").max(40),
  date: z.string().min(1, "Choose a preferred date"),
  piece: z.string().max(80).optional(),
  message: z.string().max(800).optional(),
});

const pieces = ["The Mayfair Coat", "The Aspen Long Coat", "The Vienna Wool Jacket", "The Oslo Cashmere Wrap", "The Geneva Evening Coat", "Bespoke Commission"];

export function Appointment() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach(i => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <section id="appointment" className="relative py-32 md:py-44 px-6 md:px-12 bg-card/40 border-t border-border">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5">
          <p className="text-[11px] tracking-[0.4em] uppercase text-primary mb-8">— By Appointment</p>
          <h2 className="font-serif text-5xl md:text-7xl text-ivory leading-[1]">A private fitting,<br/><em className="italic text-ivory/70">arranged for you.</em></h2>
          <p className="mt-8 text-ivory/60 max-w-md leading-relaxed">Our atelier opens to a small number of clients each week. Tell us when you are next in the city and which piece moves you. We will respond within twenty-four hours.</p>
          <p className="mt-10 text-[11px] tracking-[0.3em] uppercase text-primary/80">Appointments are available for selected clients only.</p>

          <div className="mt-14 space-y-4 text-sm text-ivory/55">
            <div><span className="text-ivory/40 mr-3 text-[11px] tracking-[0.3em] uppercase">Atelier</span><span>14 Rue du Nord, Geneva</span></div>
            <div><span className="text-ivory/40 mr-3 text-[11px] tracking-[0.3em] uppercase">Hours</span><span>Tuesday — Saturday, by appointment</span></div>
            <div><span className="text-ivory/40 mr-3 text-[11px] tracking-[0.3em] uppercase">Concierge</span><span>private@maisonnord.com</span></div>
          </div>
        </div>

        <div className="lg:col-span-7">
          {submitted ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="border border-primary/40 bg-background/50 p-10 md:p-14">
              <p className="text-[11px] tracking-[0.4em] uppercase text-primary">— Request Received</p>
              <h3 className="font-serif text-3xl md:text-5xl text-ivory mt-6">Thank you.</h3>
              <p className="text-ivory/60 mt-6 max-w-lg leading-relaxed">A member of our private client team will contact you within the next twenty-four hours to confirm your fitting.</p>
            </motion.div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
              <Field label="Name"  name="name"  error={errors.name} />
              <Field label="Email" name="email" type="email" error={errors.email} />
              <Field label="Phone" name="phone" type="tel" error={errors.phone} />
              <Field label="Preferred Date" name="date" type="date" error={errors.date} />
              <div className="md:col-span-2">
                <Label>Interested Piece</Label>
                <select name="piece" defaultValue="" className="w-full bg-transparent border-b border-input py-3 text-ivory focus:border-primary outline-none transition-colors">
                  <option value="" className="bg-background">Select a piece (optional)</option>
                  {pieces.map(p => <option key={p} value={p} className="bg-background">{p}</option>)}
                </select>
              </div>
              <div className="md:col-span-2">
                <Label>Message</Label>
                <textarea name="message" rows={4} className="w-full bg-transparent border-b border-input py-3 text-ivory focus:border-primary outline-none resize-none transition-colors" />
                {errors.message && <p className="text-destructive text-xs mt-2">{errors.message}</p>}
              </div>
              <div className="md:col-span-2 mt-6">
                <button type="submit" className="group inline-flex items-center gap-3 bg-ivory text-background px-9 py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-primary transition-colors">
                  Request Appointment
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-[10px] tracking-[0.3em] uppercase text-ivory/45 mb-2">{children}</label>;
}
function Field({ label, name, type = "text", error }: { label: string; name: string; type?: string; error?: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <input name={name} type={type} className="w-full bg-transparent border-b border-input py-3 text-ivory focus:border-primary outline-none transition-colors" />
      {error && <p className="text-destructive text-xs mt-2">{error}</p>}
    </div>
  );
}
