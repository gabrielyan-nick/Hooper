import styled, { keyframes } from "styled-components";
import { lightTheme, darkTheme } from "../styles/themes";
import { BasketballMarker } from "./markers";

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

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
  flex-direction: ${(props) => props.direction || "row"};
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
  transition: all 0.2s ease-in-out;
  &:active {
    transform: scale(0.93);
    transition: all 0.2s ease-in-out;
  }
`;

export const IconBtnBg = styled.button`
  appearance: none;
  background-clip: padding-box;
  background-color: initial;
  background-image: none;
  border-style: none;
  box-sizing: border-box;
  border-radius: 20px;
  position: relative;
  border: none;
  margin: 0;
  padding: 0;
  user-select: none;
  background: ${(props) =>
    props.color === "green"
      ? lightTheme.greenIconBtn
      : props.color === "orange"
      ? lightTheme.orangeIconBtn
      : "transparent"};
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
    rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px;

  &:hover {
    background: ${(props) =>
      props.color === "green"
        ? lightTheme.green
        : props.color === "orange"
        ? lightTheme.orange
        : "transparent"};
  }
  &:active:not(:disabled) {
    transform: scale(0.93);
  }

  &:disabled {
    cursor: default;
    opacity: 0.8;
  }
`;

export const CloseBtn = styled(IconButton)`
  border-radius: 7px;
  padding: 3px;
  background-color: #e02504;
  transition: background-color 0.3s;
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
    rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
    rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px,
    rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px;
  &:hover {
    background-color: #9e1b04;
  }
`;

export const Text = styled.p`
  font-size: ${(props) => props.fS || "inherit"};
  font-weight: ${(props) => props.fW || 600};
  color: ${(props) =>
    props.color === "primary"
      ? props.theme.text
      : props.color === "secondary"
      ? props.theme.textSecondary
      : props.theme.text};
  margin: 0;
  text-align: ${(props) => (props.centred ? "center" : "inherit")};
  margin: ${(props) => props.m || 0}; ;
`;

export const Title = styled.h3`
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
  font-family: "Golos Text", sans-serif;
  font-weight: ${(props) => props.fW || 700};
  font-size: ${(props) => props.fS || "inherit"};
  color: ${(props) => props.color || "#2c2522"};
  background: ${(props) => props.bg || props.theme.inputBg};
  width: 100%;
  padding: ${(props) => props.p || "9px 15px"};
  border-radius: 7px;
  margin: ${(props) => props.m || 0};
  border: ${(props) => props.border || "none"};
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px;
  &:focus {
    outline: none;
    box-shadow: ${(props) => props.boxSh || "0 0 2px 0 #000000 inset"};
    outline: ${(props) => props.theme.inputBorder};
  }
`;

export const TextLineWrapper = styled.div`
  position: relative;
  background: ${(props) => props.bg || props.theme.textWrapperBg};
  width: 100%;
  padding: ${(props) => props.p || "9px 15px"};
  border-radius: 7px;
  margin: ${(props) => props.m || 0};
  border: ${(props) => props.border || "none"};
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px;
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Label = styled.label`
  position: relative;
  font-family: "Play", sans-serif;
  font-weight: ${(props) => props.fW || 600};
  font-size: ${(props) => props.fS || "inherit"};
  color: ${(props) => props.color || props.theme.textSecondary};
  padding-left: ${(props) => props.pl || 0};
`;

export const UserWidgetBtn = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  user-select: none;
  font-family: "Play", sans-serif;
  font-size: ${(props) => props.fS || "16px"};
  font-weight: ${(props) => props.fW || 700};
  padding: ${(props) => props.p || "3px"};
  margin: ${(props) => props.m || 0};
  background-color: ${lightTheme.greenUserWidget};
  color: ${(props) => props.color || "#fdf3ee"};
  border-radius: 30px;
  gap: 10px;
  transition: all 0.3s;
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
    rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
    rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px,
    rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px;
  &:hover {
    background-color: ${lightTheme.lightGreen};
    transition: all 0.3s;
  }
  &:active {
    transform: scale(0.96);
  }
`;

export const TextButton = styled.button`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  font-family: "Play", sans-serif;
  font-size: ${(props) => props.fS || "16px"};
  font-weight: ${(props) => props.fW || 700};
  text-align: center;
  margin: ${(props) => props.m || 0};
  padding: ${(props) => props.p || 0};
  color: ${(props) => props.color || props.theme.textSecondary};
  background: transparent;
  border: none;
  transition: all 0.2s;
  &:hover {
    color: ${(props) => props.theme.text};
  }
`;

export const Button = styled.button`
  align-items: center;
  appearance: none;
  background-clip: padding-box;
  background-color: initial;
  background-image: none;
  border-style: none;
  box-sizing: border-box;
  color: ${(props) => props.color || "#dbdada"};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  font-family: "Play", sans-serif;
  font-size: ${(props) => props.fS || "16px"};
  font-weight: ${(props) => props.fW || 700};
  justify-content: center;
  line-height: ${(props) => props.lh || "24px"};
  margin: ${(props) => props.m || 0};
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
  height: ${(props) => props.height || "44px"};
  word-break: keep-all;
  z-index: ${(props) => props.zi || 0};
  border-radius: 80px;
  background: ${(props) => props.bgColors || props.theme.btnPrimary};
  transition: all 200ms ease-out;
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
    rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px;
  &:hover:not(:disabled) {
    box-shadow: none;
  }
  &:active:not(:disabled) {
    color: #ccc;
    transform: scale(0.96);
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

export const BtnSpinnerWrapper = styled.span`
  display: block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: relative;
  animation: ${rollAnim} 1s ease-in-out infinite alternate;
`;

const rotateAnim = keyframes`
   0% { transform: rotate(0deg) } 100% { transform: rotate(360deg)};
`;

export const IconSpinnerWrapper = styled.span`
  display: block;
  width: 23px;
  height: 23px;
  border-radius: 50%;
  position: relative;
  animation: ${rotateAnim} 1s ease-in-out infinite alternate;
`;
