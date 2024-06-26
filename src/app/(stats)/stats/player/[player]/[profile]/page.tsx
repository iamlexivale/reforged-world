"use client";

import useSWR from "swr";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();

  const url = pathname?.split("/");
  const profileName = url.pop();
  const playerName = url[url.length - 1];

  const { data: players } = useSWR(
    `https://api.reforged.world/v1/player/${playerName}/${profileName}`,
    fetcher,
  );

  return (
    <div className="space-y-4 text-white">
      <div
        className="font-sans text-xs font-bold text-white opacity-50 hover:cursor-pointer hover:opacity-60"
        onClick={() => router.push(`/stats/player/${playerName}`)}
      >
        BACK TO {playerName.toUpperCase()}
      </div>
      <div className="space-y-4 rounded border border-white border-opacity-30 p-4">
        <div className="flex flex-col">
          <div>{players?.player?.profile?.name}</div>
          <div>{players?.player?.profile?.class}</div>
          <div>{players?.player?.profile?.level}</div>
        </div>
        <div className="flex flex-col">
          <div>Strength: {players?.player?.profile?.attributes?.strength}</div>
          <div>Vitality: {players?.player?.profile?.attributes?.vitality}</div>
          <div>
            Dexterity: {players?.player?.profile?.attributes?.dexterity}
          </div>
          <div>
            Intelligence: {players?.player?.profile?.attributes?.intelligence}
          </div>
          <div>Luck: {players?.player?.profile?.attributes?.luck}</div>
        </div>
        <div className="flex flex-col">
          <div>
            Slayer: {players?.player?.profile?.professions?.slayer?.level}
          </div>
          <div>
            Mining: {players?.player?.profile?.professions?.mining?.level}
          </div>
          <div>
            Farming: {players?.player?.profile?.professions?.farming?.level}
          </div>
          <div>
            Woodcutting:{" "}
            {players?.player?.profile?.professions?.woodcutting?.level}
          </div>
          <div>
            Fishing: {players?.player?.profile?.professions?.fishing?.level}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
