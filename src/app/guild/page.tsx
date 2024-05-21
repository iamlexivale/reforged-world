"use client";

import useSWR from "swr";
import axios from "axios";

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

const Page = () => {
  const { data } = useSWR("https://api.reforged.world/v1/guilds", fetcher);

  return (
    <div>
      <div className="container mx-auto">Search Bar</div>
      <br />
      <div className="container mx-auto">{JSON.stringify(data)}</div>
    </div>
  );
};

export default Page;
