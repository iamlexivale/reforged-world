"use client";

import useSWR from "swr";
import axios from "axios";

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

const Home = () => {
  const { data } = useSWR("https://api.reforged.world/v1/network", fetcher);

  return (
    <div className="relative space-y-16 py-32 md:mt-14">
      <div className="space-y-0">
        <div className="text-center font-sans text-8xl font-bold antialiased">
          <div className="bg-gradient-to-r from-fuchsia-600 via-red-500 to-purple-600 bg-clip-text text-transparent">
            Reforged World
          </div>
        </div>
        <div className="text-center font-sans text-2xl font-medium text-white text-opacity-80">
          Where Every Block Tells a Story
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-center font-sans text-sm font-normal italic text-white text-opacity-60">
          {data?.network?.players_registered || 0} players have joined...
        </div>
        <div className="flex flex-row justify-center">
          <div
            onClick={() => {
              navigator.clipboard.writeText("play.reforged.world");
              alert("Copied to clipboard");
            }}
            className="cursor-pointer rounded-sm border border-white bg-transparent px-8 py-1 text-center font-sans text-base font-medium text-white"
          >
            play.reforged.world
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
