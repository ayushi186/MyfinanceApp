import React from "react";
import styled from "styled-components";

export const BillTile = styled.div<{ rightborder: string }>`
  display: flex;
  height: 50px;
  width: auto;
  margin: 5px;
  border-left: 3px solid ${(props) => props.rightborder};
  border-radius: 5px;
  background-color: var(--background);
  padding: 10px;
  justify-content: space-between;
  align-items: center;
`;

export default function RecurringBillTile({
  rightborder,
  totaldue,
  name,
}: {
  rightborder: string;
  totaldue: number | undefined;
  name: string;
}) {
  return (
    <BillTile rightborder={rightborder}>
      <p>{name}</p>
      <p>${totaldue}</p>
    </BillTile>
  );
}
