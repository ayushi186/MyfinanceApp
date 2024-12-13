import styled from "styled-components";

export const StyledBullet = styled.div<{
    fillcolor: string;
    br: boolean;
    height: number;
    width: number;
  }>`
    height: ${(props) => props.height}px;
    width: ${(props) => props.width}px;
    background-color: ${(prop) => prop.fillcolor};
    border-radius: ${(props) => (props.br === true ? "10px" : "0px")};
    margin-right: 10px;
  `;