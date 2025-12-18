// 📁 /app/page.js
"use client";

import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useRouter } from "next/navigation";

export default function Home() {
  const [branches, setBranches] = useState([]);
  const [fileName, setFileName] = useState("فایلی انتخاب نشده است");
  const [isLoading, setIsLoading] = useState(false);
  const [allRows, setAllRows] = useState([]);
  const router = useRouter();

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setIsLoading(true);

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets["main"];
    if (!worksheet) {
      alert('Sheet با نام "main" پیدا نشد.');
      setIsLoading(false);
      return;
    }
    const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const dataRows = rows.slice(5); // حذف 5 سطر اول
    setAllRows(dataRows);

    const firstColumn = dataRows
      .map((row) => row[0])
      .filter(
        (v) => v !== undefined && v !== null && v.toString().trim() !== ""
      ) // حذف مقادیر نامعتبر یا خالی
      .map((v) => v.toString().trim())
      .filter((v, i, a) => a.indexOf(v) === i); // حذف مقادیر تکراری

    const sortedBranches = [...firstColumn].sort((a, b) =>
      a.localeCompare(b, "fa")
    );

    console.log("sortedBranches:", sortedBranches);
    setBranches(sortedBranches);
    setIsLoading(false);
  };

  const handleBranchClick = (branchName) => {
    const filtered = allRows.filter((row) => row[0] === branchName);
    if (filtered.length > 0) {
      localStorage.setItem("selectedBranch", branchName);
      localStorage.setItem("branchRows", JSON.stringify(filtered));
      router.push(`/branch/${encodeURIComponent(branchName)}`);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto text-right" dir="rtl">
      <h1 className="text-2xl font-bold text-center mb-8">
        آپلود فایل اکسل کارکنان
      </h1>

      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <label htmlFor="excel-upload">
          <span className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer">
            انتخاب فایل
          </span>
        </label>
        <input
          id="excel-upload"
          type="file"
          onChange={handleFileUpload}
          accept=".xlsx,.xls"
          className="hidden"
        />
        <span className="border border-gray-300 p-2 rounded text-sm " dir="ltr">
          {fileName}
        </span>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-600">در حال پردازش فایل...</p>
      ) : (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">
            شعبه مورد نظر را انتخاب کنید
          </h2>
          <table className="w-full border border-gray-300 rounded text-right">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border-b">نام شعبه</th>
              </tr>
            </thead>
            <tbody>
              {branches.map((branch, idx) => (
                <tr
                  key={idx}
                  onClick={() => handleBranchClick(branch)}
                  className="cursor-pointer hover:bg-blue-50 transition"
                >
                  <td className="p-2 border-b text-blue-800 font-medium">
                    {branch}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
