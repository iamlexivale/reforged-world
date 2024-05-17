"use client";

import useSWR from "swr";
import axios from "axios";
import { usePathname } from "next/navigation";

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

const Page = () => {
  const pathname = usePathname();
  const pathArray = pathname.split("/").filter(Boolean);

  const { data } = useSWR(
    `https://api.reforged.world/v1/player/${pathArray[1]}`,
    fetcher,
  );

  return (
    <div>
      <div className="container mx-auto">Stats/{pathArray[1]}</div>
      <br />
      <div className="container mx-auto">{JSON.stringify(data)}</div>
    </div>
  );
};

export default Page;
