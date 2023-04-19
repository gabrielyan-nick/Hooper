import React, { useState, forwardRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
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
  ModalHeader,
  BackBtn,
} from "./../microComponets";
import { CloseIcon, BackIcon } from "./../svgIcons";
import { useUpdateCourtInfoMutation } from "../../api/courtsApi";
import { cities } from "../../data";
import { darkTheme, lightTheme } from "../../styles/themes";
import {
  QuestionIconWrapper,
  PassIconBtn,
  ErrorText,
  FormWrapper,
  SubmitErrorText,
} from "../forms/RegisterForm";
import { RadioButton } from "../index";
import { useAddCourtMutation } from "../../api/courtsApi";
import { BasketballMarker } from "../markers";
import {
  hoopsCountOptions,
  footballCovers,
  basketballCovers,
  LabelWrapper,
  LightingRadioWrapper,
  RadioWrap,
  Header,
  GridWrapper,
} from "./AddCourtForm";

const editCourtSchema = yup.object({
  name: yup.string().max(23, "Максимум 23 символи").required("Введіть назву"),
  sport: yup.string().required("Виберіть тип майданчика"),
  cover: yup.string().required("Виберіть покриття"),
  hoopsCount: yup.number(),
});

const getSelectObj = (value, obj) => {
  return obj.find((item) => item.value === value);
};

const convertBool = (str) => {
  if (str === "true") return true;
  else if (str === "false") return false;
};

const EditCourtForm = ({ courtInfo, closeModal, goBack }) => {
  const token = useSelector((s) => s.storage?.user?.token);
  const actualCoverObj =
    courtInfo.sport === "basketball" ? basketballCovers : footballCovers;
  const [typeValue, setTypeValue] = useState(courtInfo.sport);
  const [coverValue, setCoverValue] = useState(
    getSelectObj(courtInfo.cover, actualCoverObj)
  );
  const [hoopsCount, setHoopsCount] = useState(
    getSelectObj(courtInfo.hoopsCount, hoopsCountOptions)
  );
  const [lighting, setLighting] = useState(
    courtInfo.lighting ? "true" : "false"
  );
  const [submit, result] = useUpdateCourtInfoMutation();

  const {
    register,
    setValue,
    control,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editCourtSchema),
    defaultValues: {
      name: courtInfo.name,
      cover: getSelectObj(courtInfo.cover, actualCoverObj).value,
    },
  });
  const nameWatch = watch("name");
  const theme = useTheme();
  const { courtId } = useParams();
  const isDataEdited =
    typeValue !== courtInfo?.sport ||
    coverValue?.value !==
      getSelectObj(courtInfo?.cover, actualCoverObj)?.value ||
    hoopsCount !== getSelectObj(courtInfo?.hoopsCount, hoopsCountOptions) ||
    convertBool(lighting) !== courtInfo?.lighting ||
    nameWatch !== courtInfo.name;

  const handleTypeChange = (e) => {
    setTypeValue(e.target.value);
    setValue("sport", e.target.value);
    setCoverValue(null);
    setValue("cover", null);
    setValue(
      "name",
      e.target.value === "basketball"
        ? "Баскетбольний майданчик"
        : e.target.value === "football"
        ? "Футбольне поле"
        : ""
    );
  };

  const handleLightingChange = (e) => {
    setLighting(e.target.value);
    setValue("lighting", e.target.value === "true" ? true : false);
  };

  const handleCoverChange = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : "";
    setCoverValue(selectedOption);
    setValue("cover", value);
  };

  const handleCountChange = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : "";
    setHoopsCount(selectedOption);
    setValue("hoopsCount", value);
  };

  const onSubmit = (formData) => {
    formData.lighting === null && delete formData.lighting;
    submit({ courtId, formData, token })
      .then((res) => {
        if (res.data) {
          setTimeout(() => {
            goBack();
          }, 1000);
        } else reset();
      })
      .catch((e) => console.log());
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
      <ModalHeader>
        <BackBtn onClick={goBack}>
          <BackIcon />
        </BackBtn>
        <CloseBtn onClick={closeModal}>
          <CloseIcon />
        </CloseBtn>
      </ModalHeader>
      <FormWrapper style={{ padding: "0 5px 10px 5px" }}>
        <Text fS="20px" fW={700} m="15px 10px 15px" centred>
          Вкажіть актуальну інформацію про майданчик
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
                checked={typeValue === "basketball"}
              />
              <RadioButton
                label="Футбол"
                value="football"
                {...register("sport")}
                onChange={handleTypeChange}
                checked={typeValue === "football"}
              />
            </RadioWrap>
            <ErrorText>{errors.sport?.message}</ErrorText>
          </Label>
          <LabelWrapper>
            <Label pl="10px">
              Назва
              <Input
                {...register("name")}
                m="5px 0 0"
              />
              <ErrorText>{errors.name?.message}</ErrorText>
            </Label>
          </LabelWrapper>
          <GridWrap>
            <div>
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
                      placeholder="Виберіть..."
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
                  name="hoopsCount"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={hoopsCountOptions}
                      styles={selectStyles}
                      placeholder="Виберіть..."
                      onChange={handleCountChange}
                      value={hoopsCount}
                    />
                  )}
                />
              </Label>
            </div>
            <ColumnWrapper>
              <Label style={{ height: "100%", display: "block" }}>
                Освітлення
                <LightingRadioWrap>
                  <RadioButton
                    label="Є"
                    value={true}
                    {...register("lighting")}
                    onChange={handleLightingChange}
                    checked={lighting === "true"}
                  />
                  <RadioButton
                    label="Немає"
                    value={false}
                    {...register("lighting")}
                    color={lightTheme.red}
                    onChange={handleLightingChange}
                    checked={lighting === "false"}
                    closeIcon
                  />
                </LightingRadioWrap>
                <ErrorText>{errors.lighting?.message}</ErrorText>
              </Label>
            </ColumnWrapper>
          </GridWrap>

          {result.isError && (
            <Text fS="18px" color="#ac2b04" centred>
              Упс...Невідома помилка
            </Text>
          )}
          {result.isSuccess && (
            <Text fS="18px" color={lightTheme.green} centred>
              Успішно
            </Text>
          )}
          <Button
            type="submit"
            style={{ margin: "20px auto 0", width: "100px" }}
            disabled={!isDataEdited}
          >
            {result.isLoading ? (
              <BtnSpinnerWrapper>
                <BasketballMarker />
              </BtnSpinnerWrapper>
            ) : (
              "Зберегти"
            )}
          </Button>
        </form>
      </FormWrapper>
    </div>
  );
};

export default EditCourtForm;

const GridWrap = styled(GridWrapper)`
  grid-template-columns: 64% 36%;
`;

const ColumnWrapper = styled.div`
  margin: 0 auto;
`;

const LightingRadioWrap = styled(LightingRadioWrapper)`
  justify-content: space-evenly;
  height: 74%;
  margin: 0;
`;
