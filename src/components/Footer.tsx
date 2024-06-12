const Footer = () => {
  return (
    <div className="absolute bottom-0 z-10 w-full bg-transparent">
      <div className="container mx-auto flex flex-col py-16">
        <div className="text-center font-sans text-sm font-normal text-white opacity-75">
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
