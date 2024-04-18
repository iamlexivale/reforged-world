"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <div className="bg-transparent">
      <div className="container mx-auto flex flex-row justify-between">
        <div className="font-sans text-2xl font-medium text-black">
          Reforged
        </div>
        <div className="my-auto flex flex-row space-x-4">
          <Link href="/" className="font-sans text-base font-medium text-black">
            Home
          </Link>
          <Link
            href="/store"
            className="font-sans text-base font-medium text-black"
          >
            Store
          </Link>
          <Link
            href="/forum"
            className="font-sans text-base font-medium text-black"
          >
            Forum
          </Link>
          <Link
            href="/stats"
            className="font-sans text-base font-medium text-black"
          >
            Stats
          </Link>
          <Link
            href="/wiki"
            className="font-sans text-base font-medium text-black"
          >
            Wiki
          </Link>
        </div>
        <div className="my-auto flex flex-row space-x-4">
          <div className="font-sans text-base font-medium text-black">Auth</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
