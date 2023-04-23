import React, { useState, useRef, forwardRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {
  Text,
  Button,
  Input,
  Label,
  BtnSpinnerWrapper,
  FlexBetweenBox,
  CloseBtn,
  ModalHeader,
  BackBtn,
} from "./../microComponets";
import { useForgotPassMutation } from "../../api/authApi";
import { ErrorText, FormWrapper } from "../forms/RegisterForm";
import { BasketballMarker } from "../markers";
import { lightTheme } from "../../styles/themes";
import { CloseIcon, BackIcon } from "../svgIcons";

const forgotPassSchema = yup.object({
  email: yup
    .string()
    .email("Неправильний формат запису")
    .required("Введіть email"),
});

const forgotPassErrors = {
  "User is not found": "Користувач не знайдений",
  "Unknown error": "Упс...невідома помилка",
};

const ForgotPassForm = forwardRef((props, ref) => {
  const { closeModal, goBack } = props;
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(forgotPassSchema) });
  const [submit, { isLoading, isError, isSuccess, error }] =
    useForgotPassMutation();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    const res = await submit(formData);
    if (!res.error && res.data) {
      setSubmitSuccess(true);
      reset();
    }
  };

  return (
    <div ref={ref}>
      <ModalHeader>
        <BackBtn onClick={goBack}>
          <BackIcon />
        </BackBtn>
        <CloseBtn onClick={closeModal}>
          <CloseIcon />
        </CloseBtn>
      </ModalHeader>
      <FormWrapper ref={ref} style={{ padding: "0 5px" }}>
        <Text fS="20px" fW={700} m="15px 10px " centred>
          Введіть електронну пошту
        </Text>
        <Text fS="17px" fW={700} m="0 10px 30px" centred color="secondary">
          І отримаєте лист з посиланням на сторінку відновлення паролю
        </Text>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Label pl="10px">
            Email
            <Input {...register("email")} m="5px 0" />
            <ErrorText>
              {errors.email?.message ||
                (isError && forgotPassErrors[error.data])}
            </ErrorText>
          </Label>
          {submitSuccess && (
            <Text fS="17px" fW={700} centred>
              Успішно. Перевірте вашу пошту
            </Text>
          )}

          <Button
            type="submit"
            disabled={isLoading || isSuccess}
            width="40%"
            m="30px auto 10px auto"
          >
            {isLoading ? (
              <BtnSpinnerWrapper>
                <BasketballMarker />
              </BtnSpinnerWrapper>
            ) : (
              "Надіслати"
            )}
          </Button>
        </form>
      </FormWrapper>
    </div>
  );
});

export default ForgotPassForm;
