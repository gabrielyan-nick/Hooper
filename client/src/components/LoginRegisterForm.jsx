import React, { useState, useRef, forwardRef } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {
  Text,
  Button,
  Input,
  Label,
  FlexCenterBox,
  IconButton,
} from "./microComponets";
import { ShowPassIcon, HidePassIcon } from "./svgIcons";

const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 7px 7px 10px;
`;

const LoginRegisterForm = () => {
  const [formType, setFormType] = useState("login");
  const loginRef = useRef(null);
  const registerRef = useRef(null);
  const nodeRef = formType === "login" ? loginRef : registerRef;

  const changeFormType = () => {
    setFormType(formType === "login" ? "register" : "login");
  };

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        nodeRef={nodeRef}
        key={formType}
        classNames="switch"
        unmountOnExit
        timeout={200}
      >
        {formType === "login" ? (
          <LoginForm ref={nodeRef} changeForm={changeFormType} />
        ) : (
          <RegisterForm ref={nodeRef} changeForm={changeFormType} />
        )}
      </CSSTransition>
    </SwitchTransition>
  );
};

const loginSchema = yup
  .object({
    name: yup
      .string()
      .max(30, "Максмимум 30 символів")
      .min(2, "Мінімум 2 символи")
      .required("Введіть ім'я користувача"),
    password: yup
      .string()
      .min(6, "Мінімум 6 символів")
      .required("Введіть пароль"),
  })
  .required();

const LoginForm = forwardRef((props, ref) => {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = (data) => console.log(data);

  const togglePassVisible = () => setIsPassVisible(!isPassVisible);

  return (
    <FormWrapper ref={ref}>
      <Text fS="20px" fW={700} m="0 0 20px">
        Увійдіть до свого акаунту
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label pl="10px">
          Ім'я користувача
          <Input {...register("name")} mt="5px" mb="25px" />
          <ErrorText>{errors.name?.message}</ErrorText>
        </Label>

        <Label pl="10px">
          Пароль
          <Input
            {...register("password")}
            type={isPassVisible ? "text" : "password"}
            mt="5px"
            mb="25px"
            p="7px 40px 7px 15px"
          />
          <PassIconBtn onClick={togglePassVisible} type="button">
            {isPassVisible ? <ShowPassIcon /> : <HidePassIcon />}
          </PassIconBtn>
          <ErrorText>{errors.password?.message}</ErrorText>
        </Label>
        <FlexCenterBox>
          <Button type="submit">Увійти</Button>
        </FlexCenterBox>
      </form>
      <Text fS="20px" fW={700} m='10px 0' centred>
        Або зареєструйтесь, щоб мати більше можливостей
      </Text>
      <Button onClick={props.changeForm}>Зареєструватись</Button>
    </FormWrapper>
  );
});

const RegisterForm = forwardRef((props, ref) => {
  return (
    <FormWrapper>
      <Text fS="20px" fW={700}>
        Зареєструйтесь, щоб мати більше можливостей
      </Text>

      <Text fS="20px" fW={700} centred>
        Або увійдіть, якщо вже маєте акаунт
      </Text>
      <Button onClick={props.changeForm}>Увійти</Button>
    </FormWrapper>
  );
});

const ErrorText = styled(Text)`
  position: absolute;
  bottom: -28px;
  left: 10px;
  color: #912505;
`;

const PassIconBtn = styled(IconButton)`
  position: absolute;
  top: 31px;
  right: 15px;
`;

export default LoginRegisterForm;
