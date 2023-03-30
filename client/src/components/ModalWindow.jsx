import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import useOnClickOutside from "../hooks/useOnClickOutside";
import useMount from "../hooks/useMount";
import { Button, IconButton, CloseBtn } from "./microComponets";
import { CloseIconFill, CloseIcon } from "./svgIcons";

const ModalWindow = ({
  opened,
  closeModal,
  children,
  closeClickOutside = true,
  isEmptyHeader = true,
}) => {
  const [animationIn, setAnimationIn] = useState(false);
  const contentRef = useRef(null);
  const overlayRef = useRef(null);
  const { mounted } = useMount({ opened });

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
    closeModal();
  };

  useOnClickOutside(contentRef, closeClickOutside ? onCloseModal : null);

  if (!mounted) {
    return null;
  }

  return (
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
          <ModalContent ref={contentRef}>
            {isEmptyHeader && (
              <ModalHeader>
                <CloseBtn onClick={onCloseModal}>
                  <CloseIcon />
                </CloseBtn>
              </ModalHeader>
            )}
            {children}
          </ModalContent>
        </CSSTransition>
      </ModalWrapper>
    </CSSTransition>
  );
};

export const ModalWrapper = styled.div`
  position: fixed;
  z-index: 101;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #09000cb9;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-height: 650px) {
    align-items: flex-start;
    padding: 40px 0;
  }
  @media ${(props) => props.theme.media.mobile} {
    align-items: flex-start;
    padding: 40px 0;
  }
`;

export const ModalContent = styled.div`
  background: ${(props) => props.bg || props.theme.popupBg};
  border-radius: 10px;
  min-height: 100px;
  padding: 5px 5px;
  /* overflow: visible; */
  overflow-x: hidden;
  max-width: 420px;

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
`;

export default ModalWindow;
