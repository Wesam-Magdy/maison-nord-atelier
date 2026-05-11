import { createFileRoute } from "@tanstack/react-router";
import { Cursor } from "@/components/maison/Cursor";
import { Intro } from "@/components/maison/Intro";
import { ScrollProgress } from "@/components/maison/ScrollProgress";
import { Navbar } from "@/components/maison/Navbar";
import { Hero } from "@/components/maison/Hero";
import { Marquee } from "@/components/maison/Marquee";
import { Manifesto } from "@/components/maison/Manifesto";
import { Collection } from "@/components/maison/Collection";
import { Atelier } from "@/components/maison/Atelier";
import { Editorial } from "@/components/maison/Editorial";
import { Appointment } from "@/components/maison/Appointment";
import { Footer } from "@/components/maison/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="grain bg-background text-ivory min-h-screen overflow-x-hidden">
      <Intro />
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Manifesto />
        <Collection />
        <Atelier />
        <Editorial />
        <Appointment />
      </main>
      <Footer />
    </div>
  );
}
