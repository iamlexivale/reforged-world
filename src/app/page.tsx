"use client";

import useSWR from "swr";
import axios from "axios";
import { toast } from "react-toastify";
import React from "react";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Home = () => {
  const { data } = useSWR("https://api.reforged.world/v1/network", fetcher);

  const handleCopy = () => {
    navigator.clipboard.writeText("play.reforged.world");
    toast("Copied to clipboard", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <div className="relative space-y-8 py-32 md:mt-14">
      <div className="space-y-0">
        <div className="text-center font-sans text-9xl font-bold antialiased">
          <div className="bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">
            Reforged
          </div>
        </div>
        <div className="text-center font-sans text-2xl font-medium text-white text-opacity-75">
          Where Every Block Tells a Story
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-center font-sans text-sm font-normal italic text-white text-opacity-75">
          {data?.network?.players_registered || 0} players have joined...
        </div>
        <div className="flex flex-row justify-center">
          <div
            onClick={handleCopy}
            className="cursor-pointer rounded bg-slate-800 px-8 py-1.5 text-center font-sans text-base font-medium text-white shadow shadow-slate-900 hover:bg-slate-900"
          >
            play.reforged.world
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
