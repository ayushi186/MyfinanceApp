import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useLoader } from "../customhooks/hooks";
import toast from "react-hot-toast";

type IModal = {
  onClose: () => void;
  id: string | undefined;
  name?: string;
  type?: string;
};

export default function DeleteRecordModal({ onClose, id, name, type }: IModal) {
  const { showLoader, hideLoader } = useLoader();
  const queryClient = useQueryClient();

  const handleCloseClick = () => {
    onClose();
  };

  const mutation = useMutation({
    mutationFn: (id: string | undefined) => {
      if (type === "pot") {
        return axios.delete(`/api/pots/${id}`);
      } else {
        return axios.delete(`/api/budgets/${id}`);
      }
    },

    onMutate: () => {
      showLoader(type === "pot" ? "deleting pot" : "deleting budget");
    },

    onSuccess: () => {
      hideLoader();
      onClose();
      if (type === "pot") {
        return queryClient.invalidateQueries({ queryKey: ["pots"] });
      } else {
        return queryClient.invalidateQueries({ queryKey: ["budget"] });
      }
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
            <div className="modal-header flex justify-between">
              <div>Delete '{name}'</div>
              <a href="#" onClick={handleCloseClick}>
                x
              </a>
            </div>
            <div>
              Are you sure you want to delete this {type}? This action cannot be
              reveresed , and all the data inside it will be removed
            </div>

            <div className="flex flex-col textpresetBold4 modal-submit">
              <button className="redbutton" onClick={() => mutation.mutate(id)}>
                Yes, Confirm Deletion
              </button>
              <div className="modal-submit textpresetBold4">
                <button onClick={handleCloseClick}>No, Go Back </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
