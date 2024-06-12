"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { Fragment } from "react";

const Navbar = () => {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "World" },
    { href: "/stats", label: "Stats" },
  ];

  const hyperLinks = [
    { href: "https://trakteer.id/reforgedworld", label: "Trakteer" },
    { href: "https://wiki.reforged.world", label: "Wiki" },
    { href: "https://docs.reforged.world", label: "Docs" },
  ];

  return (
    <header className="fixed z-20 w-full bg-transparent">
      <div className="mx-auto flex justify-between px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <Link
          href="/"
          className="my-auto font-sans text-2xl font-medium text-white"
        >
          Reforged
          <span className="font-sans text-sm font-light text-white opacity-75">
            , the Minecraft SMP
          </span>
        </Link>

        {/* mobile */}
        <div className="flex md:hidden">
          <Menu as="div" className="relative">
            {({ open }) => (
              <>
                <MenuButton className="flex items-center justify-center bg-transparent py-4 pl-4 text-black focus:outline-none">
                  <Bars3Icon className="h-6 w-6 text-white" />
                </MenuButton>
                {open && (
                  <div className="fixed inset-0 z-10 bg-black bg-opacity-50" />
                )}
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-300"
                  enterFrom="transform translate-x-full opacity-0"
                  enterTo="transform translate-x-0 opacity-100"
                  leave="transition ease-in duration-200"
                  leaveFrom="transform translate-x-0 opacity-100"
                  leaveTo="transform translate-x-full opacity-0"
                >
                  <MenuItems className="fixed right-0 top-0 z-20 flex h-full w-48 flex-col bg-slate-900 py-2 shadow-lg">
                    {links.map((link) => (
                      <MenuItem key={link.href}>
                        {({ isActive }: any) => (
                          <Link
                            href={link.href}
                            className="block bg-slate-900 px-4 py-2 font-sans text-base font-medium text-white"
                          >
                            {link.label}
                          </Link>
                        )}
                      </MenuItem>
                    ))}
                    {hyperLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 font-sans text-base font-medium text-white"
                      >
                        {link.label}
                      </a>
                    ))}
                  </MenuItems>
                </Transition>
              </>
            )}
          </Menu>
        </div>

        {/* desktop */}
        <div className="hidden md:flex md:items-center">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={
                pathname === link.href
                  ? "p-4 font-sans text-base font-bold text-white"
                  : "p-4 font-sans text-base font-medium text-white"
              }
            >
              {link.label}
            </Link>
          ))}
          {hyperLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 font-sans text-base font-medium text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
