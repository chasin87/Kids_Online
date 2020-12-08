import React from "react";
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function Loading() {
  return (
    <div className="sweet-loading">
      <BounceLoader css={override} size={150} color={"#f43f5a"} />
    </div>
  );
}
