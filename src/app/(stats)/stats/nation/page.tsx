"use client";

import useSWR from "swr";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const fetcher = (url: any) => axios.get(url).then((res) => res.data);
dayjs.extend(relativeTime);

const StatsNation = () => {
  const { data: players } = useSWR(
    "https://api.reforged.world/v1/nations",
    fetcher,
  );

  return (
    <table className="w-full table-auto border border-slate-800">
      <thead className="bg-slate-900">
        <tr>
          <th className="px-8 py-2 text-left font-sans text-sm font-medium text-white opacity-75">
            No
          </th>
          <th className="px-8 py-2 text-left font-sans text-sm font-medium text-white opacity-75">
            Name
          </th>
          <th className="px-8 py-2 text-left font-sans text-sm font-medium text-white opacity-75">
            Capital
          </th>
          <th className="px-8 py-2 text-left font-sans text-sm font-medium text-white opacity-75">
            Registered
          </th>
        </tr>
      </thead>
      <tbody>
        {players?.nations?.map((value: any, index: any) => (
          <tr key={index + 1}>
            <td className="px-8 py-1 text-left font-sans text-sm font-normal text-white">
              {index + 1}
            </td>
            <td className="px-8 py-1 text-left font-sans text-sm font-normal text-white">
              {value?.name}
            </td>
            <td className="px-8 py-1 text-left font-sans text-sm font-normal text-white">
              {value?.capital}
            </td>
            <td className="px-8 py-1 text-left font-sans text-sm font-normal text-white">
              {dayjs(value?.registered).fromNow()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StatsNation;
