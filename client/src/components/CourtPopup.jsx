import React from "react";
import styled from "styled-components";
// import { Popup } from "react-map-gl";

const PopupWrapper = styled.div`
  width: 100%;
  min-height: 300px;
  max-height: 700px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.popupBg};
`;

const CourtPopup = ({ courtId, onClose }) => {
  return (
    <PopupWrapper>
      <button onClick={onClose}></button>
    </PopupWrapper>
  );
};

export default CourtPopup;
