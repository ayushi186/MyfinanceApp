"use client";
import {
  useRecurringTransactions,
  useTotalSumRecTrans,
} from "@/app/customhooks/hooks";

import styled from "styled-components";
import { Itrans } from "../profile/page";

const RecurringBillsCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 200px;
  width: 100%;
  background-color: black;
  border-radius: 10px;
  color: white;
  padding: 20px;
`;

export default function ReccuringBills() {
  const { data: transaction } = useRecurringTransactions();
  const { data: totalBillSpent } = useTotalSumRecTrans();

  return (
    <>
      <div className="flex  justify-between mt-[5rem] m-[20px]">
        <div className="w-[30%] ">
          <div className="p-[10px]">
            <RecurringBillsCard>
              <div>
                <img src="images/RecurringBillsIcon.svg" />
              </div>
              <div>
                <div>Total Bills</div>
                <div></div>
              </div>
            </RecurringBillsCard>
          </div>
          <div> summary</div>
        </div>
        <div className="bg-white w-[68%] mt-[10px]">
          <div className="flex w-[100%] justify-around">
            <div className="text-left">Bill Title</div>
            <div> Due Date</div>
            <div>Amount </div>
          </div>

          {transaction?.map((trans: Itrans, idx: number) => {
            return (
              <div
                key={idx}
                style={{ borderBottom: "1px solid lightgrey" }}
                className="flex justify-around items-center">
                <div className="flex pt-[16px] pb-[16px] ">
                  <img
                    className="rounded-2xl h-[30px] w-[30px]"
                    src={trans.avatar}
                    alt="profile-image"
                  />
                  <span className="pl-3">{trans.name}</span>
                </div>

                <div>due date</div>
                <div style={{ color: trans.amount > 0 ? "green" : "" }}>
                  ${trans.amount}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
