import React, { useState, useEffect, useRef } from "react";
import { useMap } from "react-map-gl";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import { setLogin } from "../store/storageSlice";
import Select from "react-select";
import styled, { useTheme } from "styled-components";
import {
  Button,
  FlexBetweenBox,
  Text,
  UserWidgetBtn,
  TextLineWrapper,
  FlexCenterBox,
  IconBtnBg,
  IconSpinnerWrapper,
} from "./microComponets";
import { BasketballMarker } from "./index";
import { useUpdateUserInfoMutation } from "../api/userApi";
import { ChangeIcon, CloseIcon, SaveIcon } from "./svgIcons";
import { cities } from "../data";

const UserCityChanged = ({ city, setIsModalOverflow }) => {
  const [selectValue, setSelectValue] = useState(null);
  const token = useSelector((state) => state.storage?.user?.token);
  const _id = useSelector((state) => state.storage?.user?._id);
  const coordinates = useSelector(
    (state) => state.storage?.user?.city?.coordinates
  );
  const [isChanged, setIsChanged] = useState(false);
  const theme = useTheme();
  const changeRef = useRef(null);
  const saveCloseRef = useRef(null);
  const nodeRef = isChanged ? saveCloseRef : changeRef;
  const [updateCity, result] = useUpdateUserInfoMutation();
  const dispatch = useDispatch();
  const { map } = useMap();

  const selectStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderRadius: "7px",
      backgroundColor: theme.inputBg,
      outline: state.isFocused ? theme.inputBorder : "none",
      fontFamily: "Golos Text, sans-serif",
      fontWeight: 600,
      fontSize: "20px",
      height: "42px",
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
      color: state.isFocused ? "#f3efec" : "#110f0f",
    }),
    menuList: (baseStyles, state) => ({
      ...baseStyles,
      maxHeight: "170px",
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
      fontSize: "16px",
    }),
    singleValue: (baseStyles, state) => ({
      ...baseStyles,
      color: "#110f0f",
    }),
  };

  const handleSelectValue = (value) => {
    setSelectValue(value);
  };

  const onSaveChangedCity = () => {
    if (city.value !== selectValue.value) {
      const formData = new FormData();
      formData.append("city", JSON.stringify(selectValue));
      updateCity({ _id, token, formData })
        .then((result) => {
          if (result.data) {
            dispatch(setLogin(result.data));
            map.flyTo({
              center: [
                result.data.city.coordinates[1],
                result.data.city.coordinates[0],
              ],
              zoom: 11,
            });
          }
          setIsChanged(false);
        })
        .catch((e) => console.log(e));
    } else setIsChanged(false);
  };

  const cancelChange = () => setIsChanged(false);
  const changeCity = () => setIsChanged(true);

  return (
    <Wrapper>
      <SwitchTransition mode="out-in">
        <CSSTransition
          timeout={100}
          key={isChanged}
          classNames="select-switch"
          nodeRef={nodeRef}
        >
          {isChanged ? (
            <div ref={saveCloseRef}>
              <Select
                options={cities}
                styles={selectStyles}
                placeholder="Виберіть місто"
                onChange={handleSelectValue}
                onMenuOpen={() => setIsModalOverflow(false)}
                onMenuClose={() => setIsModalOverflow(true)}
              />
              <CancelBtn
                color="orange"
                onClick={cancelChange}
                disabled={result.isLoading}
              >
                <CloseIcon />
              </CancelBtn>
              <SaveBtn color="green" onClick={onSaveChangedCity}>
                {result.isLoading ? (
                  <IconSpinnerWrapper>
                    <BasketballMarker size={23} />
                  </IconSpinnerWrapper>
                ) : (
                  <SaveIcon />
                )}
              </SaveBtn>
            </div>
          ) : (
            <>
              <TextLineWrapper p="9px 33px 9px 15px" ref={changeRef}>
                <Text fS="20px" style={{ whiteSpace: "nowrap" }}>
                  <span style={{ paddingRight: "35px" }}>
                    {city?.label || null}
                  </span>
                </Text>
              </TextLineWrapper>
              <ChangeBtn color="green" onClick={changeCity} ref={changeRef}>
                <ChangeIcon />
              </ChangeBtn>
            </>
          )}
        </CSSTransition>
      </SwitchTransition>
    </Wrapper>
  );
};

export default UserCityChanged;

const Wrapper = styled.div`
  position: relative;
`;

const ChangeBtn = styled(IconBtnBg)`
  position: absolute;
  border-radius: 7px;
  right: 5px;
  top: 7px;
  padding: 2px;
`;

const CancelBtn = styled(IconBtnBg)`
  position: absolute;
  top: -17px;
  right: -17px;
  padding: 2px;
  border-radius: 7px;
`;

const SaveBtn = styled(IconBtnBg)`
  position: absolute;
  bottom: -17px;
  right: -17px;
  padding: 2px;
  border-radius: 7px;
`;
