import React, { useState, useRef, forwardRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { setLogin } from "../../store/storageSlice";
import {
  Text,
  Button,
  Input,
  Label,
  FlexCenterBox,
  IconButton,
  BtnSpinnerWrapper,
  TextButton,
  ModalHeader,
  CloseBtn,
  BackBtn,
} from "./../microComponets";
import { ShowPassIcon, HidePassIcon, CloseIcon, BackIcon } from "./../svgIcons";
import { useLoginMutation } from "../../api/authApi";
import {
  PassIconBtn,
  ErrorText,
  FormWrapper,
  SubmitErrorText,
} from "../forms/RegisterForm";
import { BasketballMarker } from "../markers";
import { lightTheme } from "../../styles/themes";

const loginSchema = yup
  .object({
    username: yup
      .string()
      .max(20, "Максимум 20 символів")
      .min(2, "Мінімум 2 символи")
      .required("Введіть ім'я користувача"),
    password: yup
      .string()
      .min(6, "Мінімум 6 символів")
      .required("Введіть пароль"),
  })
  .required();

const loginErrors = {
  "User does not exist": "Користувач не знайдений",
  "Invalid password": "Не вірний пароль",
};

export const LoginForm = forwardRef((props, ref) => {
  const { closeModal, afterReg = false } = props;
  const [submitError, setSubmitError] = useState(false);
  const [isPassVisible, setIsPassVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });
  const [submit, { isLoading, isError, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    const res = await submit(formData);
    if (!res.error && res.data) {
      dispatch(setLogin(res.data));
      closeModal();
      navigate("/");
    } else if (res.error.status === 500) {
      setSubmitError(true);
    }
  };

  const onChangeToReg = () => {
    navigate("/register");
  };

  const onChangeToForgotPass = () => {
    navigate("/forgot-pass");
  };

  const togglePassVisible = () => setIsPassVisible(!isPassVisible);

  return (
    <FormWrapper ref={ref}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label pl="10px">
          Ім'я користувача
          <Input {...register("username")} m="5px 0 25px" />
          <ErrorText>
            {errors.username?.message ||
              (isError &&
                error.data === "User does not exist" &&
                loginErrors[error.data])}
          </ErrorText>
        </Label>

        <Label pl="10px">
          Пароль
          <Input
            {...register("password")}
            type={isPassVisible ? "text" : "password"}
            m="5px 0"
            p="9px 40px 9px 15px"
          />
          <PassIconBtn onClick={togglePassVisible} type="button">
            {isPassVisible ? <ShowPassIcon /> : <HidePassIcon />}
          </PassIconBtn>
          <ErrorText>
            {errors.password?.message ||
              (isError &&
                error.data === "Invalid password" &&
                loginErrors[error.data])}
          </ErrorText>
          <TextButton
            onClick={onChangeToForgotPass}
            type="button"
            m="0 5px 15px auto"
          >
            Забули пароль?
          </TextButton>
        </Label>

        {submitError && (
          <SubmitErrorText>Упс...невідома помилка</SubmitErrorText>
        )}
        <FlexCenterBox>
          <Button
            p="10px 60px"
            type="submit"
            disabled={isLoading}
            onClick={() => setSubmitError(false)}
          >
            {isLoading ? (
              <BtnSpinnerWrapper>
                <BasketballMarker />
              </BtnSpinnerWrapper>
            ) : (
              "Увійти"
            )}
          </Button>
        </FlexCenterBox>
      </form>
      {!afterReg && (
        <FlexCenterBox direction="column" style={{ padding: "0 7px" }}>
          <Text fS="17px" fW={700} m="10px 0" color="secondary" centred>
            Немає акаунта? Зареєструйтесь, щоб мати більше можливостей
          </Text>
          <Button
            onClick={onChangeToReg}
            bgColors={lightTheme.btnSecondary}
            disabled={isLoading}
          >
            Зареєструватись
          </Button>
        </FlexCenterBox>
      )}
    </FormWrapper>
  );
});

export const LoginFormWrapper = forwardRef((props, ref) => {
  const { closeModal, history, goBack } = props;
  const isBackBtn = history[history.length - 2]?.startsWith("/courts");

  return (
    <div ref={ref}>
      <ModalHeader empty={!isBackBtn}>
        {isBackBtn && (
          <BackBtn onClick={goBack}>
            <BackIcon />
          </BackBtn>
        )}
        <CloseBtn onClick={closeModal}>
          <CloseIcon />
        </CloseBtn>
      </ModalHeader>
      <Text fS="20px" fW={700} m="15px 10px 40px" centred>
        Увійдіть до свого акаунту
      </Text>
      <LoginForm closeModal={closeModal} />
    </div>
  );
});

export const LoginAfterReg = forwardRef((props, ref) => {
  return (
    <>
      <ModalHeader empty>
        <CloseBtn closeModal={props.closeModal}>
          <CloseIcon />
        </CloseBtn>
      </ModalHeader>
      <Text fS="20px" fW={700} m="15px 10px 10px" centred>
        Реєстрація пройшла успішно
      </Text>
      <Text fS="17px" fW={700} m="15px 10px 40px" centred>
        Увійдіть до свого акаунту
      </Text>
      <LoginForm ref={ref} closeModal={props.closeModal} afterReg />
    </>
  );
});
