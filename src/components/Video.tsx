"use client";

import { usePathname } from "next/navigation";

const Video = () => {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  return (
    isHomepage && (
      <video
        className="absolute h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="./footage.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    )
  );
};

export default Video;
