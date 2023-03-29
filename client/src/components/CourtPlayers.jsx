import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  forwardRef,
  createRef,
  memo,
  useCallback,
} from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
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
} from "./microComponets";
import { EnterIcon, ShowHideIcon } from "./svgIcons";
import { ShowHideBtnWrapper } from "./FavouriteCourts";
import { lightTheme } from "../styles/themes";
import { BasketballMarker, FootballMarker } from "./markers";

const CourtPlayers = ({ changeModalType, court, courtId }) => {
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
  const isOnCourt = data.players?.some((player) => player._id === user._id);

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

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
          refetch();
        })
        .catch((e) => console.log(e));
    } else changeModalType("logReg");
  };

  const checkOutOnCourt = () => {
    if (user !== null) {
      const formData = new FormData();
      formData.append("_id", user._id);
      checkOut({ courtId, formData, token: user.token })
        .then((result) => {
          refetch();
        })
        .catch((e) => console.log(e));
    } else changeModalType("logReg");
  };

  return (
    <div>
      <TitlesWrapper>
        <Title>Були тут</Title>
        <Title>
          Зараз на {court.sport === "basketball" ? "майданчику" : "полі"}
        </Title>
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
                  changeModalType={changeModalType}
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
                  changeModalType={changeModalType}
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

      {!isOnCourt ? (
        <CheckInBtn
          onClick={checkInOnCourt}
          style={{ width: checkInWidth[court.sport] }}
          disabled={result.isLoading || isFetching}
        >
          {result.isLoading || isFetching ? (
            <BtnSpinnerWrapper>{markers[court.sport]}</BtnSpinnerWrapper>
          ) : (
            `Я на ${court.sport === "basketball" ? "майданчику" : "полі"}`
          )}
        </CheckInBtn>
      ) : (
        <CheckInBtn
          bgColors={lightTheme.btnSecondary}
          onClick={checkOutOnCourt}
          style={{ width: checkOutWidth[court.sport] }}
          disabled={res.isLoading || isFetching}
        >
          {res.isLoading || isFetching ? (
            <BtnSpinnerWrapper>{markers[court.sport]}</BtnSpinnerWrapper>
          ) : (
            `Пішов з ${court.sport === "basketball" ? "майданчика" : "поля"}`
          )}
        </CheckInBtn>
      )}
    </div>
  );
};

const Player = memo(
  forwardRef((props, ref) => {
    const { user, changeModalType } = props;
    const onChangeToUser = () => changeModalType("user");

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

const markers = {
  basketball: <BasketballMarker size={27} />,
  football: <FootballMarker size={27} />,
};

const checkInWidth = {
  basketball: "162px",
  football: "101px",
};

const checkOutWidth = {
  basketball: "190px",
  football: "132px",
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

const Title = styled.h6`
  font-family: "Play", sans-serif;
  font-weight: 600;
  font-size: 16px;
  margin: 0 0 5px 5px;
  color: ${(props) => props.theme.textSecondary};
  @media ${(props) => props.theme.media.smallMobile} {
    font-size: 14px;
  }
`;

const TitlesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 10px;
`;

const ColumnWrapper = styled.div`
  width: 50%;
  padding: 0 3px 0 7px;
`;

const CheckInBtn = styled(Button)`
  padding: 5px 15px;
  margin: 20px auto 0;
  height: 34px;
  transition: box-shadow 200ms, transform 200ms;
`;

export default CourtPlayers;
