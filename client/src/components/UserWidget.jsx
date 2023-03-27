import React, { useState, useEffect, useRef } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Button, FlexBetweenBox, Text, UserWidgetBtn } from "./microComponets";
import { darkTheme, lightTheme } from "../styles/themes";
import { ModalWindow, MyInfo, PhotoWindow, CourtPopup } from "./index";

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const Username = styled(Text)`
  color: ${lightTheme.username};
  padding-left: 5px;
`;

const UserWidget = () => {
  const [modalType, setModalType] = useState("userInfo");
  const [courtId, setCourtId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const { picturePath, username } = useSelector((state) => state.storage.user);
  const name = username.slice(0, 15);
  const myInfoRef = useRef(null);
  const courtRef = useRef(null);
  const nodeRef = modalType === "userInfo" ? myInfoRef : courtRef;

  const changeModalType = (type, id = null) => {
    setCourtId(id);
    setModalType(type);
  };

  const openUserWidgetModal = () => setIsModalOpen(true);
  const closeUserWidgetModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      modalType === "court" && setModalType("userInfo");
      setCourtId(null);
    }, 300);
  };

  const openPhotoModal = () => setIsPhotoModalOpen(true);
  const closePhotoModal = () => setIsPhotoModalOpen(false);

  return (
    <>
      <UserWidgetBtn
        style={{ fontFamily: "inherit" }}
        onClick={openUserWidgetModal}
      >
        <Username>{name || null}</Username>
        <Avatar src={picturePath || null} />
      </UserWidgetBtn>

      <ModalWindow
        opened={isModalOpen}
        closeModal={closeUserWidgetModal}
        closeClickOutside={false}
        isEmptyHeader={false}
      >
        <SwitchTransition mode="out-in">
          <CSSTransition
            nodeRef={nodeRef}
            key={modalType}
            classNames="switch"
            timeout={300}
          >
            {modalType === "userInfo" ? (
              <MyInfo
                openPhoto={openPhotoModal}
                closeModal={closeUserWidgetModal}
                changeModalType={changeModalType}
                ref={myInfoRef}
              />
            ) : (
              <CourtPopup
                courtId={courtId}
                closeModal={closeUserWidgetModal}
                ref={courtRef}
                changeModalType={changeModalType}
                backBtn
              />
            )}
          </CSSTransition>
        </SwitchTransition>
      </ModalWindow>
      <PhotoWindow
        image={picturePath}
        opened={isPhotoModalOpen}
        closeModal={closePhotoModal}
      />
    </>
  );
};

export default UserWidget;
