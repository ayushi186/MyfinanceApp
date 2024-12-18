import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useLoader } from "../customhooks/hooks";
import toast from "react-hot-toast";

type IModal = {
  onClose: () => void;

  //children: React.ReactNode;
  id: string | undefined;
};

// type IPots = {
//   name: string;
//   target: number;
//   total: number;
//   theme: string;
// };

export default function DeleteRecordModal({ onClose, id }: IModal) {
  const { showLoader, hideLoader } = useLoader();
  const queryClient = useQueryClient();

  const handleCloseClick = () => {
    onClose();
  };

  const { mutate } = useMutation({
    mutationFn: (id: string | undefined) => {
      return axios.delete(`/api/pots/${id}`);
    },

    onMutate: () => {
      showLoader("deleting pot");
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
      <div className="modal-overlay">
        <div className="modal-wrapper">
          <div className="modal">
            <div className="modal-header">
              <a href="#" onClick={handleCloseClick}>
                x
              </a>
            </div>
            <div>
              <button onClick={() => mutate(id)}>yes</button>
              <button onClick={handleCloseClick}>No</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
