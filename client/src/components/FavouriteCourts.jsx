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
import styled, { css } from "styled-components";
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
import { EnterIcon, ShowHideIcon } from "./svgIcons";
import { BasketballMarker, FootballMarker } from "./markers";
import useMediaQuery from "../hooks/useMediaQuery";

const FavouriteCourts = ({ courts }) => {
  const displayedListLength = 3;
  const [showAll, setShowAll] = useState(false);
  const displayedCourts = showAll
    ? courts
    : courts?.slice(0, displayedListLength);
  const listRef = useRef(null);

  useEffect(() => {
    showAll
      ? (listRef.current.style.height = `${34 * courts?.length + 13}px`)
      : (listRef.current.style.height = `${
          34 * displayedCourts?.length + 10
        }px`);
    if (courts?.length === 0 || courts?.length === 1)
      listRef.current.style.height = "43px";
  }, [showAll, courts]);

  const showHideList = () => {
    setShowAll(!showAll);
  };

  const itemRef = useMemo(
    () =>
      courts?.reduce((acc, { _id }) => {
        acc[_id] = createRef();
        return acc;
      }, {}),
    [courts]
  );

  return (
    <>
      <ListTitle>Улюблені майданчики</ListTitle>
      <ListWrapper ref={listRef} listLength={courts?.length}>
        <TransitionGroup component={null}>
          {displayedCourts?.map((court) => (
            <CSSTransition
              timeout={0}
              key={court._id}
              classNames="court"
              nodeRef={itemRef[court._id]}
              mountOnEnter
              unmountOnExit
            >
              <FavCourt court={court} ref={itemRef[court._id]} />
            </CSSTransition>
          ))}
        </TransitionGroup>
        {!courts?.length && <Dash />}
        {courts?.length > displayedListLength && (
          <span style={{ height: "1px" }}>
            <ShowHideBtn
              color={`${showAll ? "orange" : "green"}`}
              onClick={showHideList}
            >
              <ShowHideBtnWrapper showAll={showAll}>
                <ShowHideIcon />
              </ShowHideBtnWrapper>
            </ShowHideBtn>
          </span>
        )}
      </ListWrapper>
    </>
  );
};

export default FavouriteCourts;

const FavCourt = memo(
  forwardRef((props, ref) => {
    const { court } = props;
    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery("(max-width: 380px)");

    const onChangeToCourt = () => {
      navigate(`/courts/${court._id}`);
    };

    return (
      <LineWrapper ref={ref}>
        {markers[court.sport]}
        <Text fS={`${isSmallScreen ? "17px" : "18px"}`}>
          <span>{court.name}</span>
        </Text>
        <GoToBtn color="green" onClick={onChangeToCourt}>
          <EnterIcon />
        </GoToBtn>
      </LineWrapper>
    );
  })
);

export const ListWrapper = styled(TextLineWrapper)`
  padding: 8px;
  position: relative;
  margin-bottom: 10px;
  overflow-x: visible;
  transition: height 0.2s;
  & div + div {
    margin-top: 7px;
  }
  ${(props) =>
    props.listLength === 0 &&
    css`
      display: flex;
      align-items: center;
    `}
`;

const ShowHideBtn = styled(IconBtnBg)`
  position: absolute;
  bottom: -17px;
  left: 46%;
  border-radius: 7px;
`;

export const ShowHideBtnWrapper = styled.div`
  height: 27px;
  transform: ${(props) => (props.showAll ? "rotate(180deg)" : "rotate(0deg")};
  transition: transform 0.3s;
`;

const LineWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  gap: 5px;
  height: 27px;
  align-items: center;
`;

const GoToBtn = styled(IconBtnBg)`
  position: absolute;
  top: 0;
  right: 0;
  padding: 2px;
  border-radius: 7px;
`;

const markers = {
  basketball: <BasketballMarker size={18} />,
  football: <FootballMarker size={18} />,
};
