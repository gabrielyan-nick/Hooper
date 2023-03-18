import styled, { keyframes } from "styled-components";

export const FlexBetweenBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: ${(props) => props.direction || "row"};
`;

export const FlexCenterBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width || "auto"};
`;

export const IconButton = styled.button`
  position: relative;
  border: none;
  background: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  &:active {
    transform: scale(0.9);
  }
`;

export const Text = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: ${(props) => props.fS || "inherit"};
  font-weight: ${(props) => props.fW || 600};
  color: ${(props) => props.color || props.theme.text};
  margin: 0;
  text-align: ${(props) => (props.centred ? "center" : "inherit")};
  margin: ${(props) => props.m || 0}; ;
`;

export const Title = styled.h3`
  font-family: "Nunito", sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => props.theme.courtTitleColor};
  margin: 0;
`;

export const CourtImg = styled.img`
  width: 100%;
  max-height: 180px;
  object-fit: cover;
`;

export const Input = styled.input`
  font-family: "Nunito", sans-serif;
  font-weight: ${(props) => props.fW || 700};
  font-size: ${(props) => props.fS || "inherit"};
  color: ${(props) => props.color || props.theme.text};
  background: ${(props) => props.bg || props.theme.inputBg};
  width: 100%;
  padding: ${(props) => props.p || "9px 15px"};
  border-radius: 15px;
  margin-top: ${(props) => props.mt || 0};
  margin-bottom: ${(props) => props.mb || 0};
  border: ${(props) => props.border || "none"};
  box-shadow: ${(props) => props.boxSh || "0 0 3px 0 black"};
  &:focus {
    outline: none;
    box-shadow: ${(props) => props.boxSh || "0 0 3px 0 #000000 inset"};
    outline: ${(props) => props.theme.inputBorder};
  }
`;

export const Label = styled.label`
  position: relative;
  font-family: "Play", sans-serif;
  font-weight: ${(props) => props.fW || 600};
  font-size: ${(props) => props.fS || "inherit"};
  color: ${(props) => props.color || props.theme.text};
  padding-left: ${(props) => props.pl || 0};
`;

export const Button = styled.button`
  align-items: center;
  appearance: none;
  background-clip: padding-box;
  background-color: initial;
  background-image: none;
  border-style: none;
  box-sizing: border-box;
  color: ${(props) => props.color || "#fff"};
  cursor: pointer;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  font-size: ${(props) => props.fS || "16px"};
  font-weight: ${(props) => props.fW || 700};
  justify-content: center;
  line-height: ${(props) => props.lh || "24px"};
  margin: 0;
  outline: none;
  overflow: visible;
  padding: ${(props) => props.p || "10px 20px"};
  pointer-events: auto;
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || null};
  word-break: keep-all;
  z-index: ${(props) => props.zi || 0};
  &::after,
  ::before {
    border-radius: 80px;
  }
  &:before {
    background-color: ${(props) => props.b || "rgba(151, 98, 91, 0.479)"};
    content: "";
    display: block;
    height: 100%;
    left: 0;
    overflow: hidden;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -2;
  }
  &:after {
    background-color: initial;
    background-image: ${(props) =>
      `linear-gradient(92.83deg,
      ${props.bgColors?.first || "#5a0324"}
       0,
       ${props.bgColors?.second || "#b61e03"} 100%)`};

    bottom: 4px;
    content: "";
    display: block;
    left: 4px;
    overflow: hidden;
    position: absolute;
    right: 4px;
    top: 4px;
    transition: all 100ms ease-out;
    z-index: -1;
  }
  &:hover:not(:disabled):after {
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    transition-timing-function: ease-in;
  }
  &:active:not(:disabled) {
    color: #ccc;
  }
  &:active:not(:disabled):after {
    background-image: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0.2)
      ),
      ${(props) =>
        `linear-gradient(92.83deg,
      ${props.bgColors?.first || "#ff7426"}
       0,
       ${props.bgColors?.second || "#d42f0e"} 100%)`};
    bottom: 4px;
    left: 4px;
    right: 4px;
    top: 4px;
  }
  &:disabled {
    cursor: default;
    opacity: 0.8;
  }
  &:focus:not(:active) {
    outline: 2px solid #01442f;
    border-radius: 80px;
  }
`;

const rollAnim = keyframes`
   0% { transform: translateX(-150%) rotate(0deg) ; } 100% { transform: translateX(150%) rotate(360deg)};
`;

export const BtnSpinner = styled.span`
  display: block;
  width: 30px;
  height: 30px;
  background: #d0f0e1;
  border-radius: 50%;
  position: relative;
  animation: ${rollAnim} 1s ease-in-out infinite alternate;


  &:after {
    content: "";
    position: absolute;
    inset: 5px;
    border-radius: 50%;
    border: 5px solid;
    border-color: #ff2600 transparent;
  }
`;
