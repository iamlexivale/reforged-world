"use client";

import useSWR from "swr";
import axios from "axios";
import { usePathname } from "next/navigation";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

const Page = () => {
  const pathname = usePathname();
  const pathArray = pathname.split("/").filter(Boolean);

  const { data } = useSWR(
    `https://api.reforged.world/v1/player/${pathArray[1]}`,
    fetcher,
  );

  return (
    <div className="container mx-auto">
      <div className="mx-auto flex w-5/6 flex-col border">
        <div>
          <div>{data?.player?.username}</div>
          <div>{data?.player?.uuid}</div>
          <div>{data && dayjs(data?.lastlogin).fromNow()}</div>
        </div>
        {data?.player?.profiles.map((data: any, index: any) => (
          <Link
            href={`/player/${pathArray[1]}/${data?.uuid}`}
            key={index + 1}
            className="border"
          >
            <div className="flex flex-row space-x-4">
              <div>{data?.name}</div>
              <div>{data?.class}</div>
            </div>
            <div className="flex flex-row space-x-4">
              <div>Level {data?.level}</div>
              <div>{data?.exp} EXP</div>
            </div>
            <div>{data?.balance} coins</div>
          </Link>
        ))}
      </div>
      <div className="font-mono text-xs font-light italic text-neutral-400">
        {JSON.stringify(data?.request)}
      </div>
    </div>
  );
};

export default Page;
