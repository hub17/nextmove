import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";
import { About } from "@/components/sections/About";
import { Faq } from "@/components/sections/Faq";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <Process />
      <Contact />
      <About />
      <Faq />
    </>
  );
}
