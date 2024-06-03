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
    <div className="h-screen bg-slate-900 pt-14">
      <div className="mx-auto flex justify-between px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <div className="text-white">{JSON.stringify(data)}</div>
      </div>
    </div>
  );
};

export default Page;
