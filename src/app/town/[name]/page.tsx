"use client";

import useSWR from "swr";
import axios from "axios";
import { usePathname } from "next/navigation";

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

const Page = () => {
  const pathname = usePathname();
  const pathArray = pathname.split("/").filter(Boolean);

  const { data } = useSWR(
    `https://api.reforged.world/v1/town/${pathArray[1]}`,
    fetcher,
  );

  return (
    <div className="h-screen bg-slate-900">
      <div className="container mx-auto flex w-5/6 flex-col border pt-14">
        <div>
          <div>Name: {data?.town?.name}</div>
          <div>Mayor: {data?.town?.mayor}</div>
          <div>Nation: {data?.town?.nation}</div>
        </div>
      </div>
      <div className="font-mono text-xs font-light italic text-neutral-400">
        {JSON.stringify(data?.request)}
      </div>
    </div>
  );
};

export default Page;
