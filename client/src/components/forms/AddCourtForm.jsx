import React, { useState, forwardRef } from "react";
import { useSelector } from "react-redux";
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
} from "./../microComponets";
import { CloseIcon } from "./../svgIcons";
import { useRegisterMutation } from "../../api/authApi";
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

const addCourtSchema = yup.object({
  name: yup.string().max(23, "Максимум 23 символи"),
  sport: yup.string().required("Виберіть тип майданчика"),
  cover: yup.string().required("Виберіть покриття"),
  hoopsCount: yup.number(),
});

const AddCourtForm = ({ courtLocation, closeModal, setAddCourtMarker }) => {
  const [typeValue, setTypeValue] = useState("");
  const [coverValue, setCoverValue] = useState(null);
  const [hoopsCount, setHoopsCount] = useState(null);
  const [lighting, setLighting] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [submitForm, res, isLoading, isError, isSuccess] =
    useAddCourtMutation();
  const {
    register,
    setValue,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addCourtSchema) });
  const theme = useTheme();

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

  const onClosePhoto = () => {
    setPhotoUrl(null);
  };

  const onSubmit = (data) => {
    data.lighting === null && delete data.lighting;
    if (photo) {
      const imageRef = ref(storage, `courts/${photo.name}`);
      uploadBytes(imageRef, photo)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              const formData = {
                ...data,
                photos: url,
                location: {
                  type: "Point",
                  coordinates: [courtLocation.lat, courtLocation.lng],
                },
              };
              submitForm(formData).then((res) => {
                if (res.data) {
                  setAddCourtMarker(null);
                  setTimeout(() => closeModal(), 2000);
                } else reset();
              });
            })
            .catch((e) => console.log(e));
        })
        .catch((e) => console.log(e));
    } else {
      const formData = {
        ...data,
        location: {
          type: "Point",
          coordinates: [courtLocation.lat, courtLocation.lng],
        },
      };
      submitForm(formData).then((res) => {
        if (res.data) {
          setAddCourtMarker(null);
          setTimeout(() => closeModal(), 2000);
        } else reset();
      });
    }
  };

  const onSetPhoto = (e) => {
    const photo = e.target.files[0];
    if (photo) {
      const reader = new FileReader();
      reader.readAsDataURL(photo);
      reader.onload = () => {
        setPhoto(photo);
        setPhotoUrl(reader.result);
      };
    }
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
      <FormWrapper style={{ padding: "0 5px 5px" }}>
        <Text fS="20px" fW={700} m="10px 10px 15px" centred>
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
            <ErrorText>{errors.sport?.message}</ErrorText>
          </Label>
          <LabelWrapper>
            <Label pl="10px">
              Назва
              <Input {...register("name")} m="5px 0 0" />
              <ErrorText>{errors.name?.message}</ErrorText>
            </Label>
          </LabelWrapper>
          <GridWrapper>
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
            <div style={{ marginLeft: "auto" }}>
              <Label>
                Освітлення
                <LightingRadioWrapper>
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
                </LightingRadioWrapper>
                <ErrorText>{errors.lighting?.message}</ErrorText>
              </Label>
              <AddPhotoBtn bgColors={lightTheme.btnSecondary} type="button">
                <label htmlFor="photos">Додати фото</label>
                <input
                  id="photos"
                  type="file"
                  name="photos"
                  hidden
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={onSetPhoto}
                />
              </AddPhotoBtn>
            </div>
          </GridWrapper>
          {photoUrl && (
            <PhotoWrapper>
              <ClosePhotoBtn type="button" onClick={onClosePhoto}>
                <CloseIcon size={20} />
              </ClosePhotoBtn>
              <Photo src={photoUrl} />
            </PhotoWrapper>
          )}
          {res.isError && (
            <Text fS="18px" color="#ac2b04" centred>
              Упс...Невідома помилка
            </Text>
          )}
          {res.isSuccess && (
            <Text fS="18px" color={lightTheme.green} centred>
              Успішно
            </Text>
          )}
          <Button
            type="submit"
            style={{ margin: "20px auto 0", width: "100px" }}
          >
            {res.isLoading ? (
              <BtnSpinnerWrapper>
                <BasketballMarker />
              </BtnSpinnerWrapper>
            ) : (
              "Додати"
            )}
          </Button>
        </form>
      </FormWrapper>
    </div>
  );
};

export default AddCourtForm;

const PhotoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  position: relative;
`;

const ClosePhotoBtn = styled(CloseBtn)`
  position: absolute;
  top: 3px;
  right: 3px;
  padding: 2px;
`;

const Photo = styled.img`
  width: 100%;
  max-height: 300px;
  border-radius: 7px;
  object-fit: contain;
`;

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 60% 40%;
  margin-top: 25px;
`;

const AddPhotoBtn = styled(Button)`
  margin-top: 20px;
  height: 38px;
  border-radius: 10px;
  padding: 10px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 0 5px;
`;

export const RadioWrap = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;

export const LightingRadioWrapper = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const LabelWrapper = styled.div`
  display: block;
  margin-top: 25px;
`;

export const basketballCovers = [
  { value: "rubber", label: "Резина" },
  { value: "asphalt", label: "Асфальт" },
  { value: "beton", label: "Бетон" },
  { value: "indoor", label: "Зал" },
];

export const footballCovers = [
  { value: "natural", label: "Натуральне" },
  { value: "synthetic", label: "Синтетичне" },
  { value: "indoor", label: "Зал" },
];

export const hoopsCountOptions = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
];
