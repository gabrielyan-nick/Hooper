import React, { forwardRef } from "react";
import styled from "styled-components";

const LoadingScreenWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.popupBg};
  z-index: 200;
`;

const LoadingScreen = (props, ref) => <LoadingScreenWrapper />;

export default LoadingScreen;
