//import { promises as fs } from "fs";
"use client";

import data from "@/app/data.json";
import {
  dateCalculator,
  sortByAmount,
  sortByDate,
  sortBYName,
} from "@/helpers/helperfunctions";
import { useEffect, useState } from "react";

export type transaction = {
  amount: number;
  avatar: string;
  category: string;
  date: string;
  name: string;
  recurring: boolean;
};

// type Icategory = {
//   value: string | undefined | null;
//   label: string | undefined | null;
// };

export default function Page() {
  const [transactions, setTransactions] = useState<transaction[]>([]);
  const [categories, setCategories] = useState<string[]>();
  const [nPage, setNPage] = useState<any>();
  const [dropdownflag, setDropDownFlag] = useState<boolean>(false);
  const [filteredTrans, setFilteredTrans] = useState<
    transaction[] | undefined
  >();

  useEffect(() => {
    setTransactions(data?.transactions);
    setFilteredTrans(data?.transactions);
  }, []);

  useEffect(() => {
    if (filteredTrans) {
      const nPage = Math.ceil(filteredTrans?.length / recordPerPage);
      setNPage(nPage);
    }
  }, [filteredTrans]);
  useEffect(() => {
    if (transactions && !dropdownflag) {
      const getcategories = transactions.map(
        (item: transaction) => item.category
      );
      if (getcategories) {
        const uniqueCategories = [...new Set(getcategories)];
        setCategories(uniqueCategories);
      }
    }
  }, [transactions, dropdownflag]);

  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  //const nPage = transactions?.length ?? 0 / recordPerPage;
  const lastIndex = currentPage * recordPerPage;
  const startIndex = lastIndex - recordPerPage;
  const records = filteredTrans?.slice(startIndex, lastIndex);
  const numbers = Array.from(Array((nPage ?? 0) + 1).keys()).slice(1);
  // const [searchProduct, setSearchProduct] = useState<String>();
  // const [selectedCategory, setSelectedCategory] = useState<any>();
  const sortingOptions = ["Oldest", " A to Z", "Z to A", "Highest", "Lowest"];

  const sortingSelected = (
    value: string,
    filteredTrans: transaction[] | undefined
  ) => {
    if (value === "Latest") {
      if (filteredTrans !== undefined) {
        const unsortedarr = [...filteredTrans];
        const sortedarray: transaction[] | undefined = sortByDate(
          unsortedarr,
          "ascending"
        );

        setFilteredTrans(sortedarray);
      }
    }

    if (value === "Oldest" && filteredTrans !== undefined) {
      const unsortedarr = [...filteredTrans];
      const sortedarray: transaction[] | undefined = sortByDate(
        unsortedarr,
        "descending"
      );

      const newsortedarray: transaction[] | undefined = sortedarray;
      setFilteredTrans(newsortedarray);
    }
    if (value === " A to Z" && filteredTrans !== undefined) {
      const unsortedarr = [...filteredTrans];
      const sortedarray: transaction[] | undefined = sortBYName(
        unsortedarr,
        "ascending"
      );
      const newsortedarray: transaction[] | undefined = sortedarray;
      setFilteredTrans(newsortedarray);
    }
    if (value === "Z to A" && filteredTrans !== undefined) {
      const unsortedarr = [...filteredTrans];
      const sortedarray: transaction[] | undefined = sortBYName(
        unsortedarr,
        "descending"
      );
      const newsortedarray: transaction[] | undefined = sortedarray;
      setFilteredTrans(newsortedarray);
    }
    if (value === "Highest" && filteredTrans !== undefined) {
      const unsortedarr = [...filteredTrans];
      const sortedarray: transaction[] | undefined = sortByAmount(
        unsortedarr,
        "descending"
      );
      const newsortedarray: transaction[] | undefined = sortedarray;
      setFilteredTrans(newsortedarray);
    }
    if (value === "Lowest" && filteredTrans !== undefined) {
      const unsortedarr = [...filteredTrans];
      const sortedarray: transaction[] | undefined = sortByAmount(
        unsortedarr,
        "ascending"
      );
      const newsortedarray: transaction[] | undefined = sortedarray;
      setFilteredTrans(newsortedarray);
    }
  };

  const prevPageClick = () => {
    if (currentPage !== startIndex) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPageClick = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  };

  const pageClick = (i: any) => {
    setCurrentPage(i);
  };

  const searchTransaction = (value: string) => {
    // setSearchProduct(value);
    if (value !== "") {
      const list = transactions?.filter((i: transaction) =>
        i.name.toLowerCase().includes(value)
      );

      setFilteredTrans(list);
    } else if (dropdownflag) {
      const value = (document.getElementById("category") as HTMLInputElement)
        .value;

      serachByCategory(value);
    } else {
      setFilteredTrans(data.transactions);
    }
  };

  const serachByCategory = (value: string) => {
    setDropDownFlag(true);
    const list = transactions?.filter((i: transaction) => i.category === value);
    setFilteredTrans(list);

    if (value === "alltransactions") {
      setFilteredTrans(data.transactions);
    }
  };

  return (
    <>
      <div className="flex flex-col bg-white m-[30px] p-[30px]">
        <div className="flex justify-between mb-10">
          <div className=" flex border border-gray-900 rounded-l  text-black ">
            <input
              className=" icon  w-[100%] text-black border-gray-900 "
              placeholder="Search transactions"
              name="search"
              type="text"
              onChange={(e) => {
                //console.log("vabcdalue", e.target.value);
                searchTransaction(e.target.value);
              }}
            />
          </div>
          <div>
            <div className="border border-grey-900 h-[30px] w-[200px]">
              <label htmlFor="category"></label>
              <select
                id="category"
                className=" border-grey-900 h-[30px] w-[200px] bg-white"
                onChange={(e) =>
                  sortingSelected(e.target.value, filteredTrans)
                }>
                <option value="Latest">Latest</option>
                {sortingOptions?.map((opt: string, idx: number) => {
                  return (
                    <option
                      style={{ backgroundColor: "white" }}
                      value={opt}
                      id={idx.toString()}
                      key={idx.toString()}>
                      {opt}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div>
            <div className="border border-grey-900 h-[30px] w-[200px]">
              <label htmlFor="category"></label>
              <select
                id="category"
                className=" border-grey-900 h-[30px] w-[200px] bg-white"
                onChange={(e) => serachByCategory(e.target.value)}>
                <option value="alltransactions">all transactions</option>
                {categories?.map((opt: string, idx: number) => {
                  return (
                    <option
                      style={{ backgroundColor: "white" }}
                      value={opt}
                      id={idx.toString()}
                      key={idx.toString()}>
                      {opt}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="w-[100%] text-left">
          <div className="flex justify-around font-bold pb-10">
            <div className="flex-1">Recepient/sender</div>
            <div className="flex-1">Category</div>
            <div className="flex-1">Transaction Date</div>
            <div className="flex-2">Amount</div>
          </div>

          {records?.map((trans: transaction, idx: number) => {
            const amountabs =
              trans.amount < 0
                ? `- $${Math.abs(trans.amount)}`
                : `+$${trans.amount}`;
            const datearray = dateCalculator(trans.date);

            return (
              <div
                key={idx}
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

                <div className="flex-1">{trans.category}</div>
                <div className="flex-1">
                  {datearray.day} {datearray.month} {datearray.year}
                </div>
                <div
                  className="flex-2"
                  style={{ color: trans.amount > 0 ? "green" : "" }}>
                  {amountabs}
                </div>
              </div>
            );
          })}
        </div>

        <nav style={{ display: "flex" }} className="mt-20">
          <ul style={{ display: "flex" }}>
            <li style={{ listStyle: "none", padding: "4px" }}>
              <a
                href="#"
                className={currentPage <= 1 ? "anchor-disabled" : ""}
                onClick={(e) =>
                  currentPage <= 1 ? e.preventDefault() : prevPageClick()
                }>
                Prev
              </a>
            </li>

            {numbers?.map((i, idx) => {
              return (
                <li
                  className={`page-item ${
                    currentPage === i ? "activepage" : ""
                  }`}
                  key={idx}
                  style={{
                    listStyle: "none",
                    padding: "4px",
                    border: "2px solid lightgrey",
                  }}
                  onClick={() => pageClick(i)}>
                  <a href="#" className="page-link">
                    {i}
                  </a>
                </li>
              );
            })}

            <li style={{ listStyle: "none" }}>
              <a
                href="#"
                className={currentPage >= nPage ? "anchor-disabled" : ""}
                onClick={(e) =>
                  currentPage >= nPage ? e.preventDefault() : nextPageClick()
                }>
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
