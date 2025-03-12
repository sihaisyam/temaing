"use client";

import { useState, useMemo, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Table() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState("id")
  const [sortOrder, setSortOrder] = useState("asc")
  const [page, setPage] = useState(1)

  const pageSize = 5;

  useEffect(() => {
    fetch("/users.json") // Pastikan file ini ada di public/users.json
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const filteredData = useMemo(() => {
    let filtered = users.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase())
    );

    filtered.sort((a:any, b:any) => {
      if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [search, sortBy, sortOrder, users]);

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, page]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const handleSort = (field : string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="p-6">
      <input
        type="text"
        placeholder="Cari nama atau email..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="mb-4 p-2 border rounded w-full"
      />

      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th
              className="border p-2 cursor-pointer"
              onClick={() => handleSort("id")}
            >
              ID {sortBy === "id" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
            <th
              className="border p-2 cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Nama {sortBy === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
            <th
              className="border p-2 cursor-pointer"
              onClick={() => handleSort("email")}
            >
              Email{" "}
              {sortBy === "email" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item: any) => (
            <tr key={item.id}>
              <td className="border p-2">{item.id}</td>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
