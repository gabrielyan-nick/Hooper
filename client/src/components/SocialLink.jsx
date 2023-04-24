import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useMemo,
  memo,
  createRef,
} from "react";
import {
  TransitionGroup,
  CSSTransition,
  SwitchTransition,
} from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled, { useTheme } from "styled-components";
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
import { SocialLinksLogos } from "./index";
import { EnterIcon, ShowHideIcon, AddIcon, DeleteIcon } from "./svgIcons";
import { BasketballMarker, FootballMarker } from "./markers";
import useMediaQuery from "../hooks/useMediaQuery";

const SocialLink = ({ name, link, id, userId, isLinkAdded = false }) => {
  const myId = useSelector((s) => s.storage.user?._id);
  const isSmallScreen = useMediaQuery("(max-width: 380px)");
  const isMyLink = userId === myId;
  const theme = useTheme();

  return (
    <LineWrapper>
      <SocialLinksLogos name={name} />
      <Link to={link} target="_blank" style={{ textDecoration: "none" }}>
        <Text fS={`${isSmallScreen ? "17px" : "18px"}`}>{name}</Text>
      </Link>
      {isMyLink ? (
        <Btn color="orange" isVisible={!isLinkAdded}>
          <DeleteIcon size={16} color={theme.username} />
        </Btn>
      ) : (
        <Link to={link} target="_blank" style={{ textDecoration: "none" }}>
          <Btn color="green" isVisible={!isLinkAdded}>
            <EnterIcon />
          </Btn>
        </Link>
      )}
    </LineWrapper>
  );
};

export default SocialLink;

const LineWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  gap: 5px;
  height: 27px;
  align-items: center;
`;

const Btn = styled(IconBtnBg)`
  border-radius: 7px;
  padding: 2px;
  width: 27px;
  height: 27px;
  margin-left: auto;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 0.3s;
`;
