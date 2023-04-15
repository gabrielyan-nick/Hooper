import React, { useState, useEffect, useRef } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Button, FlexBetweenBox, Text, UserWidgetBtn } from "./microComponets";
import { darkTheme, lightTheme } from "../styles/themes";
import { ModalWindow } from "./index";
import { SettingsIcon } from "./svgIcons";

const SettingsWidget = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    location.pathname === "/" && setIsModalOpen(false);
  }, [location]);

  const onOpenModal = () => {
    setIsModalOpen(true);
    navigate("/settings");
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
    navigate(`/`);
  };
  return (
    <>
      <Wrapper>
        <SettingsBtn onClick={onOpenModal}>
          <SettingsIcon />
        </SettingsBtn>
      </Wrapper>

      <ModalWindow opened={isModalOpen} closeModal={onCloseModal} />
    </>
  );
};

export default SettingsWidget;

const Wrapper = styled.div`
  position: absolute;
  top: 13px;
  left: 13px;
  z-index: 10;
`;

const SettingsBtn = styled(UserWidgetBtn)`
  height: 45px;
  width: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
