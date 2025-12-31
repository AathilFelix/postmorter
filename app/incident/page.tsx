import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <Header id="042" incident="Latency spike" />
      </div>
    </div>
  );
}
