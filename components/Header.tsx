import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full max-w-6xl mx-auto py-4">
      <div className="">
        <Link href="/">
          {" "}
          <img src="/images/logo.png" className="w-[150px] object-contain" />
        </Link>
      </div>
      <div>
        <Link href="https://github.com/aln1234">
          <FaGithub className="text-4xl text-red-600 cursor-pointer hover:text-red-500" />
        </Link>
      </div>
    </header>
  );
}
