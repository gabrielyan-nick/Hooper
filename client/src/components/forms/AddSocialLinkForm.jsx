import React, { useState, forwardRef, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { storage } from "../../firebase";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import styled, { useTheme } from "styled-components";
import parseUrl from "url-parse";
import {
  Text,
  Button,
  Input,
  Label,
  FlexCenterBox,
  IconButton,
  BtnSpinnerWrapper,
  CloseBtn,
  FlexBetweenBox,
  ModalHeader,
  IconBtnBg,
  IconSpinnerWrapper,
} from "./../microComponets";
import { CloseIcon, SaveIcon } from "./../svgIcons";
import {
  QuestionIconWrapper,
  PassIconBtn,
  ErrorText,
  SubmitErrorText,
} from "../forms/RegisterForm";
import { useAddSocialLinkMutation } from "../../api/userApi";
import { getSocialNetwork, isUrlTest } from "../../utils";
import { setLogin } from "../../store/storageSlice";
import { BasketballMarker, FootballMarker } from "../markers";

const balls = [<BasketballMarker size={18} />, <FootballMarker size={18} />];

const AddSocialLinkSchema = yup.object({
  link: yup
    .string()
    .test("isUrl", "Неправильний формат", (value) => {
      if (!value) return true;
      return isUrlTest(value);
    })
    .required("Введіть посилання"),
});

const AddSocialLinkForm = forwardRef(
  ({ onCancelAddLink, isLinkAdded }, ref) => {
    const token = useSelector((s) => s.storage.user?.token);
    const userId = useSelector((s) => s.storage.user?._id);
    const [isSubmitError, setIsSubmitError] = useState(false);
    const {
      register,
      handleSubmit,
      setValue,
      reset,
      formState: { errors },
    } = useForm({ resolver: yupResolver(AddSocialLinkSchema) });
    const dispatch = useDispatch();
    const [submitAdd, result] = useAddSocialLinkMutation();
    const inputRef = useRef(null);

    useEffect(() => {
      inputRef.current && inputRef.current.focus();
    }, [isLinkAdded]);

    const onSubmit = (formData) => {
      const linkDomain = parseUrl(formData.link).hostname;
      console.log(linkDomain);
      const linkName = getSocialNetwork(linkDomain);
      formData.name = linkName;
      submitAdd({ userId, token, formData })
        .then((result) => {
          if (result.data) {
            dispatch(setLogin(result.data));
            onCancelAddLink();
          } else setIsSubmitError(true);
        })
        .catch((e) => {
          setIsSubmitError(true);
          console.log(e);
        });
    };

    const onInputChange = (e) => {
      setValue("link", e.target.value);
      isSubmitError && setIsSubmitError(false);
    };

    return (
      <FormWrapper ref={ref} onSubmit={handleSubmit(onSubmit)}>
        <AddInput
          {...register("link")}
          ref={inputRef}
          onChange={(e) => onInputChange(e)}
          disabled={result.isLoading}
        />
        <ErrorText style={{ top: "35px" }}>
          {isSubmitError ? "Упс...щось пішло не так" : errors.link?.message}
        </ErrorText>
        <BtnsWrapper>
          <Btn color="green" type="submit" disabled={result.isLoading}>
            {result.isLoading ? (
              <IconSpinnerWrapper size="18px">
                {balls[Math.floor(Math.random() * 2)]}
              </IconSpinnerWrapper>
            ) : (
              <SaveIcon />
            )}
          </Btn>
          <Btn color="#9e1b04" onClick={onCancelAddLink} type="button">
            <CloseIcon />
          </Btn>
        </BtnsWrapper>
      </FormWrapper>
    );
  }
);

export default AddSocialLinkForm;

const FormWrapper = styled.form`
  position: relative;
  width: 100%;
  display: flex;
`;

const BtnsWrapper = styled.div`
  display: flex;
`;

const AddInput = styled(Input)`
  padding: 5px 10px;
  height: 27px;
  font-weight: 600;
`;

const Btn = styled(IconBtnBg)`
  border-radius: 7px;
  padding: 2px;
  margin-left: 5px;
  width: 27px;
  height: 27px;
  &:disabled {
    cursor: default;
    opacity: 0.9;
  }
`;
