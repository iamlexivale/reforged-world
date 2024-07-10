"use client";

import { useState, Fragment } from "react";
import useSWR from "swr";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import { useData } from "@/components/DataContext";

const fetcher = (url: any, token: any) =>
  axios.get(url, { headers: { token: token } }).then((res) => res.data);

const Page = () => {
  const dataCookies = useData();
  const {
    data: players,
    error,
    mutate,
  } = useSWR("https://api.reforged.world/admin/players", (url) =>
    fetcher(url, dataCookies),
  );

  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newPlayer, setNewPlayer] = useState({
    NICKNAME: "",
  });

  const itemsPerPage = 10;

  const filteredPlayers = players?.data?.filter((player: any) =>
    player.NICKNAME.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil((filteredPlayers?.length || 0) / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setNewPlayer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("https://api.reforged.world/admin/players", newPlayer, {
        headers: { token: dataCookies },
      });
      mutate(); // re-fetch the players data
      closeModal(); // close the modal
    } catch (error) {
      console.error("Failed to create player", error);
    }
  };

  const paginatedPlayers = filteredPlayers?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <div className="mb-4 flex justify-end space-x-4">
        <input
          type="text"
          placeholder="Search Player"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded border border-slate-800 bg-slate-900 px-2 font-sans text-sm font-normal text-white focus:outline-none"
        />
        <div
          className="cursor-pointer bg-slate-800 px-4 py-1 font-sans text-sm font-normal text-white hover:bg-slate-900"
          onClick={openModal}
        >
          Create Account
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-300"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-end p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-800 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white"
                  >
                    Create New Player
                  </Dialog.Title>
                  <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-4">
                      <label className="block font-sans text-sm font-medium text-white">
                        Nickname:
                      </label>
                      <input
                        type="text"
                        name="NICKNAME"
                        value={newPlayer.NICKNAME}
                        onChange={handleChange}
                        className="mt-1 w-full rounded border border-slate-800 px-2 py-1 text-black"
                        required
                      />
                    </div>
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

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
              IP Address
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
                {value?.NICKNAME}
              </td>
              <td className="py-2 pl-8 text-left font-sans text-sm font-normal text-white">
                {value?.UUID}
              </td>
              <td className="py-2 pl-8 text-left font-sans text-sm font-normal text-white">
                {value?.IP}
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
