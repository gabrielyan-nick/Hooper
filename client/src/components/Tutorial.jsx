import React, { useState, useEffect, useRef } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import {
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TelegramShareButton,
  TwitterShareButton,
  ViberShareButton,
  WhatsappShareButton,
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
  TelegramIcon,
  TwitterIcon,
  ViberIcon,
  WhatsappIcon,
} from "react-share";
import {
  Button,
  UserWidgetBtn,
  IconBtnBg,
  FlexCenterBox,
  CloseBtn,
  Text,
  ModalHeader,
  LogoText,
  Title,
  FlexBetweenBox,
  SectionTitle,
  BackBtn,
  Wrapper,
} from "./microComponets";
import {
  ModalWindow,
  LoginRegisterScreen,
  UserWidget,
  AddCourtForm,
  BasketballMarker,
  FootballMarker,
} from "./index";
import {
  AddCourtIcon,
  CloseIcon,
  TutorialIcon,
  HooperLogoIcon,
  FootballGoalIcon,
  CourtIcon,
  LightingIcon,
  OkIcon,
  EnterIcon,
  ShowHideIcon,
  LinksIcon,
} from "./svgIcons";
import { lightTheme } from "../styles/themes";
import { CourtInfoWrapper } from "./CourtInfo";
import {
  ColumnWrapper,
  TitlesWrapper,
  Divider,
  LineWrapper,
  PlayersList,
} from "./CourtPlayers";
import { BackIcon } from "./svgIcons";
import avatar from "../assets/avatar.png";
import ukrflag from "../assets/ukrflag.svg";
import ny from "../assets/ny.jfif";
import milan from "../assets/milan.jpg";
import moon from "../assets/moon.webp";
import { AddCourtBtn } from "./AddCourtWidget";

const shareUrl = "https://hooper-13.web.app/";
const shareTitle =
  "Привіт! Я Hooper, сайт який допоможе тобі знайти місце для гри в улюблений вид спорту.";

const TutorialWrapper = ({
  closeModal,
  goBack,
  isBackBtn = true,
  isEmptyHeader = false,
  children,
}) => {
  return (
    <>
      <ModalHeader empty={isEmptyHeader}>
        {isBackBtn && (
          <BackBtn onClick={goBack}>
            <BackIcon />
          </BackBtn>
        )}
        <CloseBtn onClick={closeModal}>
          <CloseIcon />
        </CloseBtn>
      </ModalHeader>
      <Inner>{children}</Inner>
    </>
  );
};

export const Tutorial = ({ closeModal }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const onGoForward = () => {
    navigate("/tutorial/2");
  };

  return (
    <div>
      <TutorialWrapper
        closeModal={closeModal}
        isEmptyHeader={true}
        isBackBtn={false}
      >
        <FlexCenterBox>
          <Title fS="23px" fW="600">
            Привіт! Я
          </Title>
          <LogoText m="0 0 0 5px">Hooper</LogoText>
        </FlexCenterBox>
        <Text m="20px 0 10px" fS="17px">
          &nbsp;Сайт який допоможе тобі знайти місце для гри в улюблений вид
          спорту.
        </Text>
        <Text m="0 0 10px " fS="17px">
          &nbsp;На карті ти бачиш спортивні майданчики, відмічені відповідно до
          виду спорту.
        </Text>
        <FlexBetweenBox style={{ width: "40%", margin: "0 auto" }}>
          <BasketballMarker size={25} />
          <Text fS="17px">або</Text>
          <FootballMarker size={25} />
        </FlexBetweenBox>
        <Text fS="17px" m="20px 0 0">
          &nbsp;Якщо побачиш такий
          <BasketballMarker size={25} playersCount={1} margin="0 10px" />
          це означає, що там зараз хтось грає.
        </Text>
      </TutorialWrapper>
      <Button m="0 auto 10px auto" onClick={onGoForward}>
        Далі
      </Button>
    </div>
  );
};

