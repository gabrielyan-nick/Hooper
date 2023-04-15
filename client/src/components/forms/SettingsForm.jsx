import React, { useState, forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { BasketballMarker } from "../markers";
import {
  setMapStyle,
  setTheme,
  setMapSatellite,
  setMapDark,
  setMapLight,
  setCourtsType,
} from "../../store/storageSlice";
import dark from "../../assets/dark.png";
import light from "../../assets/light.png";
import satelite from "../../assets/satelite.png";

const SettingsForm = ({ closeModal, goBack }) => {
  const dispatch = useDispatch();
  const theme = useSelector((s) => s.storage.theme);
  const mapStyle = useSelector((s) => s.storage.mapStyle);
  const courtsType = useSelector((s) => s.storage.courtsType);

  const onChangeTheme = () => {
    dispatch(setTheme());
  };
  return (
    <div>
      <ModalHeader empty>
        <CloseBtn onClick={closeModal}>
          <CloseIcon />
        </CloseBtn>
      </ModalHeader>
      <div style={{ padding: "5px 5px 40px 5px" }}>
        <FirstLine>
          <LabelWrapper pl="10px">
            Тема
            <CheckboxWrapper>
              <ThemeChanger
                type="checkbox"
                checked={theme === "dark"}
                onChange={onChangeTheme}
              />
              <Slider />
            </CheckboxWrapper>
          </LabelWrapper>
          <Label style={{ flexBasis: "70%", paddingRight: "10px" }}>
            Карта
            <RadioWrapper>
              <BtnWrapper>
                <label>
                  <RadioBtnMap
                    name="map"
                    type="radio"
                    checked={mapStyle === "mapbox://styles/mapbox/outdoors-v12"}
                    onChange={() => dispatch(setMapLight())}
                  />
                  <img src={light} alt="light" />
                </label>
              </BtnWrapper>
              <BtnWrapper>
                <label>
                  <RadioBtnMap
                    name="map"
                    type="radio"
                    checked={mapStyle === "mapbox://styles/mapbox/dark-v11"}
                    onChange={() => dispatch(setMapDark())}
                  />
                  <img src={dark} alt="dark" />
                </label>
              </BtnWrapper>
              <BtnWrapper>
                <label>
                  <RadioBtnMap
                    name="map"
                    type="radio"
                    checked={
                      mapStyle ===
                      "mapbox://styles/mapbox/satellite-streets-v12"
                    }
                    onChange={() => dispatch(setMapSatellite())}
                  />
                  <img src={satelite} alt="satelite" />
                </label>
              </BtnWrapper>
            </RadioWrapper>
          </Label>
        </FirstLine>
        <div>
          <Label pl="10px" m="20px 0 0 0" style={{ display: "block" }}>
            Майданчики
            <RadioWrapper style={{ justifyContent: "space-around" }}>
              <RadioCentredBox style={{ flexBasis: "26%" }}>
                <LabelHidden>
                  <RadioBtnCourts
                    name="court"
                    type="radio"
                    checked={courtsType === "all"}
                    onChange={() => dispatch(setCourtsType("all"))}
                  />
                  <RadioText fS="17px">Всі</RadioText>
                </LabelHidden>
              </RadioCentredBox>
              <RadioCentredBox>
                <LabelHidden>
                  <RadioBtnCourts
                    name="court"
                    type="radio"
                    checked={courtsType === "basketball"}
                    onChange={() => dispatch(setCourtsType("basketball"))}
                  />
                  <RadioText fS="17px">Баскетбол</RadioText>
                </LabelHidden>
              </RadioCentredBox>
              <RadioCentredBox>
                <LabelHidden>
                  <RadioBtnCourts
                    name="court"
                    type="radio"
                    checked={courtsType === "football"}
                    onChange={() => dispatch(setCourtsType("football"))}
                  />
                  <RadioText fS="17px">Футбол</RadioText>
                </LabelHidden>
              </RadioCentredBox>
            </RadioWrapper>
          </Label>
        </div>
      </div>
    </div>
  );
};

export default SettingsForm;

const BtnWrapper = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
`;

const LabelHidden = styled.label`
  display: contents;
`;

const RadioCentredBox = styled(FlexCenterBox)`
  flex-basis: 37%;
  align-items: normal;
`;

const RadioText = styled(Text)`
  font-family: "Golos Text", sans-serif;
  padding: 0 5px 2px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px;
`;

const RadioBtnMap = styled.input`
  position: absolute;
  width: 40px;
  height: 40px;
  opacity: 0;
  & + img {
    cursor: pointer;
    position: absolute;
    display: block;
    border-radius: 10px;
    width: 40px;
    height: 40px;
    border: 2px solid #cfcbcb;
  }
  &:checked + img {
    outline: 4px solid #039751;
  }
`;

const RadioBtnCourts = styled.input`
  position: absolute;

  opacity: 0;
  & + p {
    cursor: pointer;
    position: absolute;
    display: block;
    border-radius: 10px;
  }
  &:checked + p {
    outline: 4px solid #039751;
  }
`;

const RadioWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const FirstLine = styled.div`
  margin-top: 20px;
  display: flex;
`;

const ThemeChanger = styled.input`
  visibility: hidden;
  display: none;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #efe5e1;
  transition: 0.4s;
  border-radius: 30px;
  &:before {
    position: absolute;
    content: "";
    height: var(--size-of-icon);
    width: var(--size-of-icon);
    border-radius: 20px;
    left: var(--slider-offset);
    top: 50%;
    transform: translateY(-50%);
    background: linear-gradient(40deg, #ff0062, #ff6600 70%);
    transition: 0.4s;
  }
`;

const CheckboxWrapper = styled.div`
  --width-of-switch: 70px;
  --height-of-switch: 40px;
  --size-of-icon: 28px;
  --slider-offset: 5px;
  position: relative;
  width: var(--width-of-switch);
  height: var(--height-of-switch);
  display: block;
  margin-top: 15px;

  input:checked + span {
    background-color: #303136;
  }

  input:checked + span:before {
    left: calc(100% - (var(--size-of-icon) + var(--slider-offset)));
    background: #303136;
    box-shadow: #ff6400 -3px -2px 5px -2px inset,
      #71f4a6 -10px -4px 0px 0px inset;
  }
`;

const LabelWrapper = styled(Label)`
  display: block;
  flex-basis: 40%;
  width: 65px;
  &:hover span:before {
    transform: translateY(-50%) scale(1.1);
  }
`;
