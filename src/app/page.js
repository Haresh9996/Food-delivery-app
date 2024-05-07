import Image from "next/image";
import Nav from "./_components/Nav";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Nav />

      <div className="min-h-[80dvh] flex flex-col items-center justify-center">
        <h2>Go to Restaurant Log in Page</h2>
        <button className="border border-slate-900 px-3 py-1 mt-3 rounded-lg"> <Link href="/restaurant">Click here</Link> </button>
      </div>
    </main>
  );
}
