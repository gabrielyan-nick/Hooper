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
import { AddCourtIcon, CloseIcon } from "./svgIcons";
import { lightTheme } from "../styles/themes";

const AddCourtWidget = ({ addCourtMarker, setAddCourtMarker }) => {
  const isAuth = useSelector((state) => !!state.storage.user?.token);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    location.pathname === "/" && setIsModalOpen(false);
  }, [location]);

  const onRemoveMarker = () => setAddCourtMarker(null);

  const onOpenModal = () => {
    setIsModalOpen(true);
    isAuth ? navigate("/add-court") : navigate("/login");
  };
  const onCloseModal = () => {
    setIsModalOpen(false);
    navigate(`/`);
  };

  return (
    <>
      <Wrapper>
        <CSSTransition
          in={!!addCourtMarker}
          timeout={300}
          classNames="roll-hide"
          unmountOnExit
        >
          <div>
            <RemoveMarkerBtn onClick={onRemoveMarker}>
              <CloseIcon size={20} />
            </RemoveMarkerBtn>
          </div>
        </CSSTransition>
        {!addCourtMarker && (
          <Tooltip
            id="add"
            openOnClick
            style={{
              borderRadius: "7px",
              maxWidth: "90vw",
              padding: "5px 7px",
              background: "#363535d3",
            }}
          >
            <Text fontSize="14px" color="#f5ebeb">
              Вкажіть місце на карті
            </Text>
          </Tooltip>
        )}
        <div data-tooltip-id="add" data-tooltip-place="left">
          <AddCourtBtn
            color="orange"
            disabled={!addCourtMarker}
            onClick={onOpenModal}
          >
            <AddCourtIcon />
          </AddCourtBtn>
        </div>
      </Wrapper>
      <ModalWindow
        opened={isModalOpen}
        closeModal={onCloseModal}
        addCourtMarker={addCourtMarker}
      />
    </>
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
    opacity: 0.7;
  }
`;

const RemoveMarkerBtn = styled(CloseBtn)`
  padding: 3px;
  border-radius: 50%;
  &:disabled {
    opacity: 0.7;
  }
`;
