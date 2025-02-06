import React from "react";
import styled from "styled-components";

export const Tiles = styled.div<{
  bgcolor: string;
  itemalign?: string;
  width?: number;
}>`
  height: ${(props) => (props.width ? `${props.width}px` : "90px")};
  width: 100%;
  background-color: ${(props) => props?.bgcolor};
  color: ${(props) => (props?.bgcolor === "black" ? "white" : "black")};
  // margin: 10px;
  border-radius: 10px;
  align-items: ${(props) => (props.itemalign === "left" ? "left" : "center")};
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 10px;
  @media screen and (max-width: 500px) {
    width: 90%;
    // margin: 5%;
    margin-bottom: 5%;
    margin-top: 5%;
  }
`;

type Iprops = {
  bgcolor: string;
  amount: number | undefined;
  name: string;
  itemalign?: string;
  classname?: string;
  classnameheading?: string;
  width?: number;
};

export default function OverviewTiles({
  bgcolor,
  amount,
  name,
  itemalign,
  classname,
  classnameheading,
  width,
}: Iprops) {
  return (
    <Tiles bgcolor={bgcolor} itemalign={itemalign} width={width}>
      <div className="flex">
        <div></div>
        <div>
          <p className={classname} style={{ paddingBottom: "10px" }}>
            {name}
          </p>
          <h2 className={classnameheading}>${amount}</h2>
        </div>
      </div>
    </Tiles>
  );
}
