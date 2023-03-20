import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ResetPassForm } from "../components";
import { Wrapper, Text } from "../components/microComponets";
import { ModalContent, ModalWrapper } from "../components/ModalWindow";
import { lightTheme } from "../styles/themes";

const ResetPassPage = () => {
  const { token } = useParams();
  return (
    <Wrapper style={{ background: lightTheme.greenMain }}>
      <ModalWrapper>
        <ModalContent>
          <Text fS="20px" fW={700} centred m="20px 0 30px">
            Введіть новий пароль
          </Text>
          <ResetPassForm resetToken={token} />
        </ModalContent>
      </ModalWrapper>
    </Wrapper>
  );
};

export default ResetPassPage;
