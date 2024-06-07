"use client";

import { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const fetcher = (url: any) => axios.get(url).then((res) => res.data);
dayjs.extend(relativeTime);

const Table = ({ name1, name2, name3, data }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  if (!data || data.length === 0) {
    return <div className="text-white">Please wait...</div>;
  }

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < data.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <>
      <table className="w-full table-auto">
        <thead className="bg-slate-950">
          <tr>
            <th className="px-4 py-2 text-left font-sans text-base font-medium text-white">
              No
            </th>
            <th className="px-4 py-2 text-left font-sans text-base font-medium text-white">
              {name1}
            </th>
            <th className="px-4 py-2 text-left font-sans text-base font-medium text-white">
              {name2}
            </th>
            <th className="px-4 py-2 text-left font-sans text-base font-medium text-white">
              {name3}
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item: any, index: any) => (
            <tr key={index} className="hover:bg-slate-800">
              <td className="px-4 py-2 text-left font-sans text-base font-normal text-white">
                {(currentPage - 1) * itemsPerPage + index + 1}.
              </td>
              <td className="px-4 py-2 text-left font-sans text-base font-normal text-white">
                {item?.name || item?.username}
              </td>
              <td className="px-4 py-2 text-left font-sans text-base font-normal text-white">
                {item?.mayor || item?.uuid || item?.capital}
              </td>
              <td className="px-4 py-2 text-left font-sans text-base font-normal text-white">
                {item?.nation ||
                  dayjs(item?.lastlogin).fromNow() ||
                  dayjs(item?.registered).fromNow()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-end space-x-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="rounded bg-slate-800 px-4 py-1 font-sans text-base font-normal text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage * itemsPerPage >= data.length}
          className="rounded bg-slate-800 px-4 py-1 font-sans text-base font-normal text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
};

const Page = () => {
  const { data: towns } = useSWR(
    "https://api.reforged.world/v1/towns",
    fetcher,
  );
  const { data: players } = useSWR(
    "https://api.reforged.world/v1/players",
    fetcher,
  );
  const { data: nations } = useSWR(
    "https://api.reforged.world/v1/nations",
    fetcher,
  );

  return (
    <div className="h-screen bg-slate-900 pt-16">
      <div className="mx-auto px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <TabGroup className="space-y-4">
          <TabList className="flex flex-row space-x-4">
            <Tab
              className={({ selected }) =>
                selected
                  ? "rounded border border-slate-800 bg-slate-800 px-4 py-1 font-sans text-base font-medium text-white focus:outline-none"
                  : "rounded border border-slate-950 bg-slate-950 px-4 py-1 font-sans text-base font-medium text-white focus:outline-none"
              }
            >
              Town
            </Tab>
            <Tab
              className={({ selected }) =>
                selected
                  ? "rounded border border-slate-800 bg-slate-800 px-4 py-1 font-sans text-base font-medium text-white focus:outline-none"
                  : "rounded border border-slate-950 bg-slate-950 px-4 py-1 font-sans text-base font-medium text-white focus:outline-none"
              }
            >
              Player
            </Tab>
            <Tab
              className={({ selected }) =>
                selected
                  ? "rounded border border-slate-800 bg-slate-800 px-4 py-1 font-sans text-base font-medium text-white focus:outline-none"
                  : "rounded border border-slate-950 bg-slate-950 px-4 py-1 font-sans text-base font-medium text-white focus:outline-none"
              }
            >
              Nation
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Table
                name1="Town"
                name2="Mayor"
                name3="Nation"
                data={towns?.towns}
              />
            </TabPanel>
            <TabPanel>
              <Table
                name1="Player"
                name2="UUID"
                name3="Last Login"
                data={players?.players}
              />
            </TabPanel>
            <TabPanel>
              <Table
                name1="Nation"
                name2="Capital"
                name3="Registered"
                data={nations?.nations}
              />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
};

export default Page;
