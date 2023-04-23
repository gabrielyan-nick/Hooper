import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useMemo,
  memo,
  createRef,
} from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  Button,
  FlexBetweenBox,
  Text,
  UserWidgetBtn,
  TextLineWrapper,
  FlexCenterBox,
  IconBtnBg,
  ListTitle,
} from "./microComponets";
import { EnterIcon, ShowHideIcon, AddIcon } from "./svgIcons";
import { BasketballMarker, FootballMarker } from "./markers";

const SocialLinksEdited = () => {
  return (
    <>
      <ListTitle style={{ marginTop: "15px" }}>Соц. мережі</ListTitle>
      <TextLineWrapper p="8px">
        <IconBtnBg p="2px" color="green" style={{ borderRadius: "7px" }}>
          <AddIcon />
        </IconBtnBg>
      </TextLineWrapper>
    </>
  );
};

export default SocialLinksEdited;


