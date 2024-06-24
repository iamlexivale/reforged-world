"use client";

import useSWR from "swr";
import axios from "axios";

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

const Page = () => {
  const { data: players } = useSWR(
    "https://api.reforged.world/v1/network",
    fetcher,
  );

  return (
    <div>
      <div className="text-white">
        Players Online: {players?.network?.players_online}
      </div>
      <div className="text-white">
        Players Registered: {players?.network?.players_registered}
      </div>
    </div>
  );
};

export default Page;
