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
              href="/player"
              className="font-sans text-base font-medium text-black"
            >
              Player
            </Link>
            <Link
              href="/town"
              className="font-sans text-base font-medium text-black"
            >
              Town
            </Link>
            <Link
              href="/nation"
              className="font-sans text-base font-medium text-black"
            >
              Nation
            </Link>
            <Link
              href="/leaderboard"
              className="font-sans text-base font-medium text-black"
            >
              Leaderboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
