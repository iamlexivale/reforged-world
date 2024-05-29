"use client";

import useSWR from "swr";
import axios from "axios";

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

const Home = () => {
  const { data } = useSWR("https://api.reforged.world/v1/network", fetcher);

  return (
    <div className="container mx-auto">
      <div className="space-y-16 py-8">
        <div className="space-y-0">
          <div className="text-center font-sans text-8xl font-bold antialiased">
            <div className="bg-gradient-to-r from-fuchsia-600  via-red-500 to-purple-600 bg-clip-text text-transparent">
              Reforged World
            </div>
          </div>
          <div className="text-center font-sans text-2xl font-medium text-black text-opacity-60">
            Where Every Block Tells a Story
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-center font-sans text-sm font-normal italic text-black text-opacity-40">
            {data?.network?.players_registered || 0} players has been joined...
          </div>
          <div className="flex flex-row justify-center">
            <div className="cursor-pointer rounded border border-red-800 bg-white px-8 py-1 text-center font-sans text-base font-medium text-red-800 hover:border-red-900 hover:bg-red-50 hover:text-red-900">
              play.reforged.world
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
