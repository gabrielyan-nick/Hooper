import React, { useState, useEffect, forwardRef, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
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
  ModalHeader,
  LoadingScreenWrapper,
} from "./microComponets";
import {
  AvatarChanged,
  UserCityChanged,
  FavouriteCourts,
  PhotoWindow,
  LoadingScreen,
  BallSpinner,
} from "./index";
import { CloseIcon, BackIcon } from "./svgIcons";
import { useGetUserInfoQuery } from "../api/userApi";
import { FirstLineWrapper, Wrapper, TextWrapper } from "./MyInfo";

const UserInfo = forwardRef((props, ref) => {
  const { closeModal, goBack } = props;
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const { userId } = useParams();
  const { data = {}, isLoading } = useGetUserInfoQuery(userId);
  const navigate = useNavigate();
  const loadingRef = useRef(null);

  const openPhotoModal = () => setIsPhotoModalOpen(true);
  const closePhotoModal = () => setIsPhotoModalOpen(false);

  return (
    <>
      <div ref={ref}>
        <CSSTransition
          nodeRef={loadingRef}
          in={isLoading}
          timeout={1700}
          classNames="loading-hide"
          unmountOnExit
        >
          <LoadingScreenWrapper ref={loadingRef}>
            <BallSpinner />
          </LoadingScreenWrapper>
        </CSSTransition>
        <ModalHeader>
          <BackBtn onClick={goBack}>
            <BackIcon />
          </BackBtn>
          <CloseBtn onClick={closeModal}>
            <CloseIcon />
          </CloseBtn>
        </ModalHeader>
        <Wrapper>
          <FirstLineWrapper>
            <TextWrapper>
              <TextLineWrapper>
                <Text fS="22px">{data.username}</Text>
              </TextLineWrapper>
              <TextLineWrapper p="9px 33px 9px 15px">
                <Text fS="20px">
                  <span style={{ paddingRight: "35px" }}>
                    {data.city?.label}
                  </span>
                </Text>
              </TextLineWrapper>
            </TextWrapper>
            <FlexCenterBox>
              <Avatar
                src={data.picturePath}
                style={{ marginLeft: "10px" }}
                onClick={openPhotoModal}
              />
            </FlexCenterBox>
          </FirstLineWrapper>
          <FavouriteCourts courts={data?.favouriteCourts} />
        </Wrapper>
      </div>

      <PhotoWindow
        image={data.picturePath}
        opened={isPhotoModalOpen}
        closeModal={closePhotoModal}
      />
    </>
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
