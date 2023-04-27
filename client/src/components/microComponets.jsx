import styled, { keyframes } from "styled-components";
import { lightTheme, darkTheme } from "../styles/themes";
import { BasketballMarker } from "./markers";

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

export const FlexBetweenBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: ${(props) => props.direction || "row"};
`;

export const SectionTitle = styled.h6`
  font-family: "Play", sans-serif;
  font-weight: 600;
  font-size: ${(props) => props.fS || "16px"};
  margin: 0 0 5px 5px;
  color: ${(props) => props.theme.textSecondary};
  @media ${(props) => props.theme.media.smallMobile} {
    font-size: 14px;
  }
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
  padding: ${(props) => props.p || 0};
  user-select: none;
  background: ${(props) =>
    props.color === "green"
      ? lightTheme.greenIconBtn
      : props.color === "orange"
      ? lightTheme.orangeIconBtn
      : props.color || "transparent"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
        : props.color || "transparent"};
  }
  &:active:not(:disabled) {
    transform: scale(0.93);
  }

  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

export const Dash = styled.div`
  width: 13px;
  height: 3px;
  border: 1px solid #7e7a7a;
  background-color: #7e7a7a;
  margin-left: 7px;
  border-radius: 1px;
`;

export const CloseBtn = styled(IconButton)`
  border-radius: 7px;
  padding: ${(props) => props.p || "3px"};
  user-select: none;
  background-color: #e02504;
  transition: all 0.3s;
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
    rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
    rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px,
    rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px;
  &:hover:not(:disabled) {
    background-color: #9e1b04;
  }
  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.empty ? "flex-end" : "space-between")};
  padding: 5px 5px 0 5px;
`;

export const BackBtn = styled(IconBtnBg)`
  border-radius: 7px;
  background: ${lightTheme.orange};
  &:hover {
    background: #a83406;
  }
`;

export const ListTitle = styled.h6`
  font-family: "Play", sans-serif;
  font-weight: 600;
  font-size: 17px;
  margin: 20px 0 5px 17px;
  color: ${(props) => props.theme.textSecondary};
`;

export const Text = styled.p`
  font-size: ${(props) => props.fS || "inherit"};
  font-weight: ${(props) => props.fW || 600};
  color: ${(props) =>
    props.color === "primary"
      ? props.theme.text
      : props.color === "secondary"
      ? props.theme.textSecondary
      : props.color || props.theme.text};
  text-align: ${(props) => (props.centred ? "center" : "inherit")};
  margin: ${(props) => props.m || 0};
  padding: ${(props) => props.p || 0};
  word-break: break-word;
`;

export const LogoText = styled.p`
  font-family: "Berlin";
  font-size: ${(props) => props.fS || "25px"};
  font-weight: ${(props) => props.fW || 700};
  text-align: ${(props) => (props.centred ? "center" : "inherit")};
  margin: ${(props) => props.m || 0};
  padding: ${(props) => props.p || 0};
  background: linear-gradient(
    90deg,
    rgba(0, 145, 76, 1) 0%,
    rgba(20, 124, 63, 1) 50%,
    rgba(255, 82, 53, 1) 75%,
    rgba(208, 69, 22, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const Title = styled.h2`
  font-size: ${(props) => props.fS || "18px"};
  font-weight: ${(props) => props.fW || 700};
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
  color: ${(props) => props.color || "#110f0f"};
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
  margin: ${(props) => props.m || 0};
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
  &:hover:not(:disabled) {
    background-color: ${lightTheme.lightGreen};
    transition: all 0.3s;
  }
  &:active:not(:disabled) {
    transform: scale(0.96);
  }
  &:disabled {
    cursor: default;
    opacity: 0.5;
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
  line-height: ${(props) => props.lh || "inherit"};
  margin: ${(props) => props.m || 0};
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
  height: ${(props) => props.height || "38px"};
  word-break: keep-all;
  z-index: ${(props) => props.zi || 0};
  border-radius: 80px;
  background: ${(props) => props.bgColors || props.theme.btnPrimary};
  transition: all 200ms ease-out;
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
    rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px;
  transform: scale(1);
  &:hover:not(:disabled) {
    box-shadow: none;
  }
  &:active:not(:disabled) {
    color: #ccc;
    transform: scale(0.96);
    box-shadow: none;
  }
  &:disabled {
    cursor: default;
    opacity: 0.8;
  }
`;

export const ChatWrapper = styled(TextLineWrapper)`
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 5px;
  scrollbar-width: auto;
  &::-webkit-scrollbar {
    display: initial;
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.scrollbar};
    border-radius: 10px;
  }
`;

const rollAnim = keyframes`
   0% { transform: translateX(-120%) rotate(0deg) } 100% { transform: translateX(120%) rotate(360deg)};
`;

const rotateAnim = keyframes`
   0% { transform: rotate(0deg); transform-origin: center center; } 
   100% { transform: rotate(360deg); transform-origin: center center;};
   
`;

export const BtnSpinnerWrapper = styled.span`
  display: block;
  width: ${(props) => props.size || "30px"};
  height: ${(props) => props.size || "30px"};
  border-radius: 50%;
  position: relative;
  animation: ${rotateAnim} 1s linear infinite;
`;

export const IconSpinnerWrapper = styled.span`
  display: block;
  width: ${(props) => props.size || "23px"};
  height: ${(props) => props.size || "23px"};
  border-radius: 50%;
  position: relative;
  animation: ${rotateAnim} 1s linear infinite;
`;

export const ModalWrapper = styled.div`
  position: fixed;
  z-index: 101;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: #09000cb9;
  display: flex;
  justify-content: center;
  padding: 100px 0;
  &::-webkit-scrollbar {
    width: 0;
  }
  @media (max-width: 800px) {
    padding: 50px 0;
  }
  @media (max-width: 600px) {
    padding: 30px 0;
  }
`;

export const LoadingScreenWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.loadingScreen};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  position: fixed;
`;
