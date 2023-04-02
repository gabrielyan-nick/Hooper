import React, { forwardRef } from "react";
import styled from "styled-components";

const LoadingScreenWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${(props) => props.theme.popupBg};
  z-index: 200;
`;

const LoadingScreen = (props, ref) => <LoadingScreenWrapper />;

export default LoadingScreen;
