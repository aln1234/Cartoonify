import Image from "next/image";
import { Inter } from "next/font/google";

import Header from "@/components/Header";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="w-full h-screen">
      <Header />
      <div className="flex  justify-center max-w-6xl mx-auto text-5xl  font-bold py-6">
        <img
          src="/images/astro.png"
          className="w-[400px] items-center animate-[bounce_5s_ease-in-out_infinite] "
        />
      </div>
      <div className="flex  justify-center max-w-6xl mx-auto text-5xl  font-bold py-2">
        <h1>Try the Cartoonify Model</h1>
      </div>
      <div className="flex  justify-center max-w-6xl mx-auto  font-bold py-2">
        <Link
          href="/cartoonify"
          className="text-xl text-white font-medium bg-red-500 px-3 py-3 rounded-full"
        >
          Cartoonify
        </Link>
      </div>
    </main>
  );
}
