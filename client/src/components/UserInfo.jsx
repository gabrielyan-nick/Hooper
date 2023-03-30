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
  BackBtn,
} from "./microComponets";
import { setModalTypeForNav, setUserIdForNav } from "../store/navigateSlice";
import { AvatarChanged, UserCityChanged, FavouriteCourts } from "./index";
import { CloseIcon, BackIcon } from "./svgIcons";
import { ModalHeader } from "./ModalWindow";
import { useGetUserInfoQuery } from "../api/userApi";
import { FirstLineWrapper, Wrapper, TextWrapper } from "./MyInfo";

const UserInfo = forwardRef((props, ref) => {
  const { id, closeModal, changeModalType } = props;
  const dispatch = useDispatch();
  const { courtId } = useSelector((state) => state.navigate);
  const { data = {}, isLoading } = useGetUserInfoQuery(id);

  const onBackToCourt = () => {
    changeModalType({ type: "court", courtid: courtId });
    dispatch(setUserIdForNav(id));
  };

  const closeUserInfo = () => {
    closeModal();
    changeModalType({ type: "court" });
    dispatch(setModalTypeForNav("court"));
    dispatch(setUserIdForNav(""));
  };

  return (
    <div ref={ref}>
      <FlexBetweenBox>
        <BackBtn onClick={onBackToCourt}>
          <BackIcon />
        </BackBtn>
        <CloseBtn onClick={closeUserInfo}>
          <CloseIcon />
        </CloseBtn>
      </FlexBetweenBox>
      <Wrapper>
        <FirstLineWrapper>
          <TextWrapper>
            <TextLineWrapper>
              <Text fS="22px">{data.username}</Text>
            </TextLineWrapper>
            <TextLineWrapper p="9px 33px 9px 15px">
              <Text fS="20px">
                <span style={{ paddingRight: "35px" }}>{data.city?.label}</span>
              </Text>
            </TextLineWrapper>
          </TextWrapper>
          <FlexCenterBox>
            <Avatar src={data.picturePath} style={{ marginLeft: "10px" }} />
          </FlexCenterBox>
        </FirstLineWrapper>
        <FavouriteCourts
          courts={data?.favouriteCourts}
          changeModalType={changeModalType}
          modalType={"userInfo"}
          id={id}
        />
      </Wrapper>
    </div>
  );
});

export default UserInfo;

const Avatar = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px;
`;
