"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLoader } from "../customhooks/hooks";
import CustomDropDown from "./CustomDropDown";

type IModal = {
  onClose: () => void;
  username: string | undefined;
  title?: string;
  type?: string;
  id?: string;
};

type IBudgets = {
  _id?: string;
  username: string | undefined;
  category: string;
  maximum: string;
  theme: string;
};

export default function BudgetModal({ onClose, username, type, id }: IModal) {
  const colors = [
    { code: "#FF0000", name: "Red" },
    { code: "#FFA500", name: "Orange" },
    { code: "#FFFF00", name: "Yellow" },
    { code: "#008000", name: "Green" },
    { code: "#0000FF", name: "Blue" },
    { code: "#4B0082", name: "Indigo" },
    { code: "#EE82EE", name: "Violet" },
    { code: "#FF69B4", name: "HotPink" },
    { code: "#FFC0CB", name: "Pink" },
    { code: "#FFA07A", name: "LightSalmon" },
    { code: "#FFD700", name: "Gold" },
    { code: "#FF6347", name: "Tomato" },
    { code: "#FF4500", name: "OrangeRed" },
    { code: "#a2eeef", name: "LightBlue" },
    { code: "#7b7168", name: "Grey" },
    { code: "#bdb9b5", name: "LightGrey" },
    { code: "#f0f8ff", name: "AliceBlue" },
  ];

  const category = [
    { name: "Bills", value: "Bills" },
    { name: "Groceries", value: "Groceries" },
    { name: "Dining Out", value: "Dining Out" },
    { name: "Utilities", value: "Utilities" },
    { name: "Transportation", value: "Transportation" },
    { name: "Health", value: "Health" },
    { name: "Entertainment", value: "Entertainment" },
    { name: "Education", value: "Education" },
    { name: "Miscellaneous", value: "Miscellaneous" },
  ];
  const { showLoader, hideLoader } = useLoader();
  const handleCloseClick = (e: SyntheticEvent) => {
    e.preventDefault();
    onClose();
  };
  const [budget, setBudget] = useState({
    username: username,
    category: "",
    maximum: "",
    theme: "",
  });

  useEffect(() => {
    const getbudget = async (id: string | undefined) => {
      showLoader("loading the budget");
      await axios
        .get(`/api/budgets/${id}`)
        .then((res) => {
          setBudget(res?.data?.data[0]);
        })
        .then(hideLoader);
    };

    if (id != undefined) {
      getbudget(id);
    }
  }, []);

  // const { data: budgets } = useBudget();
  // console.log("budget", budgets);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (budget: IBudgets) => {
      if (id === undefined) {
        return axios.post("/api/budgets/addbudget", budget);
      } else {
        return axios.patch(`/api/budgets/${id}`, budget);
      }
    },
    onMutate: () => {
      showLoader("Saving the budget");
    },
    onSuccess: () => {
      hideLoader();
      onClose();
      return queryClient.invalidateQueries({ queryKey: ["budget"] });
    },
    onError: (error: any) => {
      toast.error(error.response.data.error);
      hideLoader();
    },
  });

  return (
    <>
      <Toaster></Toaster>
      <div className="modal-overlay ">
        <div className="modal-wrapper">
          <div className="modal p-[20px]">
            <div className="flex flex-col">
              <div className="flex justify-between">
                <h1 className="textpresetBold1 ">
                  {id ? "Edit the budget" : "Add New Budget"}
                </h1>
                <div className="modal-header">
                  <a href="#" onClick={handleCloseClick}>
                    x
                  </a>
                </div>
              </div>
              <div className="textpresetRegular1 modal-text">
                Choose a category to set a spending budget. These categories can
                help you monitor spending.
              </div>
              <div className="flex flex-col modal-input">
                <label
                  htmlFor="BudgetName"
                  className="modal-label textpresetBold5 text-[#696868]">
                  Budget Category
                </label>
                <CustomDropDown
                  tabIndexOrder={1}
                  fieldtype="category"
                  options={category}
                  selectedValue={budget.category}
                  setSelectedValue={(value) =>
                    setBudget({ ...budget, category: value })
                  }></CustomDropDown>
              </div>
              <div className="flex flex-col modal-input">
                <label
                  htmlFor="BudgetName"
                  className="modal-label textpresetBold5 text-[#696868]">
                  Maximum Spending
                </label>
                <div className="input-icon rounded-md w-[100%] border border-grey-500">
                  <i>$</i>
                  <input
                    tabIndex={2}
                    type="text"
                    className="p-3 currencyinput w-[100%]"
                    value={budget.maximum}
                    onChange={(e) =>
                      setBudget({ ...budget, maximum: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col modal-input">
                <label
                  htmlFor="BudgetName"
                  className="modal-label textpresetBold5 text-[#696868]">
                  Theme
                </label>
                <CustomDropDown
                  tabIndexOrder={3}
                  fieldtype="color"
                  options={colors}
                  selectedValue={budget.theme}
                  setSelectedValue={(value) =>
                    setBudget({ ...budget, theme: value })
                  }></CustomDropDown>
              </div>
              <div className="modal-submit textpresetBold4">
                <button tabIndex={3} onClick={() => mutation.mutate(budget)}>
                  {id === undefined ? "Add Budget" : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
