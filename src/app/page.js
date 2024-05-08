import Image from "next/image";
import Nav from "./_components/Nav";
import Link from "next/link";
import ClientNav from "./_components/ClientNav";
import Footer from "./_components/Footer";
import Carousel from "./_components/Carousel";
import CarouselFunc from "./_components/Carousel";

export default function Home() {

  return (
    <main>
      <ClientNav />
     
      <Carousel />

      <div className="min-h-[80dvh] flex flex-col items-center justify-center">
        <h2>Go to Restaurant Log in Page</h2>
        <button className="border border-slate-900 px-3 py-1 mt-3 rounded-lg"> <Link href="/restaurant">Click here</Link> </button>
      </div>

      <Footer />
    </main>
  );
}
