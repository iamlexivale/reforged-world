"use client";

import { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import { useData } from "@/components/DataContext";

const fetcher = (url: any, token: any) =>
  axios.get(url, { headers: { token: token } }).then((res) => res.data);

const Page = () => {
  const dataCookies = useData();

  const { data: players } = useSWR(
    "https://api.reforged.world/admin/players",
    (url) => fetcher(url, dataCookies),
  );

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil((players?.data?.length || 0) / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const paginatedPlayers = players?.data?.slice(
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
              Player
            </th>
            <th className="py-2 pl-8 text-left font-sans text-sm font-medium text-white opacity-75">
              UUID
            </th>
            <th className="py-2 pl-8 text-left font-sans text-sm font-medium text-white opacity-75">
              Group
            </th>
            <th className="py-2 pl-8 text-left font-sans text-sm font-medium text-white opacity-75">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedPlayers?.map((value: any, index: any) => (
            <tr
              key={index + 1 + (page - 1) * itemsPerPage}
              className="hover:bg-slate-800"
            >
              <td className="w-0 py-2 pl-8 text-center font-sans text-sm font-normal text-white">
                {index + 1 + (page - 1) * itemsPerPage}.
              </td>
              <td className="py-2 pl-8 text-left font-sans text-sm font-normal text-white">
                {value?.username}
              </td>
              <td className="py-2 pl-8 text-left font-sans text-sm font-normal text-white">
                {value?.uuid}
              </td>
              <td className="py-2 pl-8 text-left font-sans text-sm font-normal text-white">
                {value?.primary_group}
              </td>
              <td className="py-2 pl-8 text-left font-sans text-sm font-normal text-white">
                Edit | Delete
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
