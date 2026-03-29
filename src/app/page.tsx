import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212] text-white">
      <ScrollyCanvas>
        <Overlay />
      </ScrollyCanvas>
      <Projects />
    </main>
  );
}
