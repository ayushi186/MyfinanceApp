"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLoader } from "../customhooks/hooks";

type IModal = {
  onClose: () => void;
  username: string | undefined;
  //children: React.ReactNode;
  title?: string;
};

type IPots = {
  name: string;
  target: number;
  total: number;
  theme: string;
};

export default function PotModal({ onClose, username }: IModal) {
  const { showLoader, hideLoader } = useLoader();

  const queryClient = useQueryClient();
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

  const { mutate, isError } = useMutation({
    mutationFn: (pot: IPots) => {
      return axios.post("/api/pots/addPots", pot);
    },
    onMutate: () => {
      showLoader("Saving pot");
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
    onSettled: () => {},
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
                  type="text"
                  className="border border-grey-500 p-3 rounded-md"
                  value={pot.target}
                  pattern="\d+(\.\d{2})?"
                  onChange={(e) =>
                    setPot({ ...pot, target: Number(e.target.value) })
                  }
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
                <button onClick={() => mutate(pot)}>Add Pot</button>
              </div>
            </div>
            {/* <div className="modal-body">{children}</div> */}
          </div>
        </div>
      </div>
    </>
  );
}
