import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Button, UserWidgetBtn } from "./microComponets";
import { ModalWindow, UserWidget } from "./index";

const UserLoginWidget = ({ setAddCourtMarker, setOpenedCourt }) => {
  const isAuth = useSelector((state) => !!state.storage.user?.token);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    location.pathname === "/" && setIsLoginModalOpen(false);
  }, [location]);

  const onCloseLoginModal = () => setIsLoginModalOpen(false);

  const onOpenLoginModal = () => {
    setIsLoginModalOpen(true);
    navigate("/login");
  };

  return (
    <>
      <Wrapper>
        {isAuth ? (
          <UserWidget
            setAddCourtMarker={setAddCourtMarker}
            setOpenedCourt={setOpenedCourt}
          />
        ) : (
          <UserWidgetBtn p="12px 30px" onClick={onOpenLoginModal}>
            Увійти
          </UserWidgetBtn>
        )}
      </Wrapper>
      <ModalWindow opened={isLoginModalOpen} closeModal={onCloseLoginModal} />
    </>
  );
};

export default UserLoginWidget;

const Wrapper = styled.div`
  position: absolute;
  top: 13px;
  right: 13px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  z-index: 10;
`;
