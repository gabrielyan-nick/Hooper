import React, { forwardRef, useEffect, useRef } from "react";
import styled, { useTheme } from "styled-components";

import { BasketballMarker, FootballMarker } from "./markers";
import {
  BtnSpinnerWrapper,
  FlexCenterBox,
  LoadingScreenWrapper,
} from "./microComponets";

const balls = [<BasketballMarker />, <FootballMarker />];

const BallSpinner = forwardRef((props, ref) => {
  return (
    <Wrapper ref={ref}>
      <BtnSpinnerWrapper style={{ animationDuration: "1.5s" }}>
        {balls[Math.floor(Math.random() * 2)]}
      </BtnSpinnerWrapper>
    </Wrapper>
  );
});

export default BallSpinner;

const Wrapper = styled(FlexCenterBox)`
  height: 100%;
  width: 100%;
`;
