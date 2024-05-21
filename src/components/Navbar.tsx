"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col items-center space-y-4 py-4">
          <div className="font-sans text-2xl font-medium text-black">
            Reforged World
          </div>
          <div className="my-auto flex flex-row space-x-4">
            <Link
              href="/"
              className="font-sans text-base font-medium text-black"
            >
              Home
            </Link>
            <Link
              href="/leaderboard"
              className="font-sans text-base font-medium text-black"
            >
              Leaderboard
            </Link>
            <Link
              href="/player"
              className="font-sans text-base font-medium text-black"
            >
              Player
            </Link>
            <Link
              href="/guild"
              className="font-sans text-base font-medium text-black"
            >
              Guild
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
