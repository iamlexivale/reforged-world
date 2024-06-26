"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Layout = ({ children }: any) => {
  const pathname = usePathname();

  const links = {
    server: [{ href: "/server/information", label: "Information" }],
    stats: [
      { href: "/stats/player", label: "Player" },
      { href: "/stats/town", label: "Town" },
      { href: "/stats/nation", label: "Nation" },
    ],
    leaderboard: [
      { href: "/leaderboard/player", label: "Player" },
      { href: "/leaderboard/town", label: "Town" },
      { href: "/leaderboard/nation", label: "Nation" },
    ],
  };

  const getLinkClass = (linkHref: string) =>
    pathname === linkHref
      ? "rounded bg-slate-800 px-4 py-1 text-left font-sans text-base font-medium text-white focus:outline-none"
      : "px-4 py-1 text-left font-sans text-base font-medium text-white opacity-75 hover:bg-slate-900 focus:outline-none";

  const renderLinks = (links: { href: string; label: string }[]) =>
    links.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className={getLinkClass(link.href)}
      >
        {link.label}
      </Link>
    ));

  return (
    <div className="h-screen bg-slate-950 pt-24">
      <div className="mx-auto flex flex-row gap-16 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <div className="flex w-64 flex-col space-y-2">
          <div className="px-4 font-sans text-xs font-bold text-white opacity-50">
            SERVER
          </div>
          {renderLinks(links.server)}
          <div className="border-b border-white pt-2 opacity-10" />
          <div className="px-4 pt-2 font-sans text-xs font-bold text-white opacity-50">
            STATS
          </div>
          {renderLinks(links.stats)}
          <div className="border-b border-white pt-2 opacity-10" />
          <div className="px-4 pt-2 font-sans text-xs font-bold text-white opacity-50">
            LEADERBOARD
          </div>
          {renderLinks(links.leaderboard)}
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
