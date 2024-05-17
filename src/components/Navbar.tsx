"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col items-center space-y-4 py-4">
          <div className="font-sans text-2xl font-medium text-black">
            Reforged
          </div>
          <div className="my-auto flex flex-row space-x-4">
            <Link
              href="/"
              className="font-sans text-base font-medium text-black"
            >
              Home
            </Link>
            <Link
              href="/store"
              className="font-sans text-base font-medium text-black"
            >
              Store
            </Link>
            <Link
              href="/map"
              className="font-sans text-base font-medium text-black"
            >
              Map
            </Link>
            <Link
              href="/leaderboard"
              className="font-sans text-base font-medium text-black"
            >
              Leaderboard
            </Link>
            <Link
              href="/stats"
              className="font-sans text-base font-medium text-black"
            >
              Stats
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
