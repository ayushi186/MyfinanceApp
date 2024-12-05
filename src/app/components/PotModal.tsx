"use client";

import axios from "axios";
import React, { SyntheticEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type IModal = {
  onClose: Function;
  username: string | undefined;
  //children: React.ReactNode;
  title: string;
};

export default function PotModal({ onClose, title, username }: IModal) {
  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };
  const [pot, setPot] = useState({
    name: "",
    target: 0,
    total: 0,
    theme: "",
    username: username,
  });

  const SavePot = async (e: SyntheticEvent) => {
    try {
      const res = await axios.post("/api/pots/addPots", pot);
      console.log("budgetres", res);
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      handleCloseClick(e);
    }
  };
  return (
    <>
      <Toaster></Toaster>
      <div className="modal-overlay">
        <div className="modal-wrapper">
          <div className="modal">
            <div className="modal-header">
              <a href="#" onClick={handleCloseClick}>
                x
              </a>
            </div>
            <div className="flex flex-col">
              <h1>Add New Pot</h1>
              <div className="flex flex-col m-4">
                <label htmlFor="BudgetName">Pot name</label>
                <input
                  type="text"
                  className=" border border-grey-500 p-3 rounded-md"
                  value={pot.name}
                  onChange={(e) => setPot({ ...pot, name: e.target.value })}
                />
              </div>
              <div className="flex flex-col m-4">
                <label htmlFor="BudgetName">Target</label>
                <input
                  type="number"
                  className="border border-grey-500 p-3 rounded-md"
                  value={pot.target}
                  onChange={(e) => setPot({ ...pot, target: +e.target.value })}
                />
              </div>
              <div className="flex flex-col m-4">
                <label htmlFor="BudgetName">Theme</label>
                <input
                  type="text"
                  className="border border-grey-500 p-3 rounded-md"
                  value={pot.theme}
                  onChange={(e) => setPot({ ...pot, theme: e.target.value })}
                />
              </div>
              <div>
                <button onClick={(e) => SavePot(e)}>Add Pot</button>
              </div>
            </div>
            {/* <div className="modal-body">{children}</div> */}
          </div>
        </div>
      </div>
    </>
  );
}
