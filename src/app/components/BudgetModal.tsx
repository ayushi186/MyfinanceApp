"use client";

import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type IModal = {
  onClose: Function;
  username: string | undefined;
  //children: React.ReactNode;
  title: string;
};

export default function BudgetModal({ onClose, title, username }: IModal) {
  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };
  const [budget, setBudget] = useState({
    username: username,
    category: "",
    maximum: 0,
    theme: "",
  });

  const SaveBudget = async () => {
    try {
      const res = await axios.post("/api/budgets/addbudget", budget);
      console.log("budgetres", res);
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      handleCloseClick;
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
              <h1>Add New Budget</h1>
              <div className="flex flex-col m-4">
                <label htmlFor="BudgetName">Budget name</label>
                <input
                  type="text"
                  className=" border border-grey-500 p-3 rounded-md"
                  value={budget.category}
                  onChange={(e) =>
                    setBudget({ ...budget, category: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col m-4">
                <label htmlFor="BudgetName">Maximum Spending</label>
                <input
                  type="number"
                  className="border border-grey-500 p-3 rounded-md"
                  value={budget.maximum}
                  onChange={(e) =>
                    setBudget({ ...budget, maximum: +e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col m-4">
                <label htmlFor="BudgetName">Theme</label>
                <input
                  type="text"
                  className="border border-grey-500 p-3 rounded-md"
                  value={budget.theme}
                  onChange={(e) =>
                    setBudget({ ...budget, theme: e.target.value })
                  }
                />
              </div>
              <div>
                <button onClick={SaveBudget}>Add Budget</button>
              </div>
            </div>
            {/* <div className="modal-body">{children}</div> */}
          </div>
        </div>
      </div>
    </>
  );
}
