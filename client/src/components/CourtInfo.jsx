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
  TextLineWrapper,
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
    <div style={{ padding: "5px" }}>
      <CourtInfoWrapper>
        <FlexCenterBox style={{ gap: "5px" }}>
          <IconWithTooltip icon={coverIcon} tooltip="Покриття" id="cover" />
          <Text fS="14px" fW={700}>
            {coverData}
          </Text>
        </FlexCenterBox>
        <FlexCenterBox style={{ gap: "5px" }}>
          <IconWithTooltip icon={countIcon} tooltip={countTooltip} id="count" />
          <Text fS="18px" fW={700}>
            {data.hoopsCount}
          </Text>
        </FlexCenterBox>
        <FlexCenterBox>
          <IconWithTooltip
            icon={<LightingIcon main={theme.lighting.main} />}
            tooltip="Освітлення"
            id="light"
          />
          {isLighting}
        </FlexCenterBox>
      </CourtInfoWrapper>
    </div>
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

export const CourtInfoWrapper = styled(TextLineWrapper)`
  padding: 3px 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: visible;
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
