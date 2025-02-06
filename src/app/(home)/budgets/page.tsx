"use client";
import React, { useEffect, useState } from "react";

import ProgressBar from "@/app/components/ProgressBar";
import BudgetModal from "@/app/components/BudgetModal";
import { StyledBullet } from "@/types";
import DonutChart from "@/app/components/DonutChart";

import { useBudget, useTransactions, useUserId } from "@/app/customhooks/hooks";
import DeleteRecordModal from "@/app/components/DeleteRecordModal";

type IBudgets = {
  _id: string;
  category: string;
  maximum: number;
  theme: string;
};
type Itrans = {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
};

export interface Icategory {
  category: string;
  sum?: number | undefined;
  maximum: number;
  theme: string;
}

export default function Budgets() {
  const [showModal, setShowModal] = useState<Boolean>(false);

  let category: Icategory[] | undefined = [];
  const [categoryspent, setCategotySpent] = useState<Icategory[] | undefined>();
  const [spentsum, setspentsum] = useState<number | undefined>();
  const [maximumsum, setmaximumsum] = useState<number | undefined>();

  const { data: username } = useUserId();
  const { data: transactions } = useTransactions();
  const { data: budget } = useBudget();
  const [showmenu, setShowMenu] = useState<boolean>(false);
  const [budgetId, setbudgetId] = useState<string>();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [budgetName, setBudgetName] = useState<string>();

  useEffect(() => {}, [transactions]);

  useEffect(() => {
    if (budget != undefined) {
      budget?.map((bud: IBudgets) => {
        const transactionPercat = transactions?.filter(
          (item) => item.category === bud.category
        );
        const sum: number | undefined = transactionPercat
          ?.map((item) => item.amount)
          ?.reduce((prev, curr) => prev + curr, 0);

        const checkDuplicate = category.find(
          (item: any) => item.category === bud.category
        );
        if (!checkDuplicate) {
          category.push({
            theme: bud.theme,
            category: bud.category,
            maximum: bud.maximum,
            sum: sum,
          });
        }

        setCategotySpent(category);
      });
    }
  }, [budget]);

  useEffect(() => {
    if (category) {
      const spentsum: number | undefined = category
        ?.map((item: Icategory) => item.sum)
        ?.reduce((prev, curre) => (prev ?? 0) + (curre ?? 0), 0);
      if (spentsum) {
        setspentsum(spentsum);
      }

      const maximumsum: number = category
        ?.map((item: Icategory) => item.maximum)
        ?.reduce((prev, curre) => (prev ?? 0) + (curre ?? 0), 0);
      if (maximumsum) {
        setmaximumsum(maximumsum);
      }
    }
  }, [category]);

  const monthNames = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <>
      <div className="flex">
        <div className="flex-1 text-gray-900 textpresetBold1 m-5">Budgets</div>
        <button
          onClick={() => setShowModal(true)}
          className="mr-[20px] w-[200px] h-[50px] border-white bg-black text-white rounded-lg mt-5">
          + Add New Budget
        </button>
      </div>
      <div className="flex felx-col flex-wrap justify-between">
        <div className="w-[45%] max-h-[600px] bg-white pt-5 rounded-2xl mt-5">
          <div
            style={{ height: "400px", width: "500px" }}
            className="chart-wrapper">
            <div
              style={{ height: "350px", width: "500px", position: "relative" }}
              className=" ">
              <DonutChart
                chartdata={categoryspent}
                summarydata={false}></DonutChart>
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  top: "50%",
                  left: 0,
                  textAlign: "center",
                  marginTop: "-10px",
                  fontSize: "12px",
                }}>
                <div className="text-gray-900 textpresetBold1 ">
                  ${Math.abs(spentsum ?? 0)}
                </div>
                <div className="textpresetRegular2 text-gray-500">
                  of ${maximumsum}
                </div>
              </div>
              <div className="flex flex-col  pb-5">
                <div className="text-gray-900 textpresetBold2 pl-5 pt-5">
                  Spending Summary
                </div>
                {categoryspent?.map((cat: Icategory, idx: number) => {
                  return (
                    <div
                      key={idx}
                      className="flex justify-between mt-5 pl-5 pr-5">
                      <div className="flex">
                        <StyledBullet
                          fillcolor={cat.theme}
                          br={false}
                          height={30}
                          width={5}></StyledBullet>
                        <div className="text-gray-500 textpresetRegular1">
                          {cat.category}
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-gray-900 textpresetBold3">
                        ${Math.abs(cat.sum ?? 0)}
                        <div className="textpresetRegular2 pl-2 text-gray-500">
                          of ${cat.maximum}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div></div>
            </div>
          </div>
        </div>
        <div className=" w-[45%] flex flex-col items-end">
          {showModal && (
            <BudgetModal
              onClose={() => {
                setShowModal(false);
                setbudgetId(undefined);
              }}
              username={username}
              title="hello"
              type={showmenu ? "Edit" : "Create"}
              id={showModal ? budgetId : undefined}></BudgetModal>
          )}
          {showDeleteModal && (
            <DeleteRecordModal
              onClose={() => {
                setShowDeleteModal(false);
              }}
              id={budgetId}
              type={"budget"}
              name={budgetName}></DeleteRecordModal>
          )}

          {budget?.map((bud: IBudgets) => {
            const transactionPercat = transactions?.filter(
              (item) => item.category === bud.category
            );
            const sum: number | undefined = transactionPercat
              ?.map((item) => item.amount)
              ?.reduce((prev, curr) => prev + curr, 0);

            const width = ((bud.maximum + (sum ?? 0)) / bud.maximum) * 100;
            const remaining = bud.maximum + (sum ?? 0);
            const key = bud._id;

            return (
              <React.Fragment key={bud._id}>
                <div className="bg-white p-5 rounded-2xl mt-5">
                  <div className="flex items-center pb-5 justify-between">
                    <div className="flex">
                      <StyledBullet
                        height={15}
                        width={15}
                        br={true}
                        fillcolor={bud.theme}></StyledBullet>
                      <div>{bud.category}</div>
                    </div>
                    <div className="relative">
                      <div
                        onClick={() => {
                          setbudgetId(bud._id);
                          setShowMenu(!showmenu);
                        }}
                        className="cursor-pointer">
                        {showmenu && key === budgetId ? "x" : "..."}
                      </div>

                      {showmenu && key === budgetId ? (
                        <div className="absolute top-[] left-[-15px] cursor-pointer background-white w-[200px]">
                          <ul className="flex flex-col">
                            <li
                              onClick={() => {
                                // setbudgetId(bud._id);
                                console.log("cat", bud.category);
                                setShowModal(true);
                              }}>
                              Edit
                            </li>
                            <li
                              onClick={() => {
                                console.log("cat", bud.category);
                                setShowDeleteModal(true);
                                setBudgetName(bud.category);
                              }}>
                              Delete
                            </li>
                          </ul>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className="text-gray-500 textpresetRegular1  mb-3">
                    Maximum of ${bud.maximum}
                  </div>

                  <div>
                    <ProgressBar
                      height={20}
                      br={false}
                      bgcolor={bud.theme}
                      maximum={bud.maximum}
                      current={sum}
                      width={width}
                      remaining={remaining}></ProgressBar>
                    <div className="flex">
                      <div className="flex items-center pb-5 flex-1">
                        <StyledBullet
                          height={50}
                          width={5}
                          br={false}
                          fillcolor={bud.theme}></StyledBullet>
                        <div>
                          <div className="text-gray-500 textpresetRegular2">
                            Spent
                          </div>
                          <div className="textpresetBold4 text-grey-900">
                            ${Math.abs(sum ?? 0)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center pb-5 flex-1">
                        <StyledBullet
                          height={50}
                          width={5}
                          br={false}
                          fillcolor={`var(--background)`}></StyledBullet>
                        <div>
                          <div className="text-gray-500 textpresetRegular2">
                            Remaining
                          </div>
                          <div className="textpresetBold4 text-grey-900">
                            ${remaining}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <>
                    <div
                      style={{ backgroundColor: "var(--background)" }}
                      className="rounded-2xl">
                      <div className="flex justify-between">
                        <div className="textpresetBold3 text-gray-900 p-5 ">
                          Latest Spending
                        </div>
                        <div className="flex items-center text-gray-500 textpresetRegular1">
                          <div className="p-5 ">See All</div>
                          <div className=" p-5">
                            <img
                              src="/images/seeallarrow.svg"
                              alt="see all arrow"
                            />
                          </div>
                        </div>
                      </div>
                      {transactionPercat
                        ?.splice(0, 3)
                        .map((trans: Itrans, idx: number) => {
                          const absValue = Math.abs(trans.amount);
                          const stringtoDate = new Date(trans.date);

                          const day = stringtoDate.getDate();
                          const month = monthNames[stringtoDate.getMonth()];
                          const year = stringtoDate.getFullYear();
                          const hr = stringtoDate.getHours();
                          const minute = stringtoDate.getMinutes();

                          return (
                            <div
                              className="flex justify-between pl-5 pr-5 pt-3 pb-0 border-b-2 rounded-2xl"
                              key={idx}>
                              <div className="flex">
                                <div className="rounded-3xl h-20 mr-5">
                                  <img
                                    src={trans.avatar}
                                    alt="avatar"
                                    style={{
                                      backgroundPosition: "center",
                                      borderRadius: "20px",
                                      height: "30px",
                                      width: "30px",
                                    }}
                                  />
                                </div>
                                <div className=""> {trans.name}</div>
                              </div>

                              <div className="flex flex-col">
                                <div className=""> - ${absValue}</div>
                                <div className=" italic text-gray-500">
                                  {day} {month} {year},{hr}:{minute}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
}
