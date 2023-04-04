import React, { useState, useEffect, forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  Button,
  FlexBetweenBox,
  Text,
  UserWidgetBtn,
  TextLineWrapper,
  FlexCenterBox,
  IconBtnBg,
  CloseBtn,
} from "./microComponets";
import { darkTheme, lightTheme } from "../styles/themes";
import { AvatarChanged, UserCityChanged, FavouriteCourts } from "./index";
import { ChangeIcon, CloseIcon } from "./svgIcons";
import { ModalHeader } from "./ModalWindow";
import { setLogout } from "../store/storageSlice";
import { setUserIdForNav } from "../store/navigateSlice";

const MyInfo = forwardRef((props, ref) => {
  const {
    closeModal,
    setAddCourtMarker,
  } = props;
  const { picturePath, username, city, favouriteCourts } = useSelector(
    (state) => state.storage.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    setAddCourtMarker(null);
    dispatch(setLogout());
    navigate("/");
  };

  return (
    <div ref={ref}>
      <ModalHeader>
        <CloseBtn onClick={closeModal}>
          <CloseIcon />
        </CloseBtn>
      </ModalHeader>
      <Wrapper>
        <FirstLineWrapper>
          <TextWrapper>
            <TextLineWrapper>
              <Text fS="22px">{username || null}</Text>
            </TextLineWrapper>
            <UserCityChanged city={city} />
          </TextWrapper>
          <AvatarChanged photo={picturePath} />
        </FirstLineWrapper>
        <FavouriteCourts
          courts={favouriteCourts}
        />
        <Button
          onClick={onLogout}
          bgColors={lightTheme.btnSecondary}
          style={{ margin: "20px auto 0" }}
        >
          Вийти з акаунта
        </Button>
      </Wrapper>
    </div>
  );
});

export default MyInfo;

export const Wrapper = styled.div`
  padding: 30px 5px 5px;
`;

export const FirstLineWrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 58% 42%;
  width: 100%;
`;

export const TextWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 25px;
  justify-content: space-between;
`;
