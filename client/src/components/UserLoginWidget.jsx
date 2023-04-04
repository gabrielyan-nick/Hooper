import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button, UserWidgetBtn } from "./microComponets";
import { ModalWindow, LoginRegisterScreen, UserWidget } from "./index";

const Wrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  z-index: 10;
`;

const UserLoginWidget = ({ setAddCourtMarker }) => {
  const isAuth = useSelector((state) => !!state.storage.user?.token);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const onCloseLoginModal = () => setIsModalOpen(false);

  const onOpenLoginModal = () => {
    setIsModalOpen(true);
    navigate("/login");
  };

  return (
    <>
      <Wrapper>
        {isAuth ? (
          <UserWidget setAddCourtMarker={setAddCourtMarker} />
        ) : (
          <UserWidgetBtn p="12px 30px" onClick={onOpenLoginModal}>
            Увійти
          </UserWidgetBtn>
        )}
      </Wrapper>
      <ModalWindow opened={isModalOpen} closeModal={onCloseLoginModal} />
    </>
  );
};

export default UserLoginWidget;
