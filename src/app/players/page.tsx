"use client";

import useSWR from "swr";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

const Page = () => {
  const { data, isLoading } = useSWR(
    "https://api.reforged.world/v1/players",
    fetcher,
  );

  const modifiedData = data
    ? {
        players: data.players.slice(0, 5),
        request: data.request,
      }
    : null; // skeleton loading

  if (isLoading) return <>loading</>;

  return (
    <div className="container mx-auto">
      <div className="flex justify-center py-16">
        <input
          type="text"
          className="w-96 border"
          placeholder="Enter a player name..."
        />
      </div>

      <div className="flex flex-col items-center space-y-4">
        <div className="font-sans text-base font-medium text-black">
          Latest Players
        </div>
        <div className="w-96 space-y-2">
          {modifiedData?.players.map((data: any, index: any) => (
            <div
              key={index}
              className="flex flex-row justify-between rounded border border-neutral-200 px-4 py-1 hover:cursor-pointer hover:border-neutral-400"
            >
              <div className="font-sans text-lg font-bold text-black">
                {data.username}
              </div>
              <div>
                <div className="text-right font-sans text-sm font-light text-neutral-400">
                  Last Login
                </div>
                <div className="text-right font-sans text-sm font-normal text-black">
                  {dayjs(data.lastlogin).fromNow()}
                </div>
              </div>
            </div>
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
