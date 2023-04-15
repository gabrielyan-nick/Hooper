import React, { useState, useEffect, useCallback, useRef } from "react";
import styled, { useTheme } from "styled-components";
import { Tooltip } from "react-tooltip";
import {
  BasketballCourtIcon,
  FootballFieldIcon,
  BasketballHoopIcon,
  FootballGoalIcon,
  LightingIcon,
  OkIcon,
  CloseIcon,
  CourtIcon,
} from "./svgIcons";
import {
  FlexBetweenBox,
  FlexCenterBox,
  Text,
  IconButton,
} from "./microComponets";
import useMediaQuery from "../hooks/useMediaQuery";

const CourtInfo = ({ data }) => {
  const isSmallScreen = useMediaQuery("(max-width: 380px)");
  const theme = useTheme();
  const coverIcon =
    data.sport === "basketball" ? (
      <CourtIcon color="#bb3407e8" />
    ) : (
      <CourtIcon color="#016837" />
    );

  const coverData =
    data.sport === "basketball"
      ? basketballCover[data.cover]
      : footballCover[data.cover];

  const countIcon =
    data.sport === "basketball" ? (
      <BasketballHoopIcon
        main={theme.hoopIcon.main}
        secondary={theme.hoopIcon.secondary}
        net={theme.hoopIcon.net}
        border={theme.hoopIcon.border}
        bottom={theme.hoopIcon.bottom}
      />
    ) : (
      <FootballGoalIcon
        main={theme.goal.main}
        secondary={theme.goal.secondary}
        net={theme.goal.net}
      />
    );

  const isLighting = data.lighting ? (
    <OkIcon />
  ) : (
    <CloseIcon size={20} color={"#f53303"} />
  );

  const countTooltip =
    data.sport === "basketball" ? "Кількість кілець" : "Кількість воріт";

  return (
    <CourtInfoWrapper>
      <CourtInfoDataWrapper
        style={{ flexBasis: isSmallScreen ? "43%" : "33%" }}
      >
        <IconWithTooltip icon={coverIcon} tooltip="Покриття" id="cover" />
        <Text fS="14px" fW={700}>
          {coverData}
        </Text>
      </CourtInfoDataWrapper>
      <CourtInfoDataWrapper>
        <IconWithTooltip icon={countIcon} tooltip={countTooltip} id="count" />
        <Text fS="18px" fW={700}>
          {data.hoopsCount}
        </Text>
      </CourtInfoDataWrapper>
      <CourtInfoDataWrapper>
        <IconWithTooltip
          icon={<LightingIcon />}
          tooltip="Освітлення"
          id="light"
        />
        {isLighting}
      </CourtInfoDataWrapper>
    </CourtInfoWrapper>
  );
};

export default CourtInfo;

export const IconWithTooltip = ({ icon, tooltip, id, place = "top" }) => {
  return (
    <>
      <IconButton data-tooltip-id={id} data-tooltip-place={place}>
        {icon}
      </IconButton>
      <Tooltip
        id={id}
        openOnClick
        style={{
          borderRadius: "7px",
          padding: "5px 7px",
          backgroundColor: "#1a1818dc",
        }}
      >
        <Text color="#fff">{tooltip}</Text>
      </Tooltip>
    </>
  );
};

const CourtInfoWrapper = styled(FlexBetweenBox)`
  padding: 5px;
`;
const CourtInfoDataWrapper = styled(FlexCenterBox)`
  flex-basis: 33%;
  gap: 5px;
`;

const basketballCover = {
  rubber: "Резина",
  beton: "Бетон",
  asphalt: "Асфальт",
  indoor: "Зал",
};

const footballCover = {
  natural: "Натуральне",
  synthetic: "Синтетичне",
  indoor: "Зал",
};
