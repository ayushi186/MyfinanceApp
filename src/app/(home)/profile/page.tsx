"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import OverviewTiles from "@/app/components/Overviewtiles";
import DonutChart from "@/app/components/DonutChart";
import chartdata from "@/app/data.json";
import styled from "styled-components";
import RecurringBillTile from "@/app/components/ReccurringBillsTile";
import { v4 as uuidv4, v4 } from "uuid";
import { dateCalculator } from "@/helpers/helperfunctions";
import TransactionsTile from "@/app/components/TransactionsTile";
import { useSelector } from "react-redux";

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

type Itrans = {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
};

const ProfilePage = () => {
  const router = useRouter();
  const [data, setData] = useState("");
  const [chartData, setChartData] = useState<IBudgets[] | undefined>();
  const [pots, setPots] = useState<IPots[] | undefined>();
  const [savedPots, setSavedPots] = useState<number>();
  const [recrringTrans, setRecrringTrans] = useState<Itrans[] | undefined>();
  const [totalPaid, setTotalPaid] = useState<Itrans[] | undefined>();
  const [sumtotalPaid, setSumTotalPaid] = useState<number>();
  const [transaction, setTransactions] = useState<Itrans[] | undefined>();

  useEffect(() => {
    const getUserDetails = async () => {
      const res = await axios.get("/api/users/me");
      setData(res?.data?.data?._id);
    };

    getUserDetails();

    const getBudgets = async () => {
      const res = await axios.get("/api/budgets/getbudget");
      setChartData(res?.data?.data);
    };
    getBudgets();

    setRecrringTrans(
      chartdata?.transactions.filter((i) => i.recurring === true)
    );
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
    const getPotsfromdb = async () => {
      const res = await axios
        .get("/api/pots/getPots")
        .then((res) => setPots(res?.data?.data));
    };
    getPotsfromdb();
  }, [chartData]);

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
                <div>Budgets</div>
                <DonutChart
                  chartdata={chartData}
                  summarydata={true}></DonutChart>
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
