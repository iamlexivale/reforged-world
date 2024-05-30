"use client";

import { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

const Page = () => {
  const { data } = useSWR("https://api.reforged.world/v1/towns", fetcher);
  const router = useRouter();
  const [search, setSearch] = useState("");

  const modifiedData = data && {
    towns: data.towns.slice(0, 5),
    request: data.request,
  };

  const handleSearchChange = (e: any) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    router.push(`/town/${search}`);
  };

  return (
    <div className="h-screen bg-slate-900 pt-14">
      <div className="container mx-auto flex flex-col justify-center space-y-8 py-16">
        <div className="space-y-4">
          <div className="text-center font-sans text-2xl font-bold antialiased">
            <div className="bg-gradient-to-r from-fuchsia-600 via-red-500 to-purple-600 bg-clip-text text-transparent">
              Enter a Town Name
            </div>
          </div>
          <form onSubmit={handleSearchSubmit} className="flex justify-center">
            <input
              type="text"
              className="w-96 border-2 border-slate-800 bg-slate-950 px-4 py-1 text-white focus:outline-none"
              value={search}
              onChange={handleSearchChange}
            />
          </form>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <div className="font-sans text-base font-medium text-white">
            Latest Towns
          </div>
          <div className="w-max space-y-2">
            {modifiedData?.towns.map((data: any, index: any) => (
              <Link
                href={`/town/${data.name}`}
                key={index}
                className="flex flex-row justify-between space-x-32 rounded-sm border border-slate-800 px-4 py-1 hover:cursor-pointer hover:border-slate-700"
              >
                <div className="my-auto font-sans text-base font-medium text-white">
                  {data?.name}
                </div>
                <div>
                  <div className="text-right font-sans text-xs font-light text-white text-opacity-60">
                    Nation
                  </div>
                  <div className="text-right font-sans text-xs font-medium text-white">
                    {data?.nation}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
