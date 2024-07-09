"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { DataContext } from "@/components/DataContext";

const Layout = ({ children }: any) => {
  const router = useRouter();
  const pathname = usePathname();

  const [data, setData] = useState<any>(null);
  const [dataCookies, setDataCookies] = useState<any>(null);

  const links = {
    nav: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/players", label: "Players" },
    ],
  };

  const activeLinkClass =
    "rounded bg-slate-800 px-4 py-1 text-left font-sans text-base font-medium text-white focus:outline-none";
  const inactiveLinkClass =
    "rounded px-4 py-1 text-left font-sans text-base font-medium text-white opacity-75 hover:bg-slate-900 focus:outline-none hover:cursor-pointer";

  const getLinkClass = (linkHref: string) =>
    pathname === linkHref ? activeLinkClass : inactiveLinkClass;

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

  useEffect(() => {
    const verifyToken = async () => {
      const token = Cookies.get("token");
      if (!token) {
        router.push("/login");
      } else {
        try {
          const response = await axios.post(
            `https://api.reforged.world/auth/verify`,
            {},
            {
              headers: {
                token: token,
              },
            },
          );
          if (!response.data.valid) {
            router.push("/login");
          } else {
            setData(response.data.signature);
            setDataCookies(token);
          }
        } catch (error) {
          router.push("/login");
        }
      }
    };

    verifyToken();
  }, [router]);

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };

  return (
    <DataContext.Provider value={dataCookies}>
      <div className="h-screen bg-slate-950 pt-24">
        <div className="mx-auto flex flex-row gap-16 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
          <div className="flex w-64 flex-col space-y-2">
            <div className="px-4 font-sans text-xs font-bold text-white opacity-50">
              NAVIGATION
            </div>
            {renderLinks(links.nav)}
            <div onClick={handleLogout} className={inactiveLinkClass}>
              Logout
            </div>
            <div className="p-4 font-sans text-xs font-bold text-white opacity-50 ">
              Logged in as <span className="underline">{data.signature}</span>
            </div>
          </div>
          <div className="w-full">{children}</div>
        </div>
      </div>
    </DataContext.Provider>
  );
};

export default Layout;
