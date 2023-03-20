import React, { useState, useRef, forwardRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import styled, { useTheme, css } from "styled-components";
import {
  Text,
  Button,
  Input,
  Label,
  FlexCenterBox,
  IconButton,
  BtnSpinner,
} from "./../microComponets";
import { ShowPassIcon, HidePassIcon } from "./../svgIcons";
import { useLoginMutation } from "../../api/authApi";

const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 7px 10px;
`;

const ErrorText = styled(Text)`
  font-family: "Play", sans-serif;
  position: absolute;
  bottom: -30px;
  left: 10px;
  color: #ac2b04;
`;

const PassIconBtn = styled(IconButton)`
  position: absolute;
  top: 33px;
  right: 15px;
`;

const loginSchema = yup
  .object({
    username: yup
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

export const LoginForm = forwardRef((props, ref) => {
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label pl="10px">
          Ім'я користувача
          <Input {...register("username")} mt="5px" mb="25px" />
          <ErrorText>{errors.username?.message}</ErrorText>
        </Label>

        <Label pl="10px">
          Пароль
          <Input
            {...register("password")}
            type={isPassVisible ? "text" : "password"}
            mt="5px"
            mb="25px"
            p="9px 40px 9px 15px"
          />
          <PassIconBtn onClick={togglePassVisible} type="button">
            {isPassVisible ? <ShowPassIcon /> : <HidePassIcon />}
          </PassIconBtn>
          <ErrorText>{errors.password?.message}</ErrorText>
        </Label>
        <FlexCenterBox>
          <Button p="10px 60px" type="submit">
            Увійти
          </Button>
        </FlexCenterBox>
      </form>
    </FormWrapper>
  );
});

export const LoginFormWrapper = forwardRef((props, ref) => {
  return (
    <>
      <Text fS="20px" fW={700} m="15px 0 40px" centred>
        Увійдіть до свого акаунту
      </Text>
      <LoginForm ref={ref} />
    </>
  );
});

export const LoginAfterReg = forwardRef((props, ref) => {
  return (
    <>
      <Text fS="20px" fW={700} m="15px 0 10px" centred>
        Регістрація пройшла успішно
      </Text>
      <Text fS="17px" fW={700} m="15px 0 40px" centred>
        Увійдіть до свого акаунту
      </Text>
      <LoginForm ref={ref} />
    </>
  );
});
