"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import { useData } from "@/components/DataContext";

const fetcher = (url: any, token: any) =>
  axios.get(url, { headers: { token: token } }).then((res) => res.data);

const customOrder = [
  "admin",
  "mod",
  "helper",
  "media",
  "mvp",
  "vip2",
  "vip1",
  "vip",
  "default",
];

const displayNames = {
  admin: "Seneschal",
  mod: "Guardian",
  helper: "Apprentice",
  media: "Lorekeeper",
  mvp: "MVP",
  vip2: "VIP++",
  vip1: "VIP+",
  vip: "VIP",
  default: "Peasant",
};

const initializeGroupCounts = () => {
  const initialCounts: { [key: string]: number } = {};
  customOrder.forEach((group) => {
    initialCounts[group] = 0;
  });
  return initialCounts;
};

const Page = () => {
  const dataCookies = useData();

  const { data: players, error } = useSWR(
    "https://api.reforged.world/admin/dashboard",
    (url) => fetcher(url, dataCookies),
  );

  const [groupCounts, setGroupCounts] = useState<any>(initializeGroupCounts);

  useEffect(() => {
    if (players) {
      const counts = players.data.reduce((acc: any, player: any) => {
        acc[player.primary_group] = (acc[player.primary_group] || 0) + 1;
        return acc;
      }, initializeGroupCounts());
      setGroupCounts(counts);
    }
  }, [players]);

  if (error) return <div>Failed to load</div>;
  if (!players) return <div>Loading...</div>;

  const tableRows = customOrder.map((group, index) => (
    <tr key={group} className="border-b border-slate-800">
      <td className="px-4 py-2 text-center">{index + 1}</td>
      <td className="px-4 py-2 text-left">
        {displayNames[group as keyof typeof displayNames] || group}
      </td>
      <td className="px-4 py-2 text-center">{groupCounts[group]}</td>
    </tr>
  ));

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-slate-900 text-white">
        <thead>
          <tr className="border-b border-slate-800">
            <th className="px-4 py-2 text-center">NO</th>
            <th className="px-4 py-2 text-left">GROUP</th>
            <th className="px-4 py-2 text-center">COUNT</th>
          </tr>
        </thead>
        <tbody>
          {tableRows.length > 0 ? (
            tableRows
          ) : (
            <tr>
              <td colSpan={3} className="px-4 py-2 text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
