import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import { Tooltip } from "react-tooltip";
import {
  BasketballCourtIcon,
  FootballFieldIcon,
  BasketballHoopIcon,
  FootballGoalIcon,
  LightingIcon,
  OkIcon,
  CloseIcon,
} from "./svgIcons";
import {
  FlexBetweenBox,
  FlexCenterBox,
  Text,
  IconButton,
} from "./microComponets";

const CourtInfoWrapper = styled(FlexBetweenBox)`
  padding: 5px 10px;
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
};

const CourtInfo = ({ data }) => {
  const coverIcon =
    data.sport === "basketball" ? (
      <BasketballCourtIcon />
    ) : (
      <FootballFieldIcon />
    );

  const coverData =
    data.sport === "basketball"
      ? basketballCover[data.cover]
      : footballCover[data.cover];

  const countIcon =
    data.sport === "basketball" ? <BasketballHoopIcon /> : <FootballGoalIcon />;

  const isLighting = data.lighting ? (
    <OkIcon />
  ) : (
    <CloseIcon size={20} color={"#f53303"} />
  );

  const countTooltip =
    data.sport === "basketball" ? "Кількість кілець" : "Кількість воріт";

  return (
    <CourtInfoWrapper>
      <CourtInfoDataWrapper>
        <IconWithTooltip icon={coverIcon} tooltip="Покриття" id="cover" />
        <Text fontSize="17px" fontWeight={700}>
          {coverData}
        </Text>
      </CourtInfoDataWrapper>
      <CourtInfoDataWrapper>
        <IconWithTooltip icon={countIcon} tooltip={countTooltip} id="count" />
        <Text fontSize="20px" fontWeight={700}>
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

const IconWithTooltip = ({ icon, tooltip, id, place = "top" }) => {
  return (
    <>
      <IconButton data-tooltip-id={id} data-tooltip-place={place}>
        {icon}
      </IconButton>
      <Tooltip id={id} openOnClick style={{ borderRadius: "20px" }}>
        <Text fontSize="14px" color="#fff">
          {tooltip}
        </Text>
      </Tooltip>
    </>
  );
};

