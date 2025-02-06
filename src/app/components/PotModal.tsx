"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { SyntheticEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLoader } from "../customhooks/hooks";
import CustomDropDown from "./CustomDropDown";

type IModal = {
  onClose: () => void;
  username: string | undefined;
  //children: React.ReactNode;
  title?: string;
};

type IPots = {
  name: string;
  target: string;
  total: number;
  theme: string;
};

export default function PotModal({ onClose, username }: IModal) {
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
  const { showLoader, hideLoader } = useLoader();

  const queryClient = useQueryClient();
  const handleCloseClick = (e: SyntheticEvent) => {
    e.preventDefault();
    onClose();
  };
  const [pot, setPot] = useState({
    name: "",
    target: "",
    total: 0,
    theme: "",
    username: username,
  });

  const mutation = useMutation({
    mutationFn: (pot: IPots) => {
      showLoader("Saving pot");
      return axios.post("/api/pots/addPots", pot);
    },

    onSuccess: () => {
      hideLoader();
      onClose();
      return queryClient.invalidateQueries({ queryKey: ["pots"] });
    },
    onError: (error: any) => {
      hideLoader();
      toast.error(error.response.data.error);
    },
  });
  return (
    <>
      <Toaster></Toaster>
      <div className="modal-overlay">
        <div className="modal-wrapper">
          <div className="modal">
            <div className="flex flex-col">
              <div className="flex justify-between">
                <h1 className="textpresetBold1 ">Add New Pot</h1>
                <div className="modal-header">
                  <a href="#" onClick={handleCloseClick}>
                    x
                  </a>
                </div>
              </div>
              <div className="textpresetRegular1 modal-text">
                Create a pot to set savings targets. These can help keep you on
                track as you save for special purchases.
              </div>
              <div className="flex flex-col modal-input">
                <label
                  className="modal-label textpresetBold5 text-[#696868]"
                  htmlFor="BudgetName">
                  Pot name
                </label>
                <input
                  tabIndex={1}
                  type="text"
                  className="border border-grey-500 p-3 rounded-md"
                  value={pot.name}
                  onChange={(e) => setPot({ ...pot, name: e.target.value })}
                />
              </div>
              <div className="flex flex-col modal-input">
                <label
                  className="modal-label textpresetBold5 text-[#696868]"
                  htmlFor="BudgetName">
                  Target
                </label>
                <div className="input-icon rounded-md border border-grey-500 w-[100%]">
                  <i>$</i>

                  <input
                    tabIndex={2}
                    type="text"
                    className=" p-3 w-[100%]"
                    value={pot.target}
                    onChange={(e) => setPot({ ...pot, target: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex flex-col modal-input">
                <label
                  className="modal-label textpresetBold5 text-[#696868]"
                  htmlFor="BudgetName">
                  Theme
                </label>
                <CustomDropDown
                  tabIndexOrder={3}
                  fieldtype="color"
                  options={colors}
                  selectedValue={pot.theme}
                  setSelectedValue={(value) =>
                    setPot({ ...pot, theme: value })
                  }></CustomDropDown>
              </div>
              <div className="modal-submit textpresetBold4">
                <button tabIndex={4} onClick={() => mutation.mutate(pot)}>
                  Add Pot
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
