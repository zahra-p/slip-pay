"use client";

import { use } from "react";
import { useEffect, useState } from "react";

export default function DistributorPage(promiseProps) {
  const { name } = use(promiseProps.params);
  const [row, setRow] = useState(null);

  useEffect(() => {
    const storedRows = localStorage.getItem("branchRows");
    if (storedRows) {
      const allRows = JSON.parse(storedRows);
      const foundRow = allRows.find(
        (r) => r[2]?.toString().trim() === decodeURIComponent(name).trim()
      );
      if (foundRow) {
        setRow(foundRow);
        console.log("اطلاعات توزیع‌کننده:", foundRow);
      } else {
        console.warn("توزیع‌کننده یافت نشد");
      }
    }
  }, [name]);

  if (!row) return <div>در حال بارگذاری اطلاعات...</div>;

  // محاسبه مجموع حقوق و مزایا
  const totalBenefits =
    Number(row[24]) +
    Number(row[25]) +
    Number(row[26]) +
    Number(row[27]) +
    Number(row[28]) +
    Number(row[29]) +
    Number(row[30]) +
    Number(row[31]) +
    Number(row[22]); // بهره‌وری نهایی

  // محاسبه مجموع کسورات
  const totalDeductions = Number(row[33]) + Number(row[34]);

  return (
    <div className="max-w-5xl mx-auto mt-12 p-6 border shadow rounded bg-white font-iransans text-sm leading-6">
      <div className="flex justify-between items-start mb-4 border-b pb-2">
        <div className="text-right font-bold">شرکت گلستان ( سهامی خاص)</div>
        <div className="space-y-1 text-right">
          <div className="font-bold">فیش حقوق: اردیبهشت ماه سال 1404</div>
          <div>محل خدمت: {row[0]}</div>
        </div>
      </div>

      {/* اطلاعات پرسنلی */}
      <div className="grid grid-cols-3 gap-4 mb-4 border-b pb-2 text-right">
        <div>
          <strong>کد پرسنلی:</strong> {row[1]}
        </div>
        <div>
          <strong>نام و نام خانوادگی:</strong> {row[2]}
        </div>
        <div>
          <strong>مرکز هزینه:</strong> دفتر مرکزی
        </div>
      </div>

      <div className="grid grid-cols-6 text-center font-bold border-b pb-2 mb-4">
        <div className="col-span-1 border-l">اطلاعات کارکرد</div>
        <div className="col-span-1 border-l">حقوق و مزایا</div>
        <div className="col-span-1 border-l">کسورات</div>
        <div className="col-span-1 ">نام وام</div>
        <div className="col-span-1 ">مبلغ قسط</div>
        <div className="col-span-1">مانده</div>
      </div>

      <div className="grid grid-cols-6 text-center  border-b pb-2 mb-6">
        <div className="col-span-1 border-l"> کارکرد موثر 31 روز</div>
        <div className="col-span-1 border-l">
          <ul className=" pr-1 pl-1 text-right space-y-1">
            <li>حقوق پایه: {Number(row[24]).toLocaleString()}</li>
            <li>مزد سنوات : {Number(row[25]).toLocaleString()}</li>
            <li>حق اولاد: {Number(row[26]).toLocaleString()}</li>
            <li>حق بن: {Number(row[27]).toLocaleString()}</li>
            <li>حق مسکن: {Number(row[28]).toLocaleString()}</li>
            <li>تاهل : {Number(row[29]).toLocaleString()}</li>
            <li>ایاب و ذهاب: {Number(row[30]).toLocaleString()}</li>
            <li>حق ناهار : {Number(row[31]).toLocaleString()}</li>
            <li>
              بهره‌وری نهایی:
              {Math.ceil(Number(row[22])).toLocaleString()}
            </li>
          </ul>
        </div>

        <div className="col-span-1 border-l">
          <ul className=" pr-3 text-right space-y-1">
            <li>کسر بیمه : {Math.ceil(Number(row[33])).toLocaleString()}</li>
            <li>کسر مالیات: {Math.ceil(Number(row[34])).toLocaleString()}</li>
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-6 text-center font-bold">
        <div className="col-span-1 border-l text-right pr-2">جمع کل</div>
        <div className="col-span-1 border-l text-right pr-2">
          {Math.ceil(totalBenefits).toLocaleString()}
        </div>
        <div className="col-span-1 border-l text-right pr-2">
          {Math.ceil(totalDeductions).toLocaleString()}
        </div>
        <div className="col-span-3 text-right pr-2">
          <strong>خالص دریافتی: </strong>
          <span className="text-green-600 font-bold text-lg">
            {Math.ceil(Number(row[37])).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
