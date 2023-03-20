import React, { useState, useRef, forwardRef } from "react";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { setLogin } from "../../store/userSlice";
import {
  Text,
  Button,
  Input,
  Label,
  FlexCenterBox,
  IconButton,
  BtnSpinnerWrapper,
  TextButton,
} from "./../microComponets";
import { ShowPassIcon, HidePassIcon } from "./../svgIcons";
import { useLoginMutation } from "../../api/authApi";
import {
  PassIconBtn,
  ErrorText,
  FormWrapper,
  SubmitErrorText,
} from "../LoginRegisterScreen";
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
  const { changeForm, afterReg = false, closeModal } = props;
  const [submitError, setSubmitError] = useState(false);
  const [isPassVisible, setIsPassVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });
  const [submit, { isLoading, isError, error }] = useLoginMutation();
  const dispatch = useDispatch();

  const onSubmit = async (formData) => {
    const res = await submit(formData);
    if (!res.error && res.data) {
      dispatch(setLogin(res.data));
      closeModal();
    } else if (res.error.status === 500) {
      setSubmitError(true);
    }
  };

  const changeToReg = () => {
    changeForm("register");
  };

  const changeToForgotPass = () => {
    changeForm("forgotPass");
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
            onClick={changeToForgotPass}
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
            onClick={changeToReg}
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
  return (
    <>
      <Text fS="20px" fW={700} m="15px 0 40px" centred>
        Увійдіть до свого акаунту
      </Text>
      <LoginForm
        ref={ref}
        closeModal={props.closeModal}
        changeForm={props.changeForm}
      />
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
      <LoginForm
        ref={ref}
        closeModal={props.closeModal}
        changeForm={props.changeForm}
        afterReg
      />
    </>
  );
});
