import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { Tooltip } from "react-tooltip";
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

const Tutorial = ({ closeModal }) => {
  const theme = useTheme();
  return (
    <div>
      <ModalHeader empty>
        <CloseBtn onClick={closeModal}>
          <CloseIcon />
        </CloseBtn>
      </ModalHeader>
      <div style={{ padding: "20px" }}>
        <FlexCenterBox>
          <Title fS="23px" fW="600">
            Привіт! Я
          </Title>
          <LogoText m="0 0 0 5px">Hooper</LogoText>
        </FlexCenterBox>

        <Text m="15px 0 0" fS="17px">
          &nbsp;Сайт який допоможе знайти місце для гри в улюблений вид спорту.
        </Text>
        <Text m="5px 0 10px " fS="17px">
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
        <Text fS="17px" m="20px 0 15px">
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
        <Text fS="17px" m="20px 0 15px">
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
        <Text fS="17px" m="30px 0 15px">
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

        <FlexBetweenBox>
          <Text fS="17px" m="20px 7px 15px ">
            &nbsp;І не забудь натиснути на
          </Text>
          <Button fS="15px" p="5px 13px" height="auto">
            Я на полі
          </Button>
        </FlexBetweenBox>
      </div>
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
