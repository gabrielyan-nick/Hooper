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
import { Link, useNavigate, useLocation } from "react-router-dom";
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
import { ConfirmModal, SocialLinksLogos } from "./index";
import { EnterIcon, ShowHideIcon, AddIcon, DeleteIcon } from "./svgIcons";
import { BasketballMarker, FootballMarker } from "./markers";
import useMediaQuery from "../hooks/useMediaQuery";
import { useDelSocialLinkMutation } from "../api/userApi";
import { lightTheme } from "../styles/themes";
import { setLogin } from "../store/storageSlice";

const SocialLink = forwardRef(
  ({ name, link, linkId, userId, isLinkAdded = false }, ref) => {
    const myId = useSelector((s) => s.storage.user?._id);
    const isSmallScreen = useMediaQuery("(max-width: 380px)");
    const theme = useTheme();
    const [delLink, result] = useDelSocialLinkMutation();
    const [isDelModalOpen, setIsDelModalOpen] = useState(false);
    const token = useSelector((s) => s.storage.user?.token);
    const dispatch = useDispatch();
    const location = useLocation();
    const isMyLink = userId === myId && location.pathname.endsWith("my-info");

    const onDelLink = () => {
      delLink({ userId, linkId, token })
        .then((result) => {
          if (result.data) {
            dispatch(setLogin(result.data));
            onCloseDelModal();
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const onOpenDelModal = () => setIsDelModalOpen(true);
    const onCloseDelModal = () => setIsDelModalOpen(false);

    return (
      <div ref={ref}>
        <LineWrapper>
          <SocialLinksLogos name={name} />
          <Link to={link} target="_blank" style={{ textDecoration: "none" }}>
            <Text fS={`${isSmallScreen ? "17px" : "18px"}`}>{name}</Text>
          </Link>
          {isMyLink ? (
            <Btn
              color="orange"
              isVisible={!isLinkAdded}
              onClick={onOpenDelModal}
            >
              <DeleteIcon size={15} color={lightTheme.username} />
            </Btn>
          ) : (
            <Link
              to={link}
              target="_blank"
              style={{ textDecoration: "none", marginLeft: "auto" }}
            >
              <Btn color="green" isVisible={!isLinkAdded}>
                <EnterIcon />
              </Btn>
            </Link>
          )}
        </LineWrapper>

        <ConfirmModal
          opened={isDelModalOpen}
          closeModal={onCloseDelModal}
          action={onDelLink}
          actionResult={result}
          question="Видалити посилання?"
        />
      </div>
    );
  }
);

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
