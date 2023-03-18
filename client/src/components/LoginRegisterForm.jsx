import React, { useState, useRef, forwardRef } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import styled from "styled-components";
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
import { ShowPassIcon, HidePassIcon, QuestionIcon } from "./svgIcons";
import { useRegisterMutation, useLoginMutation } from "../api/authApi";
import { cities } from "../data";

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
      <Text fS="20px" fW={700} m="5px 0 20px">
        Увійдіть до свого акаунту
      </Text>
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
          <Button
            p="10px 60px"
            type="submit"
            bgColors={{ first: "#2d013f", second: "#af0606" }}
          >
            Увійти
          </Button>
        </FlexCenterBox>
      </form>

      <Text fS="20px" fW={700} m="10px 0" centred>
        Немає акаунта? Зареєструйтесь, щоб мати більше можливостей
      </Text>
      <Button
        bgColors={{ first: "#035a24", second: "#a70744" }}
        onClick={props.changeForm}
      >
        Зареєструватись
      </Button>
    </FormWrapper>
  );
});

const registerSchema = yup
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
  const [isPassVisible, setIsPassVisible] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });

  const [submit, result] = useRegisterMutation();

  const onSubmit = (data) => {
    submit(data);
    console.log(result);
  };

  const togglePassVisible = () => setIsPassVisible(!isPassVisible);

  return (
    <FormWrapper ref={ref}>
      <Text fS="20px" fW={700} m="5px 0 20px" centred>
        Зареєструйтесь, щоб мати більше можливостей
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label pl="10px">
          Ім'я користувача
          <Input {...register("username")} mt="5px" mb="25px" />
          <ErrorText>
            {errors.username?.message ||
              (result.isError &&
                result.error.data === "Username already exist" &&
                registerErrors[result.error.data])}
          </ErrorText>
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

        <Label pl="10px">
          Email
          <QuestionIconWrapper
            type="button"
            data-tooltip-id={"email"}
            data-tooltip-place={"bottom"}
          >
            <QuestionIcon />
            <Tooltip
              id={"email"}
              openOnClick
              style={{ borderRadius: "15px", maxWidth: "95vw" }}
            >
              email використовується лише для відновлення паролю
            </Tooltip>
          </QuestionIconWrapper>
          <Input {...register("email")} mt="5px" mb="25px" />
          <ErrorText>
            {errors.email?.message ||
              (result.isError &&
                result.error.data === "Email already exist" &&
                registerErrors[result.error.data])}
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

        <FlexCenterBox>
          <Button
            type="submit"
            disabled={result.isLoading}
            bgColors={{ first: "#035a24", second: "#a70744" }}
            height="44px"
            width="170px"
          >
            {result.isLoading ? <BtnSpinner /> : "Зареєструватись"}
          </Button>
        </FlexCenterBox>
      </form>
      <Text fS="20px" fW={700} m="10px 0" centred>
        Або увійдіть, якщо вже маєте акаунт
      </Text>
      <Button
        disabled={result.isLoading}
        p="10px 60px"
        onClick={props.changeForm}
        bgColors={{ first: "#2d013f", second: "#af0606" }}
      >
        Увійти
      </Button>
    </FormWrapper>
  );
});

const ErrorText = styled(Text)`
  position: absolute;
  bottom: -30px;
  left: 10px;
  color: #912505;
`;

const PassIconBtn = styled(IconButton)`
  position: absolute;
  top: 33px;
  right: 15px;
`;

const QuestionIconWrapper = styled(IconButton)`
  position: absolute;
  top: 0px;
  left: 60px;
`;

const selectStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderRadius: "15px",
    backgroundColor: "#fff",
    outline: state.isFocused ? "2px solid #039768" : "none",
    fontFamily: "Nunito, sans-serif",
    fontWeight: 700,
    margin: "5px 0 25px",
    paddingLeft: "5px",
    boxShadow: state.isFocused ? "0 0 3px 0 black inset" : "0 0 3px 0 black",
    border: "none",
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    fontFamily: "Nunito, sans-serif",
    fontWeight: 700,
    backgroundColor: state.isFocused ? "#2aa07b" : "transparent",
    color: state.isFocused ? "#fff" : "#333",
  }),
  menuList: (baseStyles, state) => ({
    ...baseStyles,
    maxHeight: "170px",
    borderRadius: "10px",
    "&::-webkit-scrollbar": {
      width: "7px",
      backgroundColor: "#aef3d8",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#2aa07b",
      borderRadius: "10px",
    },
  }),
  menu: (baseStyles, state) => ({
    ...baseStyles,
    borderRadius: "10px",
  }),
  dropdownIndicator: (baseStyles, state) => ({
    ...baseStyles,
    color: state.isFocused ? "#01311f" : "#01311f",
    "&:hover": {
      color: "#035537",
    },
  }),
};

export default LoginRegisterForm;
