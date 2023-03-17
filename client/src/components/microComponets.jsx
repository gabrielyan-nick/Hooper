import styled from "styled-components";

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
  padding: ${(props) => props.p || "7px 15px"};
  border-radius: 15px;
  margin-top: ${(props) => props.mt || 0};
  margin-bottom: ${(props) => props.mb || 0};
  border: ${(props) => props.border || "none"};
  box-shadow: ${(props) => props.boxSh || "0 0 3px 0 black"};
  &:focus {
    outline: none;
    box-shadow: ${(props) => props.boxSh || "0 0 4px 0 #000000 inset"};
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
  display: inline-block;
  flex-direction: row;
  flex-shrink: 0;
  font-size: ${(props) => props.fS || "16px"};
  font-weight: ${(props) => props.fW || 700};
  justify-content: center;
  line-height: 24px;
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
  width: auto;
  word-break: keep-all;
  z-index: 10;
  &::after,
  ::before {
    border-radius: 80px;
  }
  &:before {
    background-color: ${(props) => props.b || "rgba(2, 105, 36, 0.32)"};
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
      ${props.bgColors?.first || "#f88b4c"}
       0,
       ${props.bgColors?.second || "#f8330b"} 100%)`};

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
    opacity: 0.24;
  }
`;
