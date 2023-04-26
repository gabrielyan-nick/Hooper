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
  Dash,
} from "./microComponets";
import { AddSocialLinkForm, SocialLink } from "./index";
import { TextLineWrap } from "./SocialLinksEdited";
import { ListWrapper } from "./FavouriteCourts";

const UserSocialLinks = ({ links }) => {
  return (
    <>
      <ListTitle style={{ marginTop: "15px" }}>Соц. мережі</ListTitle>
      <ListWrapper listLength={links?.length} style={{ minHeight: "43px" }}>
        {links?.length > 0 ? (
          links.map((link) => (
            <SocialLink
              key={link._id}
              name={link.name}
              link={link.link}
              linkId={link._id}
              userId={link.userId}
            />
          ))
        ) : (
          <Dash />
        )}
      </ListWrapper>
    </>
  );
};

export default UserSocialLinks;
