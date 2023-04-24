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
} from "./microComponets";
import { AddSocialLinkForm, SocialLink } from "./index";
import { EnterIcon, ShowHideIcon, AddIcon } from "./svgIcons";
import { BasketballMarker, FootballMarker } from "./markers";

const SocialLinksEdited = () => {
  const links = useSelector((s) => s.storage.user?.socialLinks);
  const [isLinkAdded, setIsLinkAdded] = useState(false);
  const addBtnRef = useRef(null);
  const inputRef = useRef(null);
  const nodeRef = isLinkAdded ? inputRef : addBtnRef;

  const onAddLink = () => setIsLinkAdded(true);
  const onCancelAddLink = () => setIsLinkAdded(false);

  return (
    <>
      <ListTitle style={{ marginTop: "15px" }}>Соц. мережі</ListTitle>
      <TextLineWrap p="8px">
        {links.length > 0 &&
          links.map((link) => (
            <SocialLink
              key={link._id}
              name={link.name}
              link={link.link}
              id={link._id}
              userId={link.userId}
              isLinkAdded={isLinkAdded}
            />
          ))}
        <SwitchTransition mode="out-in">
          <CSSTransition
            timeout={100}
            key={isLinkAdded}
            classNames="select-switch"
            nodeRef={nodeRef}
          >
            {!isLinkAdded ? (
              <IconBtnBg
                ref={addBtnRef}
                p="2px"
                color="green"
                style={{
                  borderRadius: "7px",
                  marginTop: !!links.length ? "5px" : 0,
                }}
                onClick={onAddLink}
              >
                <AddIcon />
              </IconBtnBg>
            ) : (
              <div style={{ marginTop: !!links.length ? "5px" : 0 }}>
                <AddSocialLinkForm
                  ref={inputRef}
                  onCancelAddLink={onCancelAddLink}
                  isLinkAdded={isLinkAdded}
                />
              </div>
            )}
          </CSSTransition>
        </SwitchTransition>
      </TextLineWrap>
    </>
  );
};

export default SocialLinksEdited;

const TextLineWrap = styled(TextLineWrapper)`
  overflow: visible;
  & div + div {
    margin-top: 7px;
  }
`;
