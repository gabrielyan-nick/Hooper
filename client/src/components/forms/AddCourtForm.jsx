import React from "react";
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
  CloseBtn,
} from "./../microComponets";
import {
  ShowPassIcon,
  HidePassIcon,
  QuestionIcon,
  CloseIcon,
} from "./../svgIcons";
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

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const AddCourtForm = ({ closeModal }) => {
  return (
    <div>
      <Header>
        <CloseBtn onClick={closeModal}>
          <CloseIcon />
        </CloseBtn>
      </Header>
    </div>
  );
};

export default AddCourtForm;
