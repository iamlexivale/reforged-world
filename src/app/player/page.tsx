"use client";

import { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { useRouter } from "next/navigation";

dayjs.extend(relativeTime);

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

const Page = () => {
  const { data } = useSWR("https://api.reforged.world/v1/players", fetcher);
  const router = useRouter();
  const [search, setSearch] = useState("");

  const modifiedData = data && {
    players: data.players.slice(0, 5),
    request: data.request,
  };

  const handleSearchChange = (e: any) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    router.push(`/player/${search}`);
  };

  return (
    <div className="h-screen bg-slate-900">
      <div className="container mx-auto flex justify-center py-16">
        <form onSubmit={handleSearchSubmit} className="flex space-x-2">
          <input
            type="text"
            className="w-96 border"
            placeholder="Enter a player name..."
            value={search}
            onChange={handleSearchChange}
          />
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            Search
          </button>
        </form>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <div className="font-sans text-base font-medium text-black">
          Latest Players
        </div>
        <div className="w-96 space-y-2">
          {modifiedData?.players.map((data: any, index: any) => (
            <Link
              href={`/player/${data.username}`}
              key={index}
              className="flex flex-row justify-between rounded border border-neutral-200 px-4 py-1 hover:cursor-pointer hover:border-neutral-400"
            >
              <div className="font-sans text-base font-medium text-black">
                {data?.username}
              </div>
              <div>
                <div className="text-right font-sans text-xs font-light text-neutral-400">
                  Last Login
                </div>
                <div className="text-right font-sans text-xs font-medium text-black">
                  {dayjs(data?.lastlogin).fromNow()}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="font-mono text-xs font-light italic text-neutral-400">
          {JSON.stringify(modifiedData?.request)}
        </div>
      </div>
    </div>
  );
};

export default Page;
