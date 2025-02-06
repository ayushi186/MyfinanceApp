import { useState } from "react";

type ICustomDropDownProps = {
  options?: Ioptions[];
  selectedValue?: string;
  setSelectedValue?: (value: string) => void;
  fieldtype?: string;
  tabIndexOrder: number;
};

type Ioptions = {
  code?: string;
  value?: string;
  name: string;
};

export default function CustomDropDown({
  options,
  selectedValue,
  setSelectedValue,
  fieldtype,
  tabIndexOrder,
}: ICustomDropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative">
      <div
        className="customdropdown border border-grey-500 p-3 rounded-md flex flex-col justify-between"
        onClick={handleOpen}
        tabIndex={tabIndexOrder}>
        <div className="flex w-[100%] items-center justify-between">
          <div className="flex items-center">
            {fieldtype === "color" && (
              <span
                style={{
                  backgroundColor: selectedValue?.toLowerCase(),
                  marginRight: "5px",
                  height: "15px",
                  width: "15px",
                  borderRadius: "50%",
                  display: "inline-block",
                }}></span>
            )}
            {selectedValue}
          </div>
          <div style={{ cursor: "pointer" }}>{!isOpen ? "▼" : "▲"}</div>
        </div>
      </div>
      {isOpen && (
        <ul className="flex flex-col z-[9999] h-[100px] overflow-auto z-99999 absolute bg-white w-[100%] option-list pt-[10px] cursor-pointer">
          {options?.map((option, index: number) => {
            return (
              <li
                className="pl-3 option-list "
                key={index}
                onClick={() => {
                  if (option !== undefined && setSelectedValue !== undefined) {
                    if (fieldtype === "color") {
                      setSelectedValue(option?.name);
                      setIsOpen(false);
                    } else if (fieldtype === "category") {
                      setSelectedValue(option?.name);
                      setIsOpen(false);
                    }
                  }
                }}>
                {fieldtype === "color" && (
                  <span
                    style={{
                      backgroundColor: option.code,
                      marginRight: "5px",
                      height: "15px",
                      width: "15px",
                      borderRadius: "50%",
                      display: "inline-block",
                    }}></span>
                )}
                {option.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
