import React, { forwardRef, useEffect, useRef, memo } from "react";
import styled, { useTheme } from "styled-components";
import BallsAnimation from "./BallsAnimation";
import { HooperLogoIcon } from "./svgIcons";
import { BasketballMarker, FootballMarker } from "./markers";
import { BtnSpinnerWrapper, LoadingScreenWrapper } from "./microComponets";

const balls = [<BasketballMarker />, <FootballMarker />];

const LoadingScreen = forwardRef((props, ref) => {
  const theme = useTheme();
  const logoRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      logoRef.current && (logoRef.current.style.opacity = 1);
    }, 200);
  }, []);

  return (
    <LoadingScreenWrapper ref={ref}>
      <LoadingScreenInner>
        <div
          style={{
            marginLeft: "25px",
            opacity: 0,
            transition: "opacity .7s",
          }}
          ref={logoRef}
        >
          <HooperLogoIcon main={theme.logo.main} net={theme.logo.net} />
        </div>
        <BtnSpinnerWrapper style={{ animationDuration: "1.5s" }}>
          {balls[Math.floor(Math.random() * 2)]}
        </BtnSpinnerWrapper>
      </LoadingScreenInner>
    </LoadingScreenWrapper>
  );
});
export default LoadingScreen;

const LoadingScreenInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`;
