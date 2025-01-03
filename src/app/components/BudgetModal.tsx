"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { SyntheticEvent, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useLoader } from "../customhooks/hooks";

type IModal = {
  onClose: () => void;
  username: string | undefined;
  //children: React.ReactNode;
  title?: string;
};

type IBudgets = {
  username: string | undefined;
  category: string;
  maximum: number;
  theme: string;
};

export default function BudgetModal({ onClose, username }: IModal) {
  const { showLoader, hideLoader } = useLoader();
  const handleCloseClick = (e: SyntheticEvent) => {
    e.preventDefault();
    onClose();
  };
  const [budget, setBudget] = useState({
    username: username,
    category: "",
    maximum: 0,
    theme: "",
  });
  // const { data: budgetreloaded } = useBudget();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (budget: IBudgets) => {
      showLoader("Saving the budget");
      return axios.post("/api/budgets/addbudget", budget);
    },
    onSuccess: () => {
      hideLoader();
      onClose();
      return queryClient.invalidateQueries({ queryKey: ["budget"] });
    },
    onError: () => {
      hideLoader();
    },
  });

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
                <button onClick={() => mutation.mutate(budget)}>
                  Add Budget
                </button>
              </div>
            </div>
            {/* <div className="modal-body">{children}</div> */}
          </div>
        </div>
      </div>
    </>
  );
}
