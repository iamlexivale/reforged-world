const Footer = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto">
        <div className="flex flex-row justify-center space-x-4 py-8">
          <div className="font-sans text-sm font-normal text-neutral-600 hover:cursor-pointer hover:text-black">
            World
          </div>
          <div className="font-sans text-sm font-normal text-neutral-600 hover:cursor-pointer hover:text-black">
            Trakteer
          </div>
          <div className="font-sans text-sm font-normal text-neutral-600 hover:cursor-pointer hover:text-black">
            Wiki
          </div>
          <div className="font-sans text-sm font-normal text-neutral-600 hover:cursor-pointer hover:text-black">
            Docs
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
