import React, { useState, useRef, forwardRef } from "react";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import styled, { useTheme } from "styled-components";
import { Tooltip } from "react-tooltip";
import {
  Text,
  Button,
  Input,
  Label,
  FlexCenterBox,
  IconButton,
  BtnSpinnerWrapper,
} from "./../microComponets";
import { ShowPassIcon, HidePassIcon, QuestionIcon } from "./../svgIcons";
import { useRegisterMutation } from "../../api/authApi";
import { cities } from "../../data";
import { darkTheme, lightTheme } from "../../styles/themes";
import {
  QuestionIconWrapper,
  PassIconBtn,
  ErrorText,
  FormWrapper,
  SubmitErrorText,
} from "../LoginRegisterScreen";
import { BasketballMarker } from "../markers";

const registerSchema = yup
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
    email: yup
      .string()
      .email("Неправильний формат запису")
      .required("Введіть email"),
    city: yup.object().required("Виберіть місто"),
  })
  .required();

const registerErrors = {
  "Username already exist": "Ім'я вже зайняте",
  "Email already exist": "Цей email вже зареєстрований",
};

const RegisterForm = forwardRef((props, ref) => {
  const { changeForm } = props;
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });
  const [submit, { isLoading, isError, error }] = useRegisterMutation();
  const theme = useTheme();

  const onSubmit = async (formData) => {
    const res = await submit(formData);
    if (!res.error && res.data) {
      changeForm("loginAfterReg");
    } else if (res.error.status === 500) {
      setSubmitError(true);
    }
  };

  const changeToLogin = () => {
    changeForm("login");
  };

  const togglePassVisible = () => setIsPassVisible(!isPassVisible);

  const selectStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderRadius: "7px",
      backgroundColor: theme.inputBg,
      outline: state.isFocused ? theme.inputBorder : "none",
      fontFamily: "Golos Text, sans-serif",
      fontWeight: 700,
      margin: "5px 0 25px",
      paddingLeft: "5px",
      boxShadow: state.isFocused ? "0 0 2px 0 black inset" : "none",
      border: "none",
      color: "FFF",
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      fontFamily: "Golos Text, sans-serif",
      fontWeight: 700,
      background: state.isFocused ? theme.selectBg : "transparent",
      color: state.isFocused ? "#fff" : "#333",
    }),
    menuList: (baseStyles, state) => ({
      ...baseStyles,
      maxHeight: "170px",
      borderRadius: "10px",
      background: theme.inputBg,
      "&::-webkit-scrollbar": {
        width: "7px",
        backgroundColor: "#BDA69E",
        borderRadius: "10px",
      },
      "&::-webkit-scrollbar-thumb": {
        background: theme.scrollbar,
        borderRadius: "10px",
      },
    }),
    menu: (baseStyles, state) => ({
      ...baseStyles,
      borderRadius: "10px",
    }),
    dropdownIndicator: (baseStyles, state) => ({
      ...baseStyles,
      color: state.isFocused ? "#a0310c" : "#2c2522",
      "&:hover": {
        color: "#a0310c",
      },
    }),
    placeholder: (baseStyles, state) => ({
      ...baseStyles,
      color: theme.placeholderText,
    }),
  };

  return (
    <FormWrapper ref={ref}>
      <Text fS="20px" fW={700} m="15px 0 40px" centred>
        Зареєструйтесь, щоб мати більше можливостей
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label pl="10px">
          Ім'я користувача
          <Input {...register("username")} m="5px 0 25px" />
          <ErrorText>
            {errors.username?.message ||
              (isError &&
                error.data === "Username already exist" &&
                registerErrors[error.data])}
          </ErrorText>
        </Label>
        <Label pl="10px">
          Пароль
          <Input
            {...register("password")}
            type={isPassVisible ? "text" : "password"}
            m="5px 0 25px"
            p="9px 40px 9px 15px"
          />
          <PassIconBtn onClick={togglePassVisible} type="button">
            {isPassVisible ? <ShowPassIcon /> : <HidePassIcon />}
          </PassIconBtn>
          <ErrorText>{errors.password?.message}</ErrorText>
        </Label>
        <Label pl="10px">
          Email
          <QuestionIconWrapper
            type="button"
            data-tooltip-id={"email"}
            data-tooltip-place={"top"}
          >
            <QuestionIcon />
            <Tooltip
              id={"email"}
              openOnClick
              style={{
                borderRadius: "15px",
                maxWidth: "95vw",
                backgroundColor: "#443630",
              }}
            >
              email використовується лише для відновлення паролю
            </Tooltip>
          </QuestionIconWrapper>
          <Input {...register("email")} m="5px 0 25px" />
          <ErrorText>
            {errors.email?.message ||
              (isError &&
                error.data === "Email already exist" &&
                registerErrors[error.data])}
          </ErrorText>
        </Label>
        <Label pl="10px">
          Місто
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={cities}
                styles={selectStyles}
                placeholder="Виберіть ваше місто"
              />
            )}
          />
          <ErrorText style={{ bottom: "-20px" }}>
            {errors.city?.message}
          </ErrorText>
        </Label>
        {submitError && (
          <SubmitErrorText>Упс...невідома помилка</SubmitErrorText>
        )}
        <FlexCenterBox>
          <Button
            type="submit"
            disabled={isLoading}
            width="170px"
            onClick={() => setSubmitError(false)}
          >
            {isLoading ? (
              <BtnSpinnerWrapper>
                <BasketballMarker />
              </BtnSpinnerWrapper>
            ) : (
              "Зареєструватись"
            )}
          </Button>
        </FlexCenterBox>
      </form>
      <Text fS="17px" fW={700} m="10px 0" color="secondary" centred>
        Або увійдіть, якщо вже маєте акаунт
      </Text>
      <Button
        disabled={isLoading}
        p="10px 60px"
        onClick={changeToLogin}
        bgColors={lightTheme.btnSecondary}
      >
        Увійти
      </Button>
    </FormWrapper>
  );
});

export default RegisterForm;
