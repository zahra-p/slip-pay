"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function BranchPage() {
  const { branch } = useParams();
  const router = useRouter();
  const [distributors, setDistributors] = useState([]);

  useEffect(() => {
    const storedRows = localStorage.getItem("branchRows");
    if (storedRows) {
      const rows = JSON.parse(storedRows);
      // گرفتن نام توزیع‌کننده از ستون سوم (index 2)
      const names = rows
        .map((row) => row[2]) // ستون سوم
        .filter((name, index, self) => name && self.indexOf(name) === index); // حذف تکراری‌ها
      setDistributors(names);
    }
  }, []);

  const handleClick = (name) => {
    localStorage.setItem("selectedDistributor", name);
    router.push(
      `/branch/${encodeURIComponent(branch)}/distributor/${encodeURIComponent(
        name
      )}`
    );
  };

  return (
    <div className="p-6 max-w-2xl mx-auto text-right" dir="rtl">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
        توزیع‌کننده‌های شعبه: {decodeURIComponent(branch)}
      </h1>

      {distributors.length === 0 ? (
        <p className="text-center text-gray-600">
          هیچ توزیع‌کننده‌ای یافت نشد.
        </p>
      ) : (
        <table className="w-full border border-gray-300 rounded text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border-b">نام توزیع‌کننده</th>
            </tr>
          </thead>
          <tbody>
            {distributors.map((name, i) => (
              <tr
                key={i}
                onClick={() => handleClick(name)}
                className="cursor-pointer hover:bg-blue-50 transition"
              >
                <td className="p-2 border-b text-blue-800 font-medium">
                  {name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
