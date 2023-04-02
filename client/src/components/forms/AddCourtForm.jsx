import React, { useState, forwardRef } from "react";
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
  FlexBetweenBox,
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
import { RadioButton } from "../index";
import useMediaQuery from "../../hooks/useMediaQuery";

const addCourtSchema = yup.object({
  name: yup.string().max(23, "Максимум 23 символи"),
  sport: yup.string().required("Виберіть тип майданчика"),
});

const AddCourtForm = ({ courtLocation, closeModal }) => {
  const [typeValue, setTypeValue] = useState("");
  const [coverValue, setCoverValue] = useState(null);
  const [hoopCount, setHoopCount] = useState(null);
  const {
    register,
    setValue,
    getValues,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addCourtSchema) });
  const theme = useTheme();

  const handleTypeChange = (e) => {
    setTypeValue(e.target.value);
    setValue("sport", e.target.value);
    setValue(
      "name",
      e.target.value === "basketball"
        ? "Баскетбольний майданчик"
        : e.target.value === "football"
        ? "Футбольне поле"
        : ""
    );
  };

  const handleCoverChange = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : "";
    setCoverValue(selectedOption);
    setValue("cover", value);
  };

  const handleCountChange = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : "";
    setHoopCount(selectedOption);
    setValue("hoopCount", value);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

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
      boxShadow: state.isFocused
        ? "0 0 2px 0 black inset"
        : " rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px",
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
      maxHeight: "147px",
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
    <div>
      <Header>
        <CloseBtn onClick={closeModal}>
          <CloseIcon />
        </CloseBtn>
      </Header>
      <FormWrapper>
        <Text fS="20px" fW={700} m="10px 0 15px" centred>
          Вкажіть інформацію про майданчик
        </Text>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Label pl="10px">
            Тип
            <RadioWrap>
              <RadioButton
                label="Баскетбол"
                value="basketball"
                {...register("sport")}
                onChange={handleTypeChange}
                color={lightTheme.orange}
              />
              <RadioButton
                label="Футбол"
                value="football"
                {...register("sport")}
                onChange={handleTypeChange}
              />
            </RadioWrap>
            <RadioErrorText>{errors.sport?.message}</RadioErrorText>
          </Label>
          <LabelWrapper>
            <Label pl="10px">
              Назва
              <Input {...register("name")} m="5px 0 0" />
              <ErrorText>{errors.name?.message}</ErrorText>
            </Label>
          </LabelWrapper>

          <LabelWrapper>
            <Label pl="10px">
              Покриття
              <Controller
                name="cover"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={
                      typeValue === "basketball"
                        ? basketballCovers
                        : typeValue === "football"
                        ? footballCovers
                        : []
                    }
                    styles={selectStyles}
                    placeholder="Виберіть покриття"
                    isDisabled={!typeValue}
                    onChange={handleCoverChange}
                    value={coverValue}
                  />
                )}
              />
              <ErrorText style={{ bottom: "-20px" }}>
                {errors.cover?.message}
              </ErrorText>
            </Label>
          </LabelWrapper>
          <LabelWrapper>
            <GridWrapper>
              <Label>
                <div style={{ paddingLeft: "10px" }}>
                  Кількість{" "}
                  {`${
                    typeValue === "basketball"
                      ? "кілець"
                      : typeValue === "football"
                      ? "воріт"
                      : "кілець/воріт"
                  }`}
                </div>
                <Controller
                  name="hoopCount"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={hoopsCount}
                      styles={selectStyles}
                      placeholder="Виберіть..."
                      onChange={handleCountChange}
                      value={hoopCount}
                    />
                  )}
                />
              </Label>
              <Label pl="10px">Освітлення</Label>
            </GridWrapper>
          </LabelWrapper>
          <Button type="submit" style={{ margin: "40px auto 0" }}>
            Додати
          </Button>
        </form>
      </FormWrapper>
    </div>
  );
};

export default AddCourtForm;

const GridWrapper = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 50% 50%;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 0 5px;
`;

const RadioWrap = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;

const LabelWrapper = styled.div`
  display: block;
  margin-top: 25px;
`;

const RadioErrorText = styled(ErrorText)``;

const basketballCovers = [
  { value: "rubber", label: "Резина" },
  { value: "asphalt", label: "Асфальт" },
  { value: "beton", label: "Бетон" },
  { value: "indoor", label: "Зал" },
];

const footballCovers = [
  { value: "natural", label: "Натуральне" },
  { value: "synthetic", label: "Синтетичне" },
  { value: "indoor", label: "Зал" },
];

const hoopsCount = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
];
