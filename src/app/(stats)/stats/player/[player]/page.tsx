"use client";

import useSWR from "swr";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import PlayerGroup from "@/components/PlayerGroup";

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();

  const playerName = pathname?.split("/").pop();

  const { data: players } = useSWR(
    `https://api.reforged.world/v1/player/${playerName}`,
    fetcher,
  );

  return (
    <div className="space-y-4 text-white">
      <div
        className="font-sans text-xs font-bold text-white opacity-50 hover:cursor-pointer hover:opacity-60"
        onClick={() => router.push(`/stats/player/`)}
      >
        BACK TO PLAYER LIST
      </div>
      <div className="space-y-4 border border-slate-800 bg-slate-900 p-4">
        <div>
          <div>
            <PlayerGroup primaryGroup={players?.player?.primary_group} />{" "}
            {players?.player?.username}
          </div>
          <div>{players?.player?.uuid}</div>
        </div>
        <div className="grid grid-cols-3 gap-8">
          {players?.player?.profiles?.map((profile: any) => (
            <div
              key={profile.uuid}
              className="col-span-1 border border-slate-800 bg-slate-800 p-4 hover:cursor-pointer"
              onClick={() =>
                router.push(`/stats/player/${playerName}/${profile.uuid}`)
              }
            >
              <div className="font-sans text-sm font-medium text-white">
                {profile.name}
              </div>
              <div className="flex flex-row space-x-1">
                <div className="font-sans text-sm font-normal text-white opacity-80">
                  {profile.class}
                </div>
                <div className="font-sans text-sm font-normal text-white opacity-80">
                  (Level {profile.level})
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
