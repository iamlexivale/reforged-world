"use client";

import { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import Link from "next/link";

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

const StatsTown = () => {
  const { data: towns } = useSWR(
    "https://api.reforged.world/v1/towns",
    fetcher,
  );

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil((towns?.towns?.length || 0) / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const paginatedTowns = towns?.towns?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  return (
    <div>
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
              Mayor
            </th>
            <th className="px-8 py-2 text-left font-sans text-sm font-medium text-white opacity-75">
              Nation
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedTowns?.map((value: any, index: any) => (
            <tr key={index + 1 + (page - 1) * itemsPerPage}>
              <td className="px-8 py-1 text-left font-sans text-sm font-normal text-white">
                {index + 1 + (page - 1) * itemsPerPage}
              </td>
              <td className="px-8 py-1 text-left font-sans text-sm font-normal text-white">
                <Link href={`/stats/town/${value?.name}`}>{value?.name}</Link>
              </td>
              <td className="px-8 py-1 text-left font-sans text-sm font-normal text-white">
                {value?.mayor}
              </td>
              <td className="px-8 py-1 text-left font-sans text-sm font-normal text-white">
                {value?.nation}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex items-center justify-between">
        <button
          className="bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-600 disabled:opacity-50"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-sm font-medium text-white">
          Page {page} of {totalPages}
        </span>
        <button
          className="bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-600 disabled:opacity-50"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StatsTown;
