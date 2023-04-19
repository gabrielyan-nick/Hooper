import React, { forwardRef, useEffect, useRef } from "react";
import styled, { useTheme } from "styled-components";

import { BasketballMarker, FootballMarker } from "./markers";
import { BtnSpinnerWrapper, LoadingScreenWrapper } from "./microComponets";

const balls = [<BasketballMarker />, <FootballMarker />];

const BallSpinner = forwardRef((props, ref) => {
  return (
    <LoadingScreenWrapper ref={ref}>
      <BtnSpinnerWrapper style={{ animationDuration: "1.5s" }}>
        {balls[Math.floor(Math.random() * 2)]}
      </BtnSpinnerWrapper>
    </LoadingScreenWrapper>
  );
});

export default BallSpinner;

