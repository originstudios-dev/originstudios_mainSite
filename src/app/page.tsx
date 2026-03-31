import { Navbar } from "@/components/ui/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg text-primary">
        <div className="flex items-center justify-center h-screen">
          <h1 className="font-clash text-6xl font-bold uppercase tracking-tight">
            Origin Studios
          </h1>
        </div>
      </main>
    </>
  );
}
