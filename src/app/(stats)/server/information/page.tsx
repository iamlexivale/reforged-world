"use client";

import useSWR from "swr";
import axios from "axios";

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

const Page = () => {
  const { data: network } = useSWR(
    "https://api.reforged.world/v1/network",
    fetcher,
  );

  const { data: dashboard } = useSWR(
    "http://localhost:5000/v1/dashboard",
    fetcher,
  );

  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-1 flex flex-col border border-slate-800 bg-slate-900 p-4">
        <div className="font-sans text-2xl font-bold text-white">
          {network?.network?.players_online}
        </div>
        <div className="font-sans text-base font-medium text-white">
          Players Online
        </div>
      </div>
      <div className="col-span-1 flex flex-col border border-slate-800 bg-slate-900 p-4">
        <div className="font-sans text-2xl font-bold text-white">
          {network?.network?.players_registered}
        </div>
        <div className="font-sans text-base font-medium text-white">
          Players Registered
        </div>
      </div>
      <div className="col-span-1 flex flex-col border border-slate-800 bg-slate-900 p-4">
        <div className="font-sans text-2xl font-bold text-white">?</div>
        <div className="font-sans text-base font-medium text-white">
          Profiles Registered
        </div>
      </div>
      <>{dashboard}</>
    </div>
  );
};

export default Page;
