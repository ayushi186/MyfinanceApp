import axios from "axios";

import { SyntheticEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IPots } from "../(home)/pots/page";
import ProgressBar from "./ProgressBar";
import { useLoader } from "../customhooks/hooks";
import { useQueryClient } from "@tanstack/react-query";

type IModal = {
  onClose: () => void;
  username: string | undefined;
  potdetails: IPots | undefined;
  type: string | undefined;
};

type ISumTotal = {
  newtotal: string;
  remaining: number;
};

export default function AddMoneyModal({
  onClose,
  username,
  potdetails,
  type,
}: IModal) {
  const handleCloseClick = (e: SyntheticEvent) => {
    e.preventDefault();
    onClose();
  };
  const { showLoader, hideLoader } = useLoader();
  const queryClient = useQueryClient();
  const [sumTotal, setSumTotal] = useState<ISumTotal>();
  const [pot, setPot] = useState({
    name: "",
    target: 0,
    total: "",
    theme: "",
    username: username,
    amountaddsub: "",
  });
  useEffect(() => {
    const getPot = async (id: string | undefined) => {
      await axios.get(`/api/pots/${id}`).then((res) => {
        setPot(res?.data?.data[0]);
        setSumTotal({ newtotal: res?.data?.data[0]?.total, remaining: 0 });
      });
    };

    getPot(potdetails?._id);
  }, []);

  const AddMoney = async (id: string | undefined, e: SyntheticEvent) => {
    try {
      showLoader("saving the pot");
      await axios.patch(`/api/pots/${id}`, pot);
      handleCloseClick(e);
      return queryClient.invalidateQueries({ queryKey: ["pots"] });
    } catch (error: any) {
      hideLoader();
      toast.error(error.response.data.error);
    } finally {
      handleCloseClick(e);
      hideLoader();
    }
  };

  useEffect(() => {
    setPot({
      ...pot,
      total: sumTotal?.newtotal || "",
    });
  }, [sumTotal]);

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-wrapper">
          <div className="modal">
            <div className="flex flex-col">
              <div className="flex justify-between">
                <h1 className="textpresetBold1">
                  {type === "add" ? "Add to " : "Withdraw from "}'
                  {potdetails?.name}'
                </h1>
                <div className="modal-header">
                  <a href="#" onClick={(e) => handleCloseClick(e)}>
                    x
                  </a>
                </div>
              </div>
              <div className="textpresetRegular1 modal-text">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi
                neque, aliquet.
              </div>
              <div className="mt-[10px]">
                <div className="flex justify-between">
                  <div>New amount</div>
                  <div>${sumTotal?.newtotal}</div>
                </div>
                <ProgressBar
                  height={10}
                  br={true}
                  bgcolor={potdetails?.theme}
                  maximum={potdetails?.target}
                  current={Number(sumTotal?.newtotal)}
                  width={potdetails?.width}
                  remaining={sumTotal?.remaining}></ProgressBar>
                <div className="flex justify-between mb-[30px] pt-[5px]">
                  <div className="text-gray-500">
                    {Math.trunc(potdetails?.width ?? 0)}%
                  </div>
                  <div className="italic">Target of {potdetails?.target}</div>
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="Total">
                  Amount{type === "add" ? " to Add" : " to Withdraw"}
                </label>
                <div className="input-icon rounded-md  border border-grey-500">
                  <i>$</i>
                  <input
                    type="text"
                    className=" p-3 currencyinput w-[100%]"
                    value={pot?.amountaddsub}
                    onChange={(e) => {
                      setPot((potprev) => ({
                        ...pot,
                        total: e.target.value,
                      }));
                    }}
                    onBlur={(e) => {
                      setSumTotal((prevval) => ({
                        ...sumTotal,
                        newtotal:
                          type === "add"
                            ? (
                                Number(prevval?.newtotal || 0) +
                                Number(e.target.value)
                              ).toString()
                            : (
                                Number(prevval?.newtotal || 0) -
                                Number(e.target.value)
                              ).toString(),
                        remaining:
                          type === "add"
                            ? potdetails?.target ??
                              -(
                                Number(prevval?.newtotal || 0) +
                                Number(e.target.value)
                              )
                            : potdetails?.target ??
                              +(
                                Number(prevval?.newtotal || 0) +
                                Number(e.target.value)
                              ),
                      }));
                    }}
                  />
                </div>
              </div>

              <div className="modal-submit textpresetBold4">
                <button onClick={(e) => AddMoney(potdetails?._id, e)}>
                  {type === "add" ? "Confirm Addition" : "Confirm Withdrawal"}
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
