import Link from "next/link";

const Footer = () => {
  return (
    <div className="absolute bottom-0 z-10 w-full bg-transparent">
      <div className="container mx-auto flex flex-col space-y-4 py-8">
        <div className="flex flex-row justify-center space-x-4">
          <Link
            href="/"
            className="font-sans text-sm font-normal text-white opacity-60 hover:cursor-pointer hover:text-white"
          >
            <span className="hidden md:inline">Reforged</span> World
          </Link>
          <a
            href="https://trakteer.id/reforgedworld"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm font-normal text-white opacity-60 hover:cursor-pointer hover:text-white"
          >
            Trakteer
          </a>
          <a
            href="https://wiki.reforged.world/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm font-normal text-white opacity-60 hover:cursor-pointer hover:text-white"
          >
            <span className="hidden md:inline">Reforged</span> Wiki
          </a>
          <a
            href="https://docs.reforged.world/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm font-normal text-white opacity-60 hover:cursor-pointer hover:text-white"
          >
            <span className="hidden md:inline">Reforged</span> Docs
          </a>
        </div>
        <div className="text-center font-sans text-sm font-normal text-white opacity-60">
          <span className="hidden md:inline">Reforged</span> Powered by{" "}
          <a
            href="https://www.arknesia.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Arknesia
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
