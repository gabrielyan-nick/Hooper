import React, { useState, useRef, forwardRef } from "react";
import { useSelector } from "react-redux";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import styled, { useTheme, css } from "styled-components";
import { Tooltip } from "react-tooltip";
import {
  Text,
  Button,
  Input,
  Label,
  FlexCenterBox,
  IconButton,
  BtnSpinner,
} from "./microComponets";
import {
  LoginForm,
  LoginFormWrapper,
  RegisterForm,
  LoginAfterReg,
} from "../components";
import { ShowPassIcon, HidePassIcon, QuestionIcon } from "./svgIcons";
import { useRegisterMutation, useLoginMutation } from "../api/authApi";
import { cities } from "../data";
import { darkTheme, lightTheme } from "../styles/themes";

const LoginRegisterScreen = () => {
  const [formType, setFormType] = useState("login");
  const loginRef = useRef(null);
  const registerRef = useRef(null);
  const loginAfterRegRef = useRef(null);
  const nodeRef =
    formType === "login"
      ? loginRef
      : formType === "loginAfterReg"
      ? loginAfterRegRef
      : registerRef;

  const changeFormType = (type) => {
    setFormType(type);
  };

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        nodeRef={nodeRef}
        key={formType}
        classNames="switch"
        timeout={200}
      >
        {formType === "login" ? (
          <>
            <LoginFormWrapper ref={nodeRef} />
            <FlexCenterBox direction="column" style={{ padding: "0 7px 10px" }}>
              <Text fS="17px" fW={700} m="10px 0" color="secondary" centred>
                Немає акаунта? Зареєструйтесь, щоб мати більше можливостей
              </Text>
              <Button
                bgColors={lightTheme.btnSecondary}
                onClick={() => changeFormType("register")}
              >
                Зареєструватись
              </Button>
            </FlexCenterBox>
          </>
        ) : formType === "loginAfterReg" ? (
          <LoginAfterReg ref={nodeRef} />
        ) : (
          <RegisterForm ref={nodeRef} changeForm={changeFormType} />
        )}
      </CSSTransition>
    </SwitchTransition>
  );
};

export const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 7px 10px;
`;

export const ErrorText = styled(Text)`
  font-family: "Play", sans-serif;
  position: absolute;
  bottom: -30px;
  left: 10px;
  color: #ac2b04;
`;

export const PassIconBtn = styled(IconButton)`
  position: absolute;
  top: 33px;
  right: 15px;
`;

export const QuestionIconWrapper = styled(IconButton)`
  position: absolute;
  top: 0px;
  left: 60px;
`;

export default LoginRegisterScreen;
