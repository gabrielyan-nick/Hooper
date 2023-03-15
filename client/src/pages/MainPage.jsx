import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { MainMap } from "../components";
import { setTheme } from "../store/themeSlice";

const MainPage = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const onChangeTheme = () => dispatch(setTheme());
  
  return (
    <MapWrapper>
      <ChangeThemeBtn onClick={onChangeTheme}/>
      <MainMap />
    </MapWrapper>
  );
};

export default MainPage;

const MapWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const ChangeThemeBtn = styled.button`
  position: absolute;
  top: 30px;
  left: 30px;
  width: 20px;
  height: 20px;
  z-index: 10;
  background-color: ${props => props.theme.color};
`;
