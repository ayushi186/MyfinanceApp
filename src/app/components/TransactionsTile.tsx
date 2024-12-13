import { dateCalculator } from "@/helpers/helperfunctions";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import chartdata from "@/app/data.json";
import { useSelector } from "react-redux";

export default function TransactionsTile() {
  type Itrans = {
    avatar: string;
    name: string;
    category: string;
    date: string;
    amount: number;
    recurring: boolean;
  };

  const trs = useSelector((state: any) => state.transactions.transactions);

  return (
    <div key={v4()} className="p-5">
      {trs?.slice(0, 4)?.map((trans: Itrans) => {
        let amountabs =
          trans.amount < 0
            ? `- $${Math.abs(trans.amount)}`
            : ` $${trans.amount}`;

        const datearray = dateCalculator(trans.date);
        return (
          <div
            key={v4()}
            style={{ borderBottom: "1px solid lightgrey" }}
            className="flex justify-between items-center">
            <div className="flex pt-[16px] pb-[16px] flex-1">
              <img
                className="rounded-2xl h-[30px] w-[30px]"
                src={trans.avatar}
                alt="profile-image"
              />
              <span className="pl-3">{trans.name}</span>
            </div>
            <div className="flex flex-col">
              <div>{amountabs}</div>
              <div className="flex-1">
                {datearray.day} {datearray.month} {datearray.year}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