export const Tutorial2 = ({ closeModal, goBack }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const onGoForward = () => {
    navigate("/tutorial/3");
  };

  return (
    <div>
      <TutorialWrapper closeModal={closeModal} goBack={goBack}>
        <Text fS="17px" m="0 0 10px">
          &nbsp;Натисни на м'яч і побачиш інформацію про майданчик.
        </Text>
        <CourtInfoWrapper style={{ userSelect: "none" }}>
          <FlexCenterBox style={{ gap: "5px" }}>
            <CourtIcon color="#016837" />
            <Text fS="14px" fW={700}>
              Синтетичне
            </Text>
          </FlexCenterBox>
          <FlexCenterBox style={{ gap: "5px" }}>
            <FootballGoalIcon
              main={theme.goal.main}
              secondary={theme.goal.secondary}
              net={theme.goal.net}
            />
            <Text fS="18px" fW={700}>
              2
            </Text>
          </FlexCenterBox>
          <FlexCenterBox>
            <LightingIcon main={theme.lighting.main} />
            <OkIcon />
          </FlexCenterBox>
        </CourtInfoWrapper>
        <Text fS="17px" m="20px 0 10px">
          &nbsp;Список гравців.
        </Text>
        <div style={{ userSelect: "none", pointerEvents: "none" }}>
          <TitlesWrapper>
            <SectionTitle fS="14px">Були тут</SectionTitle>
            <SectionTitle fS="14px">Зараз на полі</SectionTitle>
          </TitlesWrapper>
          <PlayersList style={{ padding: "1px 0 5px", overflow: "visible" }}>
            <ColumnWrapper style={{ padding: "0 2px 0 6px" }}>
              <Player name={"Hooper"} />
              <Player name={"spacejam"} />
              <Player name={"Слава Україні"} />
              <Player name={"Героям Слава"} />
              <Player name={"AC Milan"} />
              <Player name={"Василь"} />
              <Player name={"baller"} />
            </ColumnWrapper>
            <Divider />
            <ColumnWrapper style={{ padding: "0 2px 0 6px" }}>
              <Player name={"Hooper"} />
              <Player name={"spacejam"} />
              <Player name={"Слава Україні"} />
              <Player name={"Героям Слава"} />
            </ColumnWrapper>
            <HideBtn color="orange">
              <ShowHideIcon size={22} isHide />
            </HideBtn>
          </PlayersList>
        </div>
      </TutorialWrapper>
      <Button m="0 auto 10px auto" onClick={onGoForward}>
        Далі
      </Button>
    </div>
  );
};

