import { HeroSection } from "@/components/hero/HeroSection";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AboutSection } from "@/components/sections/AboutSection";
import { BentoGallerySection } from "@/components/sections/BentoGallerySection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { PageIndicator } from "@/components/ui/PageIndicator";

export default function Home() {
  return (
    <>
      <Header />
      <PageIndicator />
      <main>
        <HeroSection />
        <AboutSection />
        <BentoGallerySection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
