"use client";

import { useState, Fragment } from "react";
import useSWR from "swr";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import { useData } from "@/components/DataContext";

const fetcher = (url: any, token: any) =>
  axios.get(url, { headers: { token: token } }).then((res) => res.data);

const Page = () => {
  const dataCookies = useData();

  const { data: players, mutate } = useSWR(
    "https://api.reforged.world/admin/players",
    (url) => fetcher(url, dataCookies),
  );

  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [changePass, setChangePass] = useState<any>();
  const [dataEdit, setDataEdit] = useState<any>();
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.put(
        "https://api.reforged.world/admin/players/update-password",
        {
          nickname: dataEdit?.NICKNAME,
          newPassword: changePass,
        },
        {
          headers: { token: dataCookies },
        },
      );
      mutate();
      setIsOpen(false);
      toast("Berhasil Merubah Password", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      toast("Gagal Merubah Password", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const paginatedPlayers = filteredPlayers?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  return (
    <>
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          placeholder="Search Player"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded border border-slate-800 bg-slate-900 px-2 py-1 font-sans text-sm font-normal text-white focus:outline-none"
        />
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOpen(false)}
        >
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
            <div className="flex min-h-full items-center justify-end text-center">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="h-screen w-1/3 transform overflow-hidden bg-slate-900 p-12 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white"
                  >
                    Edit Password
                  </Dialog.Title>
                  <form onSubmit={handleSubmit} className="mt-12 space-y-6">
                    <div className="space-y-2">
                      <label className="block font-sans text-sm font-medium text-white">
                        Account
                      </label>
                      <div className="space-y-4 border border-slate-700 bg-slate-800 p-4 text-white">
                        <div>
                          <div className="font-sans text-sm font-light text-white opacity-50">
                            Player
                          </div>
                          <div className="font-sans text-sm font-medium text-white">
                            {dataEdit?.NICKNAME}
                          </div>
                        </div>
                        <div>
                          <div className="font-sans text-sm font-light text-white opacity-50">
                            IP Address
                          </div>
                          <div className="font-sans text-sm font-medium text-white">
                            {dataEdit?.IP}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <label className="block font-sans text-sm font-medium text-white">
                        Password
                      </label>
                      <input
                        type="password"
                        name="Password"
                        value={changePass}
                        onChange={(e) => setChangePass(e.target.value)}
                        className="mt-1 w-full border border-slate-700 bg-slate-800 px-2 py-1 font-sans text-sm font-medium text-white focus:outline-none"
                        required
                      />
                    </div>
                    <div className="space-x-4">
                      <button
                        type="submit"
                        className="bg-slate-800 px-4 py-1 font-sans text-sm font-normal text-white hover:bg-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Ganti Password
                      </button>
                      <button
                        type="button"
                        className="bg-slate-800 px-4 py-1 font-sans text-sm font-normal text-white hover:bg-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
                        onClick={() => setIsOpen(false)}
                      >
                        Batal
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
            <th className="py-2 pl-8 text-center font-sans text-sm font-medium text-white opacity-75">
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
              <td className="py-2 pl-8 text-center font-sans text-sm font-normal text-white">
                <div
                  onClick={() => {
                    setIsOpen(true);
                    setDataEdit(value);
                  }}
                  className="text-blue-500 hover:cursor-pointer hover:underline"
                >
                  Edit
                </div>
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
