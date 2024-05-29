"use client";

import useSWR from "swr";
import axios from "axios";
import { usePathname } from "next/navigation";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Page = () => {
  const pathname = usePathname();
  const pathArray = pathname.split("/").filter(Boolean);

  const { data } = useSWR(
    `https://api.reforged.world/v1/player/${pathArray[1]}/${pathArray[2]}`,
    fetcher,
  );

  return (
    <div className="h-screen bg-slate-900">
      <div className="container mx-auto flex w-5/6 flex-col border pt-14">
        <div>
          <div>{data?.player?.username}</div>
          <div>{data?.player?.uuid}</div>
          <div>{data && dayjs(data?.lastlogin).fromNow()}</div>
        </div>
        <div className="border">
          <div className="flex flex-row space-x-4">
            <div>{data?.player?.profile?.name}</div>
            <div>{data?.player?.profile?.class}</div>
          </div>
          <div className="flex flex-row space-x-4">
            <div>Level {data?.player?.profile?.level}</div>
            <div>{data?.player?.profile?.exp} EXP</div>
          </div>
          <div>{data?.player?.profile?.balance} coins</div>
        </div>
        {/*  */}
        <div>
          <div className="font-bold">Attributes</div>
          <div>
            <div>dexterity {data?.player?.profile?.attributes?.dexterity}</div>
            <div>luck {data?.player?.profile?.attributes?.luck}</div>
            <div>strength {data?.player?.profile?.attributes?.strength}</div>
            <div>vitality {data?.player?.profile?.attributes?.vitality}</div>
            <div>
              intelligence {data?.player?.profile?.attributes?.intelligence}
            </div>
          </div>
        </div>
        <div>
          <div className="font-bold">Professions</div>
          <div>
            <div>
              smithing {data?.player?.profile?.professions.smithing?.exp} (Lvl.{" "}
              {data?.player?.profile?.professions.smithing?.level})
            </div>
            <div>
              enchanting {data?.player?.profile?.professions.enchanting?.exp}{" "}
              (Lvl. {data?.player?.profile?.professions.enchanting?.level})
            </div>
            <div>
              woodcutting {data?.player?.profile?.professions.woodcutting?.exp}
              (Lvl. {data?.player?.profile?.professions.woodcutting?.level})
            </div>
            <div>
              fishing {data?.player?.profile?.professions.fishing?.exp} (Lvl.{" "}
              {data?.player?.profile?.professions.fishing?.level})
            </div>
            <div>
              farming {data?.player?.profile?.professions.farming?.exp} (Lvl.{" "}
              {data?.player?.profile?.professions.farming?.level})
            </div>
            <div>
              alchemy {data?.player?.profile?.professions.alchemy?.exp} (Lvl.{" "}
              {data?.player?.profile?.professions.alchemy?.level})
            </div>
            <div>
              mining {data?.player?.profile?.professions.mining?.exp} (Lvl.{" "}
              {data?.player?.profile?.professions.mining?.level})
            </div>
            <div>
              smelting {data?.player?.profile?.professions.smelting?.exp} (Lvl.{" "}
              {data?.player?.profile?.professions.smelting?.level})
            </div>
          </div>
        </div>
        {/*  */}
      </div>
      <div className="font-mono text-xs font-light italic text-neutral-400">
        {JSON.stringify(data?.request)}
      </div>
    </div>
  );
};

export default Page;
