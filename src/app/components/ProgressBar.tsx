import React from "react";
import { styled } from "styled-components";
export const ContainerStyles = styled.div<{
  height: number;
  br: boolean;
}>`
  height: ${(prop) => prop.height}px;
  width: 500px;
  background-color: var(--background);
  border-radius: ${(prop) => (prop.br === true ? "15px" : "0px")};

  margin: 50;
`;

export const FillerStyles = styled.div<{
  bgcolor?: string;
  maximum?: number | undefined;
  current?: number | undefined;
  width?: number;
  remaining?: number;
  height?: number;
  br: boolean;
}>`
  height: ${(prop) => prop.height}px;
  width: ${(props) => props.width}%;

  background-color: ${(props) => props.bgcolor};
  border-radius: ${(prop) => (prop.br === true ? "15px" : "0px")};
  textalign: "right";
  //border-radius: 15px;
`;
export const LabelStyles = styled.span`
  padding: 5;
  color: "white";
  fontweight: "bold";
`;
type Props = {
  bgcolor: string | undefined;
  maximum: number | undefined;
  current: number | undefined;
  width: number | undefined;
  remaining: number | undefined;
  height: number;
  br: boolean;
};
const ProgressBar = ({
  bgcolor,
  maximum,
  current,
  width,
  remaining,
  height,
  br,
}: Props) => {
  console.log(remaining, current);
  return (
    <>
      <ContainerStyles height={height} br={br}>
        <FillerStyles
          bgcolor={bgcolor}
          maximum={maximum}
          current={current}
          width={width}
          remaining={remaining}
          height={height}
          br={br}>
          {/* <LabelStyles></LabelStyles> */}
        </FillerStyles>
      </ContainerStyles>
      {br === false ? <div className="mt-5"></div> : <></>}
    </>
  );
};

export default ProgressBar;
