import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "./microComponets";
import { ModalWindow, LoginRegisterForm } from "./index";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  return (
    <>
      <Wrapper>
        <Button onClick={openModal}>Увійти</Button>
      </Wrapper>
      <ModalWindow
        opened={isModalOpen}
        closeModal={closeModal}
        closeClickOutside={false}
      >
        <LoginRegisterForm />
      </ModalWindow>
    </>
  );
};

export default UserLoginWidget;
