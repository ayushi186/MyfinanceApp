"use client";
import React, { useState } from "react";

import ProgressBar from "@/app/components/ProgressBar";
import styled from "styled-components";

import PotModal from "@/app/components/PotModal";
import { v4 } from "uuid";
import AddMoneyModal from "@/app/components/AddMoneyModel";
import { useBudget, usePots, useUserId } from "@/app/customhooks/hooks";
import DeleteRecordModal from "@/app/components/DeleteRecordModal";

export const StyledBullet = styled.div<{
  fillcolor: string;
  br: boolean;
  height: number;
  width: number;
}>`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  background-color: ${(prop) => prop.fillcolor};
  border-radius: ${(props) => (props.br === true ? "10px" : "0px")};
  margin-right: 10px;
`;

type IPots = {
  _id: string | undefined;
  name: string;
  target: number;
  total: number;
  theme: string;
};

export default function Pots() {
  // const [pots, setPots] = useState<IPots[] | undefined>();
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [potId, setPotId] = useState<string | undefined>();
  const [showMoneyModal, setMoneyModal] = useState<boolean>();

  const { data: username } = useUserId();

  const { data: budgets } = useBudget();

  const { data: pots } = usePots(budgets);

  // const EditPot = async (id: string) => {
  //   const res = await axios
  //     .patch(`/api/pots/${id}`)
  //     .then((res) => console.log("potspatch", res));
  // };

  // const deletePot = async (id: string | undefined) => {
  //   const res = await axios
  //     .delete(`/api/pots/${id}`)
  //     .then((res) => console.log("potspatch", res));
  // };

  return (
    <div className="flex flex-col">
      <div className="flex justify-around mt-5 mb-5 w-[100%]">
        <div className="flex-1 pl-6 pr-6">
          <h2 className=" self-start text-gray-900 textpresetBold1">Pots</h2>
        </div>
        <div className="flex-1 flex justify-end pl-6 pr-6">
          <button
            onClick={() => setShowModal(true)}
            className=" self-end  w-[200px] h-[50px] border-white bg-black text-white rounded-lg">
            +Add New Pot
          </button>
        </div>
      </div>
      <div>
        {showModal && (
          <PotModal
            onClose={() => setShowModal(false)}
            username={username}
            title="hello"></PotModal>
        )}
      </div>
      <div>
        {showMoneyModal && (
          <AddMoneyModal
            onClose={() => setMoneyModal(false)}
            username={username}
            potId={potId}></AddMoneyModal>
        )}
      </div>
      <div>
        {showConfirmationModal && (
          <DeleteRecordModal
            onClose={() => setShowConfirmationModal(false)}
            id={potId}></DeleteRecordModal>
        )}
      </div>
      <div className=" flex flex-wrap justify-between p-4" key={v4()}>
        {pots?.map((pot: IPots) => {
          const width = (pot.total / pot.target) * 100;
          const remaining = pot.target - pot.total;
          return (
            <div className="bg-white rounded-xl p-6 mt-5 mb-5" key={v4()}>
              <div className="flex justify-between">
                <div className="flex items-center pb-5 ">
                  <StyledBullet
                    fillcolor={pot.theme}
                    br={true}
                    height={15}
                    width={15}></StyledBullet>
                  <div>{pot.name}</div>
                </div>

                <div
                  onClick={() => {
                    setPotId(pot._id);
                    setShowConfirmationModal(true);
                  }}
                  style={{ cursor: "pointer" }}>
                  ...{" "}
                </div>
              </div>
              <div className="flex justify-between pt-5 pb-5">
                <div>Total Saved</div>
                <div>${pot.total}</div>
              </div>
              <ProgressBar
                height={10}
                br={true}
                bgcolor={pot.theme}
                maximum={pot.target}
                current={pot.total}
                width={width}
                remaining={remaining}></ProgressBar>
              <div className="flex justify-between mb-[30px] pt-5">
                <div className="text-gray-500">{Math.trunc(width)}%</div>
                <div className="italic">Target of {pot.target}</div>
              </div>
              <div className="flex justify-between pb-5 ">
                <button
                  onClick={() => {
                    setPotId(pot._id);
                    setMoneyModal(true);
                  }}
                  className="w-[230px] h-[50px]  border rounded-lg bg-background hover:bg-white">
                  + Add Money
                </button>
                <button className="w-[230px] h-[50px] border rounded-lg bg-background hover:bg-white">
                  Withdraw
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
