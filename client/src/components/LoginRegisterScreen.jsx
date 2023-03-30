import React, { useState, useRef, forwardRef, Fragment } from "react";
import { useSelector } from "react-redux";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import styled, { useTheme, css } from "styled-components";
import {
  Text,
  Button,
  Input,
  Label,
  FlexCenterBox,
  IconButton,
  BtnSpinner,
  CloseBtn,
  FlexBetweenBox,
  BackBtn,
} from "./microComponets";
import {
  LoginForm,
  LoginFormWrapper,
  RegisterForm,
  LoginAfterReg,
  ForgotPassForm,
} from "../components";
import { CloseIcon, BackIcon } from "./svgIcons";
// import { ModalHeader } from "./ModalWindow";

const Header = styled(FlexBetweenBox)`
  justify-content: ${(props) => (props.backBtn ? "space-between" : "flex-end")};
`;

const LoginRegisterScreen = forwardRef((props, ref) => {
  const { closeModal, changeModalType, backBtn = false } = props;
  const [formType, setFormType] = useState("login");
  const loginRef = useRef(null);
  const registerRef = useRef(null);
  const loginAfterRegRef = useRef(null);
  const forgotPassRef = useRef(null);
  const nodeRef =
    formType === "login"
      ? loginRef
      : formType === "loginAfterReg"
      ? loginAfterRegRef
      : formType === "forgotPass"
      ? forgotPassRef
      : registerRef;

  const changeFormType = (type) => {
    setFormType(type);
  };

  const onBackToCourt = () => changeModalType({ type: "court" });

  return (
    <div ref={ref}>
      <Header backBtn={backBtn}>
        {backBtn && (
          <BackBtn onClick={onBackToCourt}>
            <BackIcon />
          </BackBtn>
        )}
        <CloseBtn onClick={closeModal}>
          <CloseIcon />
        </CloseBtn>
      </Header>
      <SwitchTransition mode="out-in">
        <CSSTransition
          nodeRef={nodeRef}
          key={formType}
          classNames="switch"
          timeout={300}
        >
          {formType === "login" ? (
            <LoginFormWrapper
              ref={nodeRef}
              changeForm={changeFormType}
              closeModal={closeModal}
            />
          ) : formType === "loginAfterReg" ? (
            <LoginAfterReg
              ref={nodeRef}
              closeModal={closeModal}
              changeForm={changeFormType}
            />
          ) : formType === "forgotPass" ? (
            <ForgotPassForm ref={forgotPassRef} changeForm={changeFormType} />
          ) : (
            <RegisterForm ref={nodeRef} changeForm={changeFormType} />
          )}
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
});

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
  top: 65px;
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

export const SubmitErrorText = styled.p`
  font-family: "Play", sans-serif;
  font-weight: 600;
  color: #ac2b04;
  padding: 0 0 10px;
  text-align: center;
`;

export default LoginRegisterScreen;
