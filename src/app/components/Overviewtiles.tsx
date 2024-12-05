import React from "react";
import styled from "styled-components";

export const Tiles = styled.div<{ bgcolor: string }>`
  height: 90px;
  width: 100%;
  background-color: ${(props) => props?.bgcolor};
  color: ${(props) => (props?.bgcolor === "black" ? "white" : "black")};
  margin: 10px;
  border-radius: 10px;
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 10px;
  @media screen and (max-width: 500px) {
    width: 90%;
    margin: 5%;
  }
`;

type Iprops = {
  bgcolor: string;
  amount: number | undefined;
  name: string;
};

export default function OverviewTiles({ bgcolor, amount, name }: Iprops) {
  return (
    <Tiles bgcolor={bgcolor}>
      <p>{name}</p>
      <h2>${amount}</h2>
    </Tiles>
  );
}
