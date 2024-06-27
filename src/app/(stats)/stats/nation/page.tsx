"use client";

import { useState } from "react";
import useSWR from "swr";
import axios from "axios";
// import PlayerGroup from "@/components/PlayerGroup";
import { useRouter } from "next/navigation";

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

const Page = () => {
  const router = useRouter();

  const { data: nations } = useSWR(
    "https://api.reforged.world/v1/nations",
    fetcher,
  );

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil((nations?.nations?.length || 0) / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const paginatedNations = nations?.nations?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  return (
    <>
      <table className="w-full table-auto border border-slate-800">
        <thead className="bg-slate-900">
          <tr>
            <th className="py-2 pl-8 text-center font-sans text-sm font-medium text-white opacity-75">
              No
            </th>
            <th className="py-2 pl-8 text-left font-sans text-sm font-medium text-white opacity-75">
              Nation
            </th>
            <th className="py-2 pl-8 text-left font-sans text-sm font-medium text-white opacity-75">
              Capital
            </th>
            <th className="py-2 pl-8 text-left font-sans text-sm font-medium text-white opacity-75">
              Board
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedNations?.map((value: any, index: any) => (
            <tr
              key={index + 1 + (page - 1) * itemsPerPage}
              className="hover:cursor-pointer hover:bg-slate-800"
              onClick={() => router.push(`/stats/nation/${value?.name}`)}
            >
              <td className="w-0 py-2 pl-8 text-center font-sans text-sm font-normal text-white">
                {index + 1 + (page - 1) * itemsPerPage}.
              </td>
              <td className="py-2 pl-8 text-left font-sans text-sm font-normal text-white">
                {value?.name}
              </td>
              <td className="py-2 pl-8 text-left font-sans text-sm font-normal text-white">
                {value?.capital}
              </td>
              <td className="py-2 pl-8 text-left font-sans text-sm font-normal text-white">
                {value?.nationBoard}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex items-center justify-between">
        <button
          className="bg-slate-800 px-4 py-1 font-sans text-sm font-normal text-white hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Sebelumnya
        </button>
        <span className="font-sans text-sm font-normal text-white opacity-50">
          Halaman {page} dari {totalPages}
        </span>
        <button
          className="bg-slate-800 px-4 py-1 font-sans text-sm font-normal text-white hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Berikutnya
        </button>
      </div>
    </>
  );
};

export default Page;
