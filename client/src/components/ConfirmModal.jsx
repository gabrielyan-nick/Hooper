import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import useOnClickOutside from "../hooks/useOnClickOutside";
import useMount from "../hooks/useMount";
import {
  Button,
  IconButton,
  CloseBtn,
  ModalWrapper,
  ModalHeader,
  Text,
  FlexBetweenBox,
  BtnSpinnerWrapper,
} from "./microComponets";
import { CloseIconFill, CloseIcon } from "./svgIcons";
import { lightTheme } from "../styles/themes";
import { BasketballMarker, FootballMarker } from "./markers";

const ConfirmModal = ({
  opened,
  closeModal,
  action,
  actionResult = false,
  question,
  courtSport = "basketball",
}) => {
  const [animationIn, setAnimationIn] = useState(false);
  const contentRef = useRef(null);
  const overlayRef = useRef(null);
  const { mounted } = useMount({ opened });
  const spinner =
    courtSport === "basketball" ? <BasketballMarker /> : <FootballMarker />;

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
      closeModal();
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

  useEffect(() => {
    actionResult.isSuccess && closeModal();
  }, [actionResult]);

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
      <ModalWrapper
        style={{ alignItems: "center", padding: 0 }}
        ref={overlayRef}
      >
        <CSSTransition
          in={animationIn}
          nodeRef={contentRef}
          timeout={100}
          appear
          mountOnEnter
          unmountOnExit
          classNames="modal-content"
        >
          <ModalContent ref={contentRef}>
            <ModalHeader empty style={{ padding: 0 }}>
              <CloseBtn onClick={closeModal} disabled={actionResult.isLoading}>
                <CloseIcon />
              </CloseBtn>
            </ModalHeader>
            <Text fS="20px" fW={700} m="15px 10px 20px" centred>
              {question}
            </Text>
            <FlexBetweenBox>
              <Button onClick={action} width="70px" height="40px" m="5px">
                {actionResult.isLoading ? (
                  <BtnSpinnerWrapper>{spinner}</BtnSpinnerWrapper>
                ) : (
                  "Так"
                )}
              </Button>
              <Button
                width="70px"
                height="40px"
                bgColors={lightTheme.btnSecondary}
                onClick={closeModal}
                disabled={actionResult.isLoading}
                m="5px"
              >
                Ні
              </Button>
            </FlexBetweenBox>
          </ModalContent>
        </CSSTransition>
      </ModalWrapper>
    </CSSTransition>,
    document.body
  );
};

export default ConfirmModal;

export const ModalContent = styled.div`
  background: ${(props) => props.bg || props.theme.popupBg};
  border-radius: 10px;
  padding: 5px;
  max-width: 350px;
  min-width: 230px;
`;
