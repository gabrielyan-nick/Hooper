import React, { useState, useRef, forwardRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
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
} from "./../microComponets";
import { useForgotPassMutation } from "../../api/authApi";
import { ErrorText, FormWrapper } from "../LoginRegisterScreen";
import { BasketballMarker } from "../markers";
import { lightTheme } from "../../styles/themes";

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
  const { changeForm } = props;
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(forgotPassSchema) });
  const [submit, { isLoading, isError, isSuccess, error }] =
    useForgotPassMutation();

  const onSubmit = async (formData) => {
    const res = await submit(formData);
    if (!res.error && res.data) {
      setSubmitSuccess(true);
      reset();
    }
  };

  const goBack = () => {
    changeForm("login");
  };

  return (
    <FormWrapper ref={ref}>
      <Text fS="20px" fW={700} m="15px 0 " centred>
        Введіть електронну пошту
      </Text>
      <Text fS="17px" fW={700} m="0 0 30px" centred color="secondary">
        І отримаєте лист з посиланням на сторінку відновлення паролю
      </Text>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <Label pl="10px">
          Email
          <Input {...register("email")} m="5px 0" />
          <ErrorText>
            {errors.email?.message || (isError && forgotPassErrors[error.data])}
          </ErrorText>
        </Label>
        {submitSuccess && (
          <Text fS="17px" fW={700} centred>
            Успішно. Перевірте вашу пошту
          </Text>
        )}
        <ButtonsWrapper>
          <Button type="submit" disabled={isLoading || isSuccess} width="40%">
            {isLoading ? (
              <BtnSpinnerWrapper>
                <BasketballMarker />
              </BtnSpinnerWrapper>
            ) : (
              "Надіслати"
            )}
          </Button>
          <Button
            width="40%"
            type="button"
            bgColors={lightTheme.btnSecondary}
            disabled={isLoading}
            onClick={goBack}
          >
            Назад
          </Button>
        </ButtonsWrapper>
      </form>
    </FormWrapper>
  );
});

export default ForgotPassForm;

const ButtonsWrapper = styled(FlexBetweenBox)`
  margin: 30px 0 5px;
`;
