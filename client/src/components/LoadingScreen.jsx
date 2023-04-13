import React, { forwardRef } from "react";
import styled from "styled-components";
import BallsAnimation from "./BallsAnimation";

const LoadingScreenWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${(props) => props.theme.popupBg};
  z-index: 200;
`;

const LoadingScreen = (props, ref) => (
  <LoadingScreenWrapper>
    <BallsAnimation height={"100vh"} />
  </LoadingScreenWrapper>
);

export default LoadingScreen;