export const Tutorial3 = ({ closeModal, goBack }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const onGoForward = () => {
    navigate("/tutorial/4");
  };

  return (
    <div>
      <TutorialWrapper closeModal={closeModal} goBack={goBack}>
        <Text fS="17px" m="0 0 10px">
          &nbsp;Чат майданчика, де ти можеш домовитися про гру.
        </Text>
        <div
          style={{
            padding: "4px",
            background: theme.popupBg,
            borderRadius: "10px",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          <FlexBetweenBox>
            <BackBtn>
              <BackIcon size={25} />
            </BackBtn>
            <Title fS="15px">Баскетбольний майданчик</Title>
            <CloseBtn p="2px">
              <CloseIcon size={21} />
            </CloseBtn>
          </FlexBetweenBox>
          <div
            style={{
              marginTop: "4px",
              background: theme.textWrapperBg,
              padding: "53px 6px 4px 4px",
              borderRadius: "7px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <Message
              img={ukrflag}
              message={"Всім привіт. Часто тут збираєтесь?"}
              date={"16:20 25.04.2023"}
            />
            <Message
              message={"На выходных тут всегда есть люди, есть с кем поиграть."}
              date={"17:36 25.04.2023"}
            />
            <Message
              img={ukrflag}
              message={"Круто! Буду приходити."}
              date={"17:40 25.04.2023"}
            />
            <Message
              img={ny}
              message={"Я в воскресенье к 16.00 подойду"}
              date={"18:10 25.04.2023"}
            />
            <Message
              img={milan}
              message={"Я також буду"}
              date={"18:15 25.04.2023"}
            />
            <Message
              img={moon}
              message={"Ми з Василем у неділю прийдемо."}
              date={"19:07 25.04.2023"}
            />
          </div>
          <div style={{ display: "flex", marginTop: "4px" }}>
            <div
              style={{
                background: theme.inputBg,
                height: "28px",
                width: "90.5%",
                borderRadius: "7px",
              }}
            ></div>
            <div
              style={{
                background: lightTheme.green,
                height: "28px",
                width: "28px",
                borderRadius: "7px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "4px",
              }}
            >
              <EnterIcon size={23} />
            </div>
          </div>
        </div>
      </TutorialWrapper>
      <Button m="0 auto 10px auto" onClick={onGoForward}>
        Далі
      </Button>
    </div>
  );
};

export const Tutorial4 = ({ closeModal, goBack }) => {
  const [isShare, setIsShare] = useState(false);
  const btnRef = useRef(null);
  const linksRef = useRef(null);
  const nodeRef = isShare ? linksRef : btnRef;

  return (
    <div>
      <TutorialWrapper closeModal={closeModal} goBack={goBack}>
        <Text fS="17px" m="0 0 5px">
          І не забудь натиснути на
        </Text>
        <FlexCenterBox direction="column">
          <Button
            p="5px 10px"
            height="auto"
            fS="14px"
            style={{ userSelect: "none", pointerEvents: "none" }}
          >
            Я на полі
          </Button>
        </FlexCenterBox>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Text fS="17px" m="3px 0 5px">
            коли прийдеш грати.
          </Text>
        </div>

        <Text fS="17px">
          &nbsp;Тоді люди побачать активний майданчик і теж приєднаються до гри.
        </Text>
        <Text fS="17px" m="10px 0 5px">
          &nbsp;Якщо ти знаєш майданчики, поля або зали де збираються люди,
          додавай їх на карту натиснувши
        </Text>
        <FlexCenterBox>
          <AddCourtBtn
            p="4px 12px 4px 7px"
            style={{ userSelect: "none", pointerEvents: "none" }}
            color="orange"
          >
            <AddCourtIcon width={35} height={30} />
          </AddCourtBtn>
        </FlexCenterBox>
        <Text fS="17px" m="20px 0 0">
          &nbsp;Розповідай друзям і завжди будь у грі.
        </Text>
      </TutorialWrapper>
      <SwitchTransition mode="out-in">
        <CSSTransition
          nodeRef={nodeRef}
          key={isShare}
          classNames="checkinBtn"
          timeout={300}
          unmountOnExit
          mountOnEnter
        >
          {!isShare ? (
            <div ref={btnRef}>
              <Button
                height="auto"
                m="-10px auto 10px auto"
                bgColors="linear-gradient(92.83deg,
    #00914C
     0,
     #D04516 100%)"
                onClick={() => setIsShare(true)}
              >
                Поділитися
                <LinksIcon />
              </Button>
            </div>
          ) : (
            <FlexCenterBox
              style={{ gap: "10px", margin: "-10px 0 10px" }}
              ref={linksRef}
            >
              <FacebookShareButton url={shareUrl} quote={shareTitle}>
                <FacebookIcon size={36} round={true} />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl} title={shareTitle}>
                <TwitterIcon size={36} round={true} />
              </TwitterShareButton>
              <WhatsappShareButton url={shareUrl} title={shareTitle}>
                <WhatsappIcon size={36} round={true} />
              </WhatsappShareButton>
              <TelegramShareButton url={shareUrl} title={shareTitle}>
                <TelegramIcon size={36} round={true} />
              </TelegramShareButton>
              <ViberShareButton url={shareUrl} title={shareTitle}>
                <ViberIcon size={36} round={true} />
              </ViberShareButton>
              <LinkedinShareButton url={shareUrl} title={shareTitle}>
                <LinkedinIcon size={36} round={true} />
              </LinkedinShareButton>
            </FlexCenterBox>
          )}
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

const Player = ({ name }) => {
  return (
    <LineWrapper mt="0px" style={{ justifyContent: "space-between" }}>
      <Text fS="14px">{name}</Text>
      <IconBtnBg color="green" style={{ borderRadius: "7px", padding: "1px" }}>
        <EnterIcon size={20} />
      </IconBtnBg>
    </LineWrapper>
  );
};

const Message = ({ message, date, img = avatar }) => {
  const theme = useTheme();

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "4px",
        }}
      >
        <img
          style={{
            borderRadius: "50%",
            width: "31px",
            height: "31px",
            objectFit: "cover",
          }}
          src={img}
          alt="avatar"
        />
        <Text
          fS="14px"
          color="primary"
          m="0 0 0 010px"
          style={{ width: "100%" }}
        >
          {message}
        </Text>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          style={{
            fontFamily: "Play",
            fontSize: "12px",
            color: theme.chatDate,
            fontWeight: 600,
          }}
        >
          {date}
        </p>
      </div>
    </div>
  );
};

export default Tutorial;

const HideBtn = styled(IconBtnBg)`
  position: absolute;
  bottom: -16px;
  left: 15%;
  border-radius: 7px;
`;

const Inner = styled.div`
  padding: 25px 20px 20px 20px;
`;
