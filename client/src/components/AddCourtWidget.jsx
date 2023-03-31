import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  Button,
  UserWidgetBtn,
  IconBtnBg,
  FlexCenterBox,
  CloseBtn,
} from "./microComponets";
import { ModalWindow, LoginRegisterScreen, UserWidget } from "./index";
import { AddCourtIcon, CloseIcon } from "./svgIcons";
import { lightTheme } from "../styles/themes";

const AddCourtWidget = ({ addCourtMarker, setAddCourtMarker, isDisabled }) => {
  const onRemoveMarker = () => setAddCourtMarker(null);

  const handleEnter = (node) => {
    node.classList.add("roll-hide");
  };

  return (
    <Wrapper>
      <CSSTransition
        in={!!addCourtMarker}
        timeout={300}
        classNames="roll-hide"
        unmountOnExit
      >
        <div>
          <RemoveMarkerBtn onClick={onRemoveMarker} disabled={isDisabled}>
            <CloseIcon size={20} />
          </RemoveMarkerBtn>
        </div>
      </CSSTransition>
      <AddCourtBtn color="orange" disabled={isDisabled || !addCourtMarker}>
        <AddCourtIcon />
      </AddCourtBtn>
    </Wrapper>
  );
};

export default AddCourtWidget;

const Wrapper = styled(FlexCenterBox)`
  position: absolute;
  bottom: 70px;
  right: 20px;
  gap: 15px;
  z-index: 10;
`;

const AddCourtBtn = styled(UserWidgetBtn)`
  padding: 10px 20px 10px 15px;
  background-color: ${lightTheme.orange};
  &:hover:not(:disabled) {
    background-color: #ff4800;
    box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
      rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
      rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
      rgba(0, 0, 0, 0.09) 0px 8px 4px;
    transition: all 0.3s;
  }
  &:disabled {
    opacity: 0.5;
  }
`;

const RemoveMarkerBtn = styled(CloseBtn)`
  padding: 3px;
  border-radius: 50%;
  &:disabled {
    opacity: 0.3;
  }
`;
