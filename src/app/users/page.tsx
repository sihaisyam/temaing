"use client";
// pages/users.tsx
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/users.json") // Pastikan file ini ada di public/users.json
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()));

  const [isOpen, setIsOpen] = useState(false);
  const actionModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <div id="default-modal" className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50">
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Tambah Data</h3>
                <button type="button" onClick={actionModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form className="space-y-4">
                <div className="p-4 md:p-5 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                      </label>
                      <input type="text" id="username" name="username" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input type="email" id="email" name="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button onClick={actionModal} className="py-2.5 px-5  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                    Kembali
                  </button>
                  <button className="text-white ms-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Simpan</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen p-8 bg-gray-100">
        <div className="flex justify-between items-center mb-5">
          <div>
            {/* Header */}
            <h1 className="text-2xl font-bold">Users</h1>
          </div>

          <div>
            <button onClick={actionModal} className="bg-black hover:bg-gray-600 text-white px-4 py-2 rounded-md">
              Tambah Data
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <input type="text" placeholder="Search by name..." className="mb-4 p-2 border rounded w-full" value={search} onChange={(e) => setSearch(e.target.value)} />
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow-lg">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-2 px-4 border">ID</th>
                  <th className="py-2 px-4 border">Name</th>
                  <th className="py-2 px-4 border">Email</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4 border text-center">{user.id}</td>
                    <td className="py-2 px-4 border">{user.name}</td>
                    <td className="py-2 px-4 border">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersPage;
