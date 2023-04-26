import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  forwardRef,
  createRef,
  memo,
} from "react";
import PropTypes from "prop-types";
import {
  TransitionGroup,
  CSSTransition,
  SwitchTransition,
} from "react-transition-group";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Tooltip } from "react-tooltip";
import {
  useCheckInMutation,
  useGetCourtPlayersQuery,
  useCheckOutMutation,
} from "../api/courtsApi";
import {
  Button,
  TextLineWrapper,
  FlexBetweenBox,
  Text,
  IconBtnBg,
  BtnSpinnerWrapper,
  SectionTitle,
} from "./microComponets";
import { EnterIcon, ShowHideIcon, QuestionIcon } from "./svgIcons";
import { ShowHideBtnWrapper } from "./FavouriteCourts";
import { lightTheme } from "../styles/themes";
import { BasketballMarker, FootballMarker } from "./markers";
import { setOnCourt } from "../store/storageSlice";

const CourtPlayers = ({ court, courtId }) => {
  const { user } = useSelector((state) => state.storage);
  const [checkIn, result] = useCheckInMutation();
  const [checkOut, res] = useCheckOutMutation();
  const {
    data = {},
    isLoading,
    isFetching,
    refetch,
  } = useGetCourtPlayersQuery(courtId);
  const displayedListLength = 3;
  const [showAll, setShowAll] = useState(false);
  const displayedCheckInPlayers = showAll
    ? data.checkinPlayers
    : data.checkinPlayers?.slice(0, displayedListLength);
  const displayedPlayers = showAll
    ? data.players
    : data.players?.slice(0, displayedListLength);
  const listRef = useRef(null);
  const isOnCourt = data.players?.some((player) => player._id === user?._id);
  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);
  const nodeRef = isOnCourt ? checkInRef : checkOutRef;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    listRef.current.style.height = `${
      28 * displayedCheckInPlayers?.length +
      (data.checkinPlayers?.length > displayedListLength ? 8 : 3)
    }px`;
  }, [data]);

  useEffect(() => {
    showAll
      ? (listRef.current.style.height = `${
          28 * data.checkinPlayers?.length +
          (data.checkinPlayers?.length > displayedListLength ? 8 : 3)
        }px`)
      : (listRef.current.style.height = `${
          28 * displayedCheckInPlayers?.length +
          (data.checkinPlayers?.length > displayedListLength ? 8 : 3)
        }px`);
  }, [showAll]);

  const showHideList = () => {
    setShowAll(!showAll);
  };

  const createRefsFromArray = (arr) => {
    return arr?.reduce((acc, { createdAt }) => {
      acc[createdAt] = createRef();
      return acc;
    }, {});
  };

  const checkInPlayersRef = useMemo(
    () => createRefsFromArray(data.checkinPlayers),
    [data.checkinPlayers]
  );
  const playersRef = useMemo(
    () => createRefsFromArray(data.players),
    [data.players]
  );

  const checkInOnCourt = () => {
    if (user !== null) {
      const formData = new FormData();
      formData.append("_id", user._id);
      formData.append("username", user.username);
      checkIn({ courtId, formData, token: user.token })
        .then((result) => {
          dispatch(setOnCourt(result.data));
        })
        .catch((e) => console.log(e));
    } else navigate("/login");
  };

  const checkOutOnCourt = () => {
    if (user !== null) {
      const formData = new FormData();
      formData.append("_id", user._id);
      checkOut({ courtId, formData, token: user.token })
        .then((result) => {
          dispatch(setOnCourt(result.data));
        })
        .catch((e) => console.log(e));
    } else navigate("/login");
  };

  return (
    <Wrapper>
      <TitlesWrapper>
        <SectionTitle>Були тут</SectionTitle>
        <SectionTitle>
          Зараз на {court.sport === "basketball" ? "майданчику" : "полі"}
        </SectionTitle>
      </TitlesWrapper>
      <PlayersList listLenght={data.checkinPlayers?.length} ref={listRef}>
        <ColumnWrapper>
          <TransitionGroup component={null}>
            {displayedCheckInPlayers?.map((player) => (
              <CSSTransition
                timeout={0}
                key={player.createdAt}
                classNames="court"
                nodeRef={checkInPlayersRef[player.createdAt]}
                mountOnEnter
                unmountOnExit
              >
                <Player
                  key={player.createdAt}
                  user={player}
                  ref={checkInPlayersRef[player.createdAt]}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ColumnWrapper>
        <Divider />
        <ColumnWrapper>
          <TransitionGroup component={null}>
            {displayedPlayers?.map((player) => (
              <CSSTransition
                timeout={0}
                key={player.createdAt}
                classNames="court"
                nodeRef={playersRef[player.createdAt]}
                mountOnEnter
                unmountOnExit
              >
                <Player
                  key={player.createdAt}
                  user={player}
                  ref={playersRef[player.createdAt]}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ColumnWrapper>
      </PlayersList>
      {data.checkinPlayers?.length > displayedListLength && (
        <div style={{ height: "1px", position: "relative", width: "100%" }}>
          <ShowHideBtn
            color={`${showAll ? "orange" : "green"}`}
            onClick={showHideList}
          >
            <ShowHideBtnWrap showAll={showAll}>
              <ShowHideIcon size={25} />
            </ShowHideBtnWrap>
          </ShowHideBtn>
        </div>
      )}
      <SwitchTransition mode="out-in">
        <CSSTransition
          nodeRef={nodeRef}
          key={isOnCourt}
          classNames="checkinBtn"
          timeout={300}
          unmountOnExit
          mountOnEnter
        >
          {!isOnCourt ? (
            <div ref={nodeRef}>
              <CheckInBtn
                onClick={checkInOnCourt}
                style={{
                  width: checkInWidth[court.sport],
                }}
                disabled={result.isLoading || isFetching}
              >
                {result.isLoading ? (
                  <BtnSpinnerWrapper size="27px">
                    {markers[court.sport]}
                  </BtnSpinnerWrapper>
                ) : (
                  `Я на ${court.sport === "basketball" ? "майданчику" : "полі"}`
                )}
              </CheckInBtn>
            </div>
          ) : (
            <CheckOutWrapper ref={nodeRef}>
              <CheckInBtn
                bgColors={lightTheme.btnSecondary}
                onClick={checkOutOnCourt}
                style={{ width: "101px" }}
                disabled={res.isLoading || isFetching}
              >
                {res.isLoading ? (
                  <BtnSpinnerWrapper size="27px">
                    {markers[court.sport]}
                  </BtnSpinnerWrapper>
                ) : (
                  "Пішов"
                )}
              </CheckInBtn>
              <QuestionIconWrapper
                type="button"
                data-tooltip-id="help"
                data-tooltip-place="top"
              >
                <QuestionIcon size={20} />
                <Tooltip
                  id="help"
                  openOnClick
                  style={{
                    borderRadius: "7px",
                    maxWidth: "98vw",
                    padding: "5px 7px",
                    backgroundColor: "#1a1818dc",
                  }}
                >
                  <Text color="#fff">
                    Відмітка автоматично зникає через 3 години
                  </Text>
                </Tooltip>
              </QuestionIconWrapper>
            </CheckOutWrapper>
          )}
        </CSSTransition>
      </SwitchTransition>
    </Wrapper>
  );
};

const Player = memo(
  forwardRef((props, ref) => {
    const { user } = props;
    const navigate = useNavigate();

    const onChangeToUser = () => {
      navigate(`/users/${user._id}`);
    };
    return (
      <LineWrapper ref={ref}>
        <UserName>{user.username}</UserName>
        <GoToBtn color="green" onClick={onChangeToUser}>
          <EnterIcon />
        </GoToBtn>
      </LineWrapper>
    );
  })
);

const Wrapper = styled.div`
  padding: 0 5px;
  margin-top: 20px;
`;

const CheckOutWrapper = styled.div`
  position: relative;
  width: 102px;
  margin: 0 auto;
`;

const QuestionIconWrapper = styled.div`
  position: absolute;
  top: 7px;
  right: -35px;
`;

const CheckInBtn = styled(Button)`
  position: relative;
  padding: 5px 15px;
  margin: 20px auto 10px;
  height: 34px;
  transition: box-shadow 200ms, transform 200ms;
`;

const markers = {
  basketball: <BasketballMarker size={27} />,
  football: <FootballMarker size={27} />,
};

const checkInWidth = {
  basketball: "162px",
  football: "101px",
};

const ShowHideBtnWrap = styled(ShowHideBtnWrapper)`
  height: 25px;
`;

const ShowHideBtn = styled(IconBtnBg)`
  position: absolute;
  bottom: -16px;
  left: 15%;
  border-radius: 7px;
`;

const LineWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  gap: 5px;
  height: 25px;
  align-items: center;
  & + div {
    margin-top: 3px;
  }
`;

const UserName = styled(Text)`
  width: 83%;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

const GoToBtn = styled(IconBtnBg)`
  position: absolute;
  top: 0;
  right: 0;
  padding: 1px;
  border-radius: 7px;
`;

const PlayersList = styled(TextLineWrapper)`
  position: relative;
  min-height: 30px;
  display: flex;
  padding: ${(props) => (props.listLenght > 3 ? "3px 0 10px 0" : "3px 0")};
  transition: height 0.2s;
`;

const Divider = styled.div`
  width: 3px;
  border-radius: 80px;
  background-color: ${(props) => props.theme.textSecondary};
`;

const TitlesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const ColumnWrapper = styled.div`
  width: 50%;
  padding: 0 3px 0 7px;
`;

export default CourtPlayers;

CourtPlayers.propTypes = {
  court: PropTypes.object.isRequired,
  courtId: PropTypes.string.isRequired,
};

// Player.propTypes = {
//   user: PropTypes.object.isRequired,
// };
