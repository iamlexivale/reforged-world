import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto">
        <div className="flex flex-row justify-center space-x-4 py-8">
          <Link
            href="/"
            className="font-sans text-sm font-normal text-neutral-600 hover:cursor-pointer hover:text-black"
          >
            Reforged World
          </Link>
          <a
            href="https://trakteer.id/reforgedworld"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm font-normal text-neutral-600 hover:cursor-pointer hover:text-black"
          >
            Trakteer
          </a>
          <a
            href="https://wiki.reforged.world/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm font-normal text-neutral-600 hover:cursor-pointer hover:text-black"
          >
            Reforged Wiki
          </a>
          <a
            href="https://docs.reforged.world/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm font-normal text-neutral-600 hover:cursor-pointer hover:text-black"
          >
            Reforged Docs
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
