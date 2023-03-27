import React, { useState, useEffect, forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
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

const Wrapper = styled.div`
  padding: 30px 5px 20px;
`;

const FirstLineWrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 58% 42%;
  width: 100%;
`;

const TextWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 25px;
  justify-content: space-between;
`;

const MyInfo = forwardRef((props, ref) => {
  const { picturePath, username, city, favouriteCourts } = useSelector(
    (state) => state.storage.user
  );
  const dispatch = useDispatch();

  const onLogout = () => dispatch(setLogout());

  return (
    <div ref={ref}>
      <ModalHeader>
        <CloseBtn onClick={props.closeModal}>
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
          <AvatarChanged photo={picturePath} openPhoto={props.openPhoto} />
        </FirstLineWrapper>
        <FavouriteCourts
          courts={favouriteCourts}
          changeModalType={props.changeModalType}
        />
        <Button
          onClick={onLogout}
          bgColors={lightTheme.btnSecondary}
          style={{ margin: "0 auto" }}
        >
          Вийти з акаунта
        </Button>
      </Wrapper>
    </div>
  );
});

export default MyInfo;
