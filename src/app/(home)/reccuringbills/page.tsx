"use client";
import { useRecurringTransactions } from "@/app/customhooks/hooks";

import styled from "styled-components";
import { Itrans } from "../profile/page";

const RecurringBillsCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 200px;
  width: 60%;
  background-color: black;
  border-radius: 10px;
  color: white;
  padding: 20px;
`;

export default function ReccuringBills() {
  const { data: transaction } = useRecurringTransactions();
  // const { data: totalBillSpent } = useTotalSumRecTrans();

  return (
    <>
      <div className="flex  justify-between">
        <div className="w-[50%] m-10">
          <div>
            <RecurringBillsCard>
              <div>
                <img src="images/RecurringBillsIcon.svg" />
              </div>
              <div>
                <div>Total Bills</div>
                {/* <div>${Math.abs(totalBillSpent)}</div> */}
              </div>
            </RecurringBillsCard>
          </div>
          <div> summary</div>
        </div>
        <div>
          <div className="flex">
            <div>Bill Title</div>
            <div> Due Date</div>
            <div>Amount </div>
          </div>

          {transaction?.map((trans: Itrans, idx: number) => {
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

                <div
                  className="flex-2"
                  style={{ color: trans.amount > 0 ? "green" : "" }}>
                  {trans.amount}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
