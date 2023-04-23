import React, { useState, useRef, forwardRef } from "react";
import { useDispatch } from "react-redux";
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
  BtnSpinnerWrapper,
  TextButton,
} from "./../microComponets";
import { useResetPassMutation } from "../../api/authApi";
import {
  PassIconBtn,
  ErrorText,
  FormWrapper,
  SubmitErrorText,
} from "../forms/RegisterForm";
import { BasketballMarker } from "../markers";
import { ShowPassIcon, HidePassIcon } from "../svgIcons";
import { lightTheme } from "../../styles/themes";

const resetPassSchema = yup.object({
  password: yup
    .string()
    .min(6, "Мінімум 6 символів")
    .required("Введіть пароль"),
  confirm: yup
    .string()
    .min(6, "Мінімум 6 символів")
    .oneOf([yup.ref("password")], "Паролі мають збігатися")
    .required("Введіть пароль"),
});

const resetPassErrors = {
  "Password reset link is invalid or has expired":
    "Упс...Минув час дії посилання",
  "Unknown error": "Упс...невідома помилка",
};

const ResetPassForm = ({ resetToken }) => {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(resetPassSchema) });
  const [submit, { isLoading, isError, isSuccess, error }] =
    useResetPassMutation();

  const onSubmit = async (formData) => {
    const passData = {
      password: formData.password,
      token: resetToken,
    };
    const res = await submit(passData);
    if (!res.error && res.data) {
      setSubmitSuccess(true);
      reset();
    } else reset();
  };

  const togglePassVisible = () => setIsPassVisible(!isPassVisible);

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <Label pl="10px">
          Новий пароль
          <Input
            {...register("password")}
            type={isPassVisible ? "text" : "password"}
            m="5px 0 25px"
            p="9px 40px 9px 15px"
            disabled={isSuccess}
          />
          <PassIconBtn onClick={togglePassVisible} type="button">
            {isPassVisible ? <ShowPassIcon /> : <HidePassIcon />}
          </PassIconBtn>
          <ErrorText>{errors.password?.message}</ErrorText>
        </Label>
        <Label pl="10px">
          Підтвердіть пароль
          <Input
            {...register("confirm")}
            type="password"
            m="5px 0 25px"
            p="9px 40px 9px 15px"
            disabled={isSuccess}
          />
          <ErrorText>
            {errors.confirm?.message ||
              (isError && resetPassErrors[error.data])}
          </ErrorText>
        </Label>
        {submitSuccess && (
          <Text fS="17px" fW={700} centred color={lightTheme.green}>
            Пароль успішно змінено
          </Text>
        )}
        <Button
          m="30px auto 5px auto"
          type="submit"
          disabled={isLoading || isSuccess}
          width="160px"
        >
          {isLoading ? (
            <BtnSpinnerWrapper>
              <BasketballMarker />
            </BtnSpinnerWrapper>
          ) : (
            "Змінити"
          )}
        </Button>
      </form>
    </FormWrapper>
  );
};

export default ResetPassForm;
