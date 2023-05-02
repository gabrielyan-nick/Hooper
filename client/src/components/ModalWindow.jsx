import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import io from "socket.io-client";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import useOnClickOutside from "../hooks/useOnClickOutside";
import useMount from "../hooks/useMount";
import {
  MyInfo,
  PhotoWindow,
  CourtPopup,
  UserInfo,
  LoginFormWrapper,
  RegisterForm,
  LoginAfterReg,
  ForgotPassForm,
  AddCourtForm,
  EditCourtForm,
  CourtChat,
  SettingsForm,
  ErrorBoundary,
  Tutorial,
  Tutorial2,
  Tutorial3,
  Tutorial4,
} from "./index";
import { ModalWrapper } from "./microComponets";
import { serverUrl } from "../config";

const socket = io.connect(serverUrl);

const ModalWindow = ({
  opened,
  closeModal,
  closeClickOutside = false,
  setAddCourtMarker,
  addCourtMarker = null,
  openedCourt,
  setOpenedCourt = null,
}) => {
  const [isModalOverflow, setIsModalOverflow] = useState(true);
  const [editedCourt, setEditedCourt] = useState({});
  const [history, setHistory] = useState([]);
  const [animationIn, setAnimationIn] = useState(false);
  const contentRef = useRef(null);
  const overlayRef = useRef(null);
  const { mounted } = useMount({ opened });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setHistory([...history, location.pathname]);
  }, [location]);

  const onGoBack = () => {
    history.pop();
    navigate(-1);
    history.pop();
  };

  useEffect(() => {
    setAnimationIn(opened);
  }, [opened]);

  useEffect(() => {
    if (opened) {
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [opened]);

  const handleKeyDown = (event) => {
    const modalElements = overlayRef.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstElement = modalElements[0];
    const lastElement = modalElements[modalElements.length - 1];

    if (event.key === "Escape") {
      onCloseModal();
    }

    if (event.key === "Tab") {
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }
    }
  };

  const onCloseModal = () => {
    navigate("/");
    history.splice(0);
    closeModal();
  };

  useOnClickOutside(contentRef, closeClickOutside ? onCloseModal : null);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <CSSTransition
      in={animationIn}
      nodeRef={overlayRef}
      timeout={100}
      appear
      mountOnEnter
      unmountOnExit
      classNames="modal-overlay"
    >
      <ModalWrapper ref={overlayRef}>
        <CSSTransition
          in={animationIn}
          nodeRef={contentRef}
          timeout={100}
          appear
          mountOnEnter
          unmountOnExit
          classNames="modal-content"
        >
          <ModalContent ref={contentRef} isModalOverflow={isModalOverflow}>
            <ErrorBoundary inModal closeModal={onCloseModal}>
              <SwitchTransition>
                <CSSTransition
                  timeout={200}
                  key={location.key}
                  classNames="switch"
                >
                  <Routes>
                    <Route
                      path="/courts/:courtId"
                      element={
                        <CourtPopup
                          closeModal={onCloseModal}
                          history={history}
                          goBack={onGoBack}
                          setEditedCourt={setEditedCourt}
                          setOpenedCourt={setOpenedCourt}
                          socket={socket}
                        />
                      }
                    />
                    <Route
                      path="/courts/:courtId/chat/:chatId"
                      element={
                        <CourtChat
                          closeModal={onCloseModal}
                          goBack={onGoBack}
                          openedCourt={openedCourt}
                          socket={socket}
                        />
                      }
                    />
                    <Route
                      path="/settings"
                      element={
                        <SettingsForm
                          closeModal={onCloseModal}
                          goBack={onGoBack}
                        />
                      }
                    />
                    <Route
                      path="/users/:userId"
                      element={
                        <UserInfo closeModal={onCloseModal} goBack={onGoBack} />
                      }
                    />
                    <Route
                      path="/my-info"
                      element={
                        <MyInfo
                          closeModal={onCloseModal}
                          goBack={onGoBack}
                          setAddCourtMarker={setAddCourtMarker}
                          setIsModalOverflow={setIsModalOverflow}
                        />
                      }
                    />
                    <Route
                      path="/login"
                      element={
                        <LoginFormWrapper
                          closeModal={onCloseModal}
                          goBack={onGoBack}
                          history={history}
                        />
                      }
                    />
                    <Route
                      path="/register"
                      element={
                        <RegisterForm
                          closeModal={onCloseModal}
                          goBack={onGoBack}
                          setIsModalOverflow={setIsModalOverflow}
                        />
                      }
                    />
                    <Route
                      path="/log-reg"
                      element={<LoginAfterReg closeModal={onCloseModal} />}
                    />
                    <Route
                      path="/forgot-pass"
                      element={
                        <ForgotPassForm
                          closeModal={onCloseModal}
                          goBack={onGoBack}
                        />
                      }
                    />
                    <Route
                      path="/add-court"
                      element={
                        <AddCourtForm
                          closeModal={onCloseModal}
                          setAddCourtMarker={setAddCourtMarker}
                          courtLocation={addCourtMarker}
                          setIsModalOverflow={setIsModalOverflow}
                        />
                      }
                    />
                    <Route
                      path="/courts/:courtId/edit"
                      element={
                        <EditCourtForm
                          closeModal={onCloseModal}
                          courtInfo={editedCourt}
                          goBack={onGoBack}
                          setIsModalOverflow={setIsModalOverflow}
                        />
                      }
                    />
                    <Route
                      path="/tutorial"
                      element={<Tutorial closeModal={onCloseModal} />}
                    />
                    <Route
                      path="/tutorial/2"
                      element={
                        <Tutorial2
                          closeModal={onCloseModal}
                          goBack={onGoBack}
                        />
                      }
                    />
                    <Route
                      path="/tutorial/3"
                      element={
                        <Tutorial3
                          closeModal={onCloseModal}
                          goBack={onGoBack}
                        />
                      }
                    />
                    <Route
                      path="/tutorial/4"
                      element={
                        <Tutorial4
                          closeModal={onCloseModal}
                          goBack={onGoBack}
                        />
                      }
                    />
                  </Routes>
                </CSSTransition>
              </SwitchTransition>
            </ErrorBoundary>
          </ModalContent>
        </CSSTransition>
      </ModalWrapper>
    </CSSTransition>,
    document.body
  );
};

export const ModalContent = styled.div`
  overflow: ${(props) => (props.isModalOverflow ? "hidden" : "visible")};
  background: ${(props) => props.bg || props.theme.popupBg};
  border-radius: 10px;
  min-height: 100px;
  max-width: 420px;
  height: max-content;
  box-shadow: ${(props) => props.theme.modalShadows};

  @media ${(props) => props.theme.media.wideScreen} {
    width: 27%;
  }
  @media ${(props) => props.theme.media.desktop} {
    width: 65%;
  }
  @media ${(props) => props.theme.media.tablet} {
    width: 80%;
  }
  @media ${(props) => props.theme.media.mobile} {
    width: 98%;
  }
  @media ${(props) => props.theme.media.smallMobile} {
    width: 98%;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 5px;
`;

export default ModalWindow;
