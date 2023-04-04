import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  MainMap,
  UserLoginWidget,
  LoadingScreen,
  AddCourtWidget,
} from "../components";
import { setTheme, setLogout } from "../store/storageSlice";
import { Wrapper } from "../components/microComponets";

const MainPage = () => {
  const [isLoadingScreen, setIsLoadingScreen] = useState(true);
  const [addCourtMarker, setAddCourtMarker] = useState(null);
  const dispatch = useDispatch();

  const onChangeTheme = () => dispatch(setTheme());
  const closeLoadingScreen = () => setIsLoadingScreen(false);

  return (
    <Wrapper>
      {isLoadingScreen ? (
        <LoadingScreen />
      ) : (
        <>
          <ChangeThemeBtn onClick={onChangeTheme} />
          <UserLoginWidget setAddCourtMarker={setAddCourtMarker} />
          <AddCourtWidget
            addCourtMarker={addCourtMarker}
            setAddCourtMarker={setAddCourtMarker}
          />
        </>
      )}
      <MainMap
        closeLoadingScreen={closeLoadingScreen}
        setAddCourtMarker={setAddCourtMarker}
        addCourtMarker={addCourtMarker}
      />
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
