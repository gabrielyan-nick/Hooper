import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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

const UserLoginWidget = () => {
  const isAuth = useSelector((state) => !!state.user.user?.token);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  return (
    <>
      <Wrapper>
        {isAuth ? (
          <UserWidget />
        ) : (
          <UserWidgetBtn p='12px 30px' onClick={openModal}>Увійти</UserWidgetBtn>
        )}
      </Wrapper>
      <ModalWindow
        opened={isModalOpen}
        closeModal={closeModal}
        closeClickOutside={false}
      >
        <LoginRegisterScreen closeModal={closeModal} />
      </ModalWindow>
    </>
  );
};

export default UserLoginWidget;
