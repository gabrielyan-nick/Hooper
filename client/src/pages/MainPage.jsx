import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { MainMap, UserLoginWidget, LoadingScreen } from "../components";
import { setTheme, setLogout } from "../store/storageSlice";
import { Wrapper } from "../components/microComponets";

const MainPage = () => {
  const [isLoadingScreen, setIsLoadingScreen] = useState(true);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.storage.theme);

  const onChangeTheme = () => dispatch(setTheme());
  const onLogout = () => dispatch(setLogout());
  const closeLoadingScreen = () => setIsLoadingScreen(false);

  return (
    <Wrapper>
      {isLoadingScreen ? (
        <LoadingScreen />
      ) : (
        <>
          <ChangeThemeBtn onClick={onChangeTheme} />
          <LogoutBtn onClick={onLogout} />
          <UserLoginWidget />
        </>
      )}

      <MainMap closeLoadingScreen={closeLoadingScreen} />
    </Wrapper>
  );
};

export default MainPage;

const ChangeThemeBtn = styled.button`
  position: absolute;
  top: 30px;
  left: 30px;
  width: 20px;
  height: 20px;
  z-index: 10;
  background-color: ${(props) => props.theme.color};
`;

const LogoutBtn = styled(ChangeThemeBtn)`
  top: 70px;
`;
