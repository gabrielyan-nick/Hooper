import React, { useRef, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import useOnClickOutside from "../hooks/useOnClickOutside";
import useMount from "../hooks/useMount";
import styled from "styled-components";
import { CloseBtn } from "./microComponets";
import { CloseIcon } from "./svgIcons";

const PhotoWindow = ({ image, alt = "image", opened, closeModal }) => {
  const [animationIn, setAnimationIn] = useState(false);
  const { mounted } = useMount({ opened });
  const imgRef = useRef(null);
  const contentRef = useRef(null);
  const overlayRef = useRef(null);

  const getModalSize = () => {
    const img = imgRef.current;
    const modal = contentRef.current;
    modal.style.width = `${img.width}px`;
    modal.style.height = `${img.height}px`;
  };

  useEffect(() => {
    setAnimationIn(opened);
  }, [opened]);

  useEffect(() => {
    if (opened) {
      getModalSize();
    }
  }, [image]);

  useEffect(() => {
    if (opened) {
      window.addEventListener("resize", getModalSize);
      return () => {
        window.removeEventListener("resize", getModalSize);
      };
    }
  }, []);

  useEffect(() => {
    if (opened) {
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [opened]);

  const onCloseModal = () => {
    closeModal();
  };

  const handleKeyDown = (event) => {
    const modalElements = overlayRef.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    if (event.key === "Escape") {
      onCloseModal();
    }
    if (event.key === "Tab") {
      event.preventDefault();
      modalElements[0].focus();
    }
  };

  useOnClickOutside(contentRef, onCloseModal);

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
      classNames="photo-modal-overlay"
    >
      <PhotoModal ref={overlayRef}>
        <PhotoModalContent ref={contentRef}>
          <Img src={image} alt={alt} ref={imgRef} />
          <CloseButton onClick={onCloseModal}>
            <CloseIcon />
          </CloseButton>
        </PhotoModalContent>
      </PhotoModal>
    </CSSTransition>
  );
};

export default PhotoWindow;

const PhotoModal = styled.div`
  position: fixed;
  z-index: 101;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #09000cb9;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
`;

const PhotoModalContent = styled.div`
  position: relative;
  background-color: transparent;
  max-width: 95vw;
  overflow: auto;
  & img {
    display: block;
    max-width: 100%;
  }
`;

const Img = styled.img`
  max-height: 92vh;
  border-radius: 7px;
`;

const CloseButton = styled(CloseBtn)`
  position: absolute;
  right: 3px;
  top: 3px;
`;
