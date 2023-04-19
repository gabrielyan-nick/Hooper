import React from "react";
import styled, { keyframes } from "styled-components";
import { BasketballMarker, FootballMarker } from "./index";
import { FlexCenterBox } from "./microComponets";

const BallsAnimation = ({ height = 150 }) => {
  return (
    <FlexCenterBox style={{ height: height }}>
      <BallsAnimWrapper>
        <Ball1>
          <BasketballMarker size={20}/>
        </Ball1>
        <Ball2>
          <FootballMarker size={20}/>
        </Ball2>
        <Ball3>
          <BasketballMarker size={20}/>
        </Ball3>
        <Ball4>
          <FootballMarker size={20}/>
        </Ball4>
        <Ball5>
          <BasketballMarker size={20}/>
        </Ball5>
        <Ball6>
          <FootballMarker size={20}/>
        </Ball6>
        <Ball7>
          <BasketballMarker size={20}/>
        </Ball7>
        <Ball8>
          <FootballMarker size={20}/>
        </Ball8>
      </BallsAnimWrapper>
    </FlexCenterBox>
  );
};

export default BallsAnimation;

const BallsAnimWrapper = styled.div`
  width: 150px;
  height: 150px;
  position: relative;
`;

const Ball = styled.div`
  position: absolute;
  top: 41%;
  left: 41%;
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const ballsRotateAnim1 = keyframes`
  from {
    transform: rotate(0deg) translateX(40px) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX(40px) rotate(0deg);
  }
`;

const ballsRotateAnim2 = keyframes`
  from {
    transform: rotate(45deg) translateX(40px) rotate(-45deg);
  }
  to {
    transform: rotate(405deg) translateX(40px) rotate(-45deg);
  }
`;

const ballsRotateAnim3 = keyframes`
  from {
    transform: rotate(90deg) translateX(40px) rotate(-90deg);
  }
  to {
    transform: rotate(450deg) translateX(40px) rotate(-90deg);
  }
`;

const ballsRotateAnim4 = keyframes`
  from {
    transform: rotate(135deg) translateX(40px) rotate(-135deg);
  }
  to {
    transform: rotate(495deg) translateX(40px) rotate(-135deg);
  }
`;

const ballsRotateAnim5 = keyframes`
  from {
    transform: rotate(180deg) translateX(40px) rotate(-180deg);
  }
  to {
    transform: rotate(540deg) translateX(40px) rotate(-180deg);
  }
`;

const ballsRotateAnim6 = keyframes`
  from {
    transform: rotate(225deg) translateX(40px) rotate(-225deg);
  }
  to {
    transform: rotate(585deg) translateX(40px) rotate(-225deg);
  }
`;

const ballsRotateAnim7 = keyframes`
  from {
    transform: rotate(270deg) translateX(40px) rotate(-270deg);
  }
  to {
    transform: rotate(630deg) translateX(40px) rotate(-270deg);
  }
`;

const ballsRotateAnim8 = keyframes`
  from {
    transform: rotate(315deg) translateX(40px) rotate(-315deg);
  }
  to {
    transform: rotate(675deg) translateX(40px) rotate(-315deg);
  }
`;

const Ball1 = styled(Ball)`
  transform: rotate(0deg) translateX(40px) rotate(0deg);
  animation: ${ballsRotateAnim1} 4s linear infinite;
`;
const Ball2 = styled(Ball)`
  transform: rotate(45deg) translateX(40px) rotate(-45deg);
  animation: ${ballsRotateAnim2} 4s linear infinite;
`;
const Ball3 = styled(Ball)`
  transform: rotate(90deg) translateX(40px) rotate(-90deg);
  animation: ${ballsRotateAnim3} 4s linear infinite;
`;
const Ball4 = styled(Ball)`
  transform: rotate(135deg) translateX(40px) rotate(-135deg);
  animation: ${ballsRotateAnim4} 4s linear infinite;
`;
const Ball5 = styled(Ball)`
  transform: rotate(180deg) translateX(40px) rotate(-180deg);
  animation: ${ballsRotateAnim5} 4s linear infinite;
`;
const Ball6 = styled(Ball)`
  transform: rotate(225deg) translateX(40px) rotate(-225deg);
  animation: ${ballsRotateAnim6} 4s linear infinite;
`;
const Ball7 = styled(Ball)`
  transform: rotate(270deg) translateX(40px) rotate(-270deg);
  animation: ${ballsRotateAnim7} 4s linear infinite;
`;
const Ball8 = styled(Ball)`
  transform: rotate(315deg) translateX(40px) rotate(-315deg);
  animation: ${ballsRotateAnim8} 4s linear infinite;
`;
