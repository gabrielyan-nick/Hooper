import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Tooltip } from "react-tooltip";
import {
  Button,
  UserWidgetBtn,
  IconBtnBg,
  FlexCenterBox,
  CloseBtn,
  Text,
} from "./microComponets";
import {
  ModalWindow,
  LoginRegisterScreen,
  UserWidget,
  AddCourtForm,
} from "./index";
import { AddCourtIcon, CloseIcon, TutorialIcon } from "./svgIcons";
import { lightTheme } from "../styles/themes";

const TutorialWidget = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    location.pathname === "/" && setIsModalOpen(false);
  }, [location]);

  const onOpenModal = () => {
    setIsModalOpen(true);
    navigate("/tutorial");
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
    navigate(`/`);
  };
  return (
    <>
      <Wrapper>
        <TutorialBtn onClick={onOpenModal}>
          <TutorialIcon />
        </TutorialBtn>
      </Wrapper>

      <ModalWindow opened={isModalOpen} closeModal={onCloseModal} />
    </>
  );
};

export default TutorialWidget;

const Wrapper = styled.div`
  position: absolute;
  bottom: 65px;
  left: 13px;
  z-index: 10;
`;

const TutorialBtn = styled(UserWidgetBtn)`
  height: 45px;
  width: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${lightTheme.orange};
  &:hover:not(:disabled) {
    background-color: #ff4800d1;
    box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
      rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
      rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
      rgba(0, 0, 0, 0.09) 0px 8px 4px;
    transition: all 0.3s;
  }
`;
