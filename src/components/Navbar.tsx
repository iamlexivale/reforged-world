"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto">
        <div className="flex flex-row justify-between py-4">
          <Link href="/" className="font-sans text-2xl font-medium text-black">
            Reforged World
          </Link>
          <div className="my-auto flex flex-row space-x-4">
            <Link
              href="/leaderboard"
              className="font-sans text-base font-medium text-black"
            >
              Leaderboard
            </Link>
            <Link
              href="/players"
              className="font-sans text-base font-medium text-black"
            >
              Players
            </Link>
            <Link
              href="/towny"
              className="font-sans text-base font-medium text-black"
            >
              Towny
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
