"use client";

import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import OverviewTiles from "@/app/components/Overviewtiles";
import DonutChart from "@/app/components/DonutChart";
import chartdata from "@/app/data.json";
import styled from "styled-components";
import RecurringBillTile from "@/app/components/ReccurringBillsTile";
import { v4 } from "uuid";

import TransactionsTile from "@/app/components/TransactionsTile";

import { useBudget, usePots, useTransactions } from "@/app/customhooks/hooks";
import { Icategory } from "../budgets/page";

const ColoredLabels = styled.div<{ bgcolor: string }>`
  height: 50px;
  width: 5px;
  max-width: 5px;
  border-radius: 1px;
  background-color: ${(props) => props.bgcolor};
  margin: 10px;
`;

type IBudgets = {
  category: string;
  maximum: number;
  theme: string;
};
type IPots = {
  name: string;
  target: number;
  total: number;
  theme: string;
};

export type Itrans = {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
};

const ProfilePage = () => {
  const [savedPots, setSavedPots] = useState<number>();
  // const [recrringTrans, setRecrringTrans] = useState<Itrans[] | undefined>();
  const [totalPaid, setTotalPaid] = useState<Itrans[] | undefined>();
  const [sumtotalPaid, setSumTotalPaid] = useState<number>();

  const category: Icategory[] | undefined = [];
  // const [categoryspent, setCategotySpent] = useState<Icategory[] | undefined>();
  const [spentsum, setspentsum] = useState<number | undefined>();
  const [maximumsum, setmaximumsum] = useState<number | undefined>();

  const { data: transactions } = useTransactions();
  const { data: chartData } = useBudget();

  const { data: pots } = usePots(chartData);
  useEffect(() => {
    // setRecrringTrans(
    //   chartdata?.transactions.filter((i) => i.recurring === true)
    // );
    setTotalPaid(
      chartdata?.transactions.filter(
        (i) => i.recurring === true && i.amount < 0
      )
    );
  }, []);

  useEffect(() => {
    const getSavedPots = (pots: IPots[]) => {
      const sum = pots
        .map((item) => item.total)
        ?.reduce((prev, curr) => prev + curr, 0);
      setSavedPots(sum);

      return sum;
    };
    if (pots) {
      getSavedPots(pots);
    }
  }, [pots]);

  useEffect(() => {
    const getTotalSpent = (recrringTrans: Itrans[]) => {
      const sum = recrringTrans
        .map((item) => item.amount)
        ?.reduce((prev, curr) => prev + curr, 0);
      setSumTotalPaid(sum);
      return sum;
    };
    if (totalPaid) {
      getTotalSpent(totalPaid);
    }
  }, [totalPaid]);
  useEffect(() => {
    if (transactions != undefined && chartData != undefined) {
      const filtereddata = chartData?.map((bud: IBudgets) => {
        const transactionPercat = transactions?.filter(
          (item) => item.category === bud.category
        );
        const sum: number | undefined = transactionPercat
          ?.map((item) => item.amount)
          ?.reduce((prev, curr) => prev + curr, 0);

        category.push({
          theme: bud.theme,
          category: bud.category,
          maximum: bud.maximum,
          sum: sum,
        });
      });
      // if (filtereddata) {
      //   setCategotySpent(category);
      // }
    }
  }, [chartData, transactions]);

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

  return (
    <>
      <div className="w-full flex flex-col">
        <div>
          <Toaster />
        </div>

        <div>Overview</div>
        <div className="w-full border-black flex flex-wrap">
          <div className="overview-tiles w-[32.33%] mr-[1%]">
            <OverviewTiles
              name="Current Balance"
              bgcolor="black"
              amount={4836.0}></OverviewTiles>
          </div>
          <div className=" overview-tiles w-[32.33%] mr-[1%]">
            <OverviewTiles
              name="Income"
              bgcolor="white"
              amount={4836.0}></OverviewTiles>
          </div>
          <div className=" overview-tiles w-[32.33%]">
            <OverviewTiles
              name="Expenses"
              bgcolor="white"
              amount={4836.0}></OverviewTiles>
          </div>
        </div>
        <div className="flex flex-wrap w-[100%]" key={v4()}>
          <div key={v4()} className="w-[50%]">
            <div className="flex-1 flex  bg-white flex-col m-4 rounded-2xl pots-wrapper h-[300px]">
              <div>Pots</div>
              <div className="flex-1 flex flex-wrap h-[300px] " key={v4()}>
                <div className=" overview-tiles w-[45%] mr-[5%]">
                  <OverviewTiles
                    name="Total Saved"
                    bgcolor="#F8F4F0"
                    amount={savedPots}></OverviewTiles>
                </div>
                <div
                  key={v4()}
                  className="flex flex-row  flex-wrap w-[50%] potsLabel-wrapper"
                  style={{ height: "auto", maxHeight: "auto" }}>
                  {pots?.map((item: IPots, idx: number) => {
                    return (
                      <div className="flex" key={v4()}>
                        <ColoredLabels
                          className="flex-1"
                          bgcolor={item.theme}
                          key={idx}></ColoredLabels>
                        <div className="flex flex-col flex-1">
                          <div>{item.name}</div>
                          <div>${item.total}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="bg-white m-4 rounded-2xl" key={v4()}>
              <div className="flex justify-between p-5" key={v4()}>
                <div>Transactions</div>
                <div>See all</div>
              </div>
              <TransactionsTile></TransactionsTile>
            </div>
          </div>

          <div
            style={{
              width: "auto",
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
            className="w-[50%]">
            <div
              style={{ height: "400px" }}
              className="flex-1 bg-white  rounded-2xl m-4">
              <div className=" doughnut-chart flex-1   m-4">
                <div
                  style={{
                    height: "350px",
                    width: "500px",
                    position: "relative",
                  }}
                  className="flex-1   ">
                  <div>Budgets</div>
                  <DonutChart
                    chartdata={chartData}
                    summarydata={true}></DonutChart>
                  <div
                    style={{
                      position: "absolute",
                      width: "100%",
                      top: "50%",
                      left: 0,
                      textAlign: "center",
                      marginTop: "-10px",
                      fontSize: "12px",
                      //lineHeight: "20px",
                    }}>
                    <div className="text-gray-900 textpresetBold1 ">
                      ${Math.abs(spentsum ?? 0)}
                    </div>
                    <div className="textpresetRegular2 text-gray-500">
                      of ${maximumsum}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="flex-1 bg-white  rounded-2xl m-4 p-5"
              style={{ height: "100%" }}>
              Recurring Bills
              <div>
                <RecurringBillTile
                  rightborder="green"
                  totaldue={sumtotalPaid}
                  name="Paid Bills"></RecurringBillTile>
                <RecurringBillTile
                  rightborder="green"
                  totaldue={sumtotalPaid}
                  name="Paid Bills"></RecurringBillTile>
                <RecurringBillTile
                  rightborder="green"
                  totaldue={sumtotalPaid}
                  name="Paid Bills"></RecurringBillTile>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
