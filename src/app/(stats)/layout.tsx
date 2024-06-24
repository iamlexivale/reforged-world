"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Layout = ({ children }: any) => {
  const pathname = usePathname();

  const linksServer = [{ href: "/server/information", label: "Information" }];

  const linksStats = [
    { href: "/stats/player", label: "Player" },
    { href: "/stats/town", label: "Town" },
    { href: "/stats/nation", label: "Nation" },
  ];

  const linksLeaderboard = [
    { href: "/leaderboard/player", label: "Player" },
    { href: "/leaderboard/town", label: "Town" },
    { href: "/leaderboard/nation", label: "Nation" },
  ];

  return (
    <div className="h-screen bg-slate-950 pt-24">
      <div className="mx-auto px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <div className="flex flex-row gap-x-16">
          <div className="flex w-1/6 flex-col space-y-2">
            <div className="px-4 font-sans text-sm font-bold text-white opacity-50">
              SERVER
            </div>
            {linksServer.map((link) => (
              <Link
                href={link.href}
                className={
                  pathname == link.href
                    ? "rounded bg-slate-900 px-4 py-1 text-left font-sans text-base font-medium text-white focus:outline-none"
                    : "px-4 py-1 text-left font-sans text-base font-medium text-white opacity-75 focus:outline-none"
                }
              >
                {link.label}
              </Link>
            ))}
            <div className="border-b border-white pt-2 opacity-10" />
            <div className="px-4 pt-2 font-sans text-sm font-bold text-white opacity-50">
              STATS
            </div>
            {linksStats.map((link) => (
              <Link
                href={link.href}
                className={
                  pathname == link.href
                    ? "rounded bg-slate-900 px-4 py-1 text-left font-sans text-base font-medium text-white focus:outline-none"
                    : "px-4 py-1 text-left font-sans text-base font-medium text-white opacity-75 focus:outline-none"
                }
              >
                {link.label}
              </Link>
            ))}
            <div className="border-b border-white pt-2 opacity-10" />
            <div className="px-4 pt-2 font-sans text-sm font-bold text-white opacity-50">
              LEADERBOARD
            </div>
            {linksLeaderboard.map((link) => (
              <Link
                href={link.href}
                className={
                  pathname == link.href
                    ? "rounded bg-slate-900 px-4 py-1 text-left font-sans text-base font-medium text-white focus:outline-none"
                    : "px-4 py-1 text-left font-sans text-base font-medium text-white opacity-75 focus:outline-none"
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
