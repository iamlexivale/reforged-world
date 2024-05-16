const Page = () => {
  return (
    <div>
      <div className="container mx-auto">Map</div>
      <div className="h-[600px] w-full">
        <iframe
          src="http://62.72.47.86:8123/"
          frameBorder={0}
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    </div>
  );
};

export default Page;
