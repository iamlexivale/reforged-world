"use client";

import useSWR from "swr";
import axios from "axios";
import { usePathname } from "next/navigation";

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

const Page = () => {
  const pathname = usePathname();
  const pathArray = pathname.split("/").filter(Boolean);

  const { data } = useSWR(
    `https://api.reforged.world/v1/nation/${pathArray[1]}`,
    fetcher,
  );

  return (
    <div className="container mx-auto">
      <div className="mx-auto flex w-5/6 flex-col border">
        <div>
          <div>Name: {data?.nation?.name}</div>
          <div>Capital: {data?.nation?.capital}</div>
        </div>
      </div>
      <div className="font-mono text-xs font-light italic text-neutral-400">
        {JSON.stringify(data?.request)}
      </div>
    </div>
  );
};

export default Page;
