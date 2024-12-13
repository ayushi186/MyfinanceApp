import axios from "axios";

import { SyntheticEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

type IModal = {
  onClose: () => void;
  username: string | undefined;
  //children: React.ReactNode;
  potId: string | undefined;
};

export default function AddMoneyModal({ onClose, username, potId }: IModal) {
  const handleCloseClick = (e: SyntheticEvent) => {
    e.preventDefault();
    onClose();
  };

  useEffect(() => {
    const getPot = async (id: string | undefined) => {
      await axios
        .get(`/api/pots/${id}`)
        .then((res) => setPot(res?.data?.data[0]));
    };

    getPot(potId);
  }, []);

  const [pot, setPot] = useState({
    name: "",
    target: 0,
    total: 0,
    theme: "",
    username: username,
  });
  const AddMoney = async (id: string | undefined, e: SyntheticEvent) => {
    try {
      await axios.patch(`/api/pots/${id}`, pot);

      handleCloseClick(e);
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      handleCloseClick(e);
    }
  };
  return (
    <>
      <div className="modal-overlay">
        <div className="modal-wrapper">
          <div className="modal">
            <div className="modal-header">
              <a href="#" onClick={(e) => handleCloseClick(e)}>
                x
              </a>
            </div>
            <div className="flex flex-col">
              <h1>Update the Pot</h1>
              <div className="flex flex-col m-4">
                <label htmlFor="Total">Amount Saved</label>
                <input
                  step={0.01}
                  min="0"
                  max="1000000"
                  type="number"
                  className=" border border-grey-500 p-3 rounded-md"
                  value={pot?.total}
                  onChange={async (e) => {
                    setPot({
                      ...pot,
                      total: +e?.target?.value,
                    });
                  }}
                />
              </div>

              <div>
                <button onClick={(e) => AddMoney(potId, e)}>Add Money</button>
              </div>
            </div>
            {/* <div className="modal-body">{children}</div> */}
          </div>
        </div>
      </div>
    </>
  );
}
