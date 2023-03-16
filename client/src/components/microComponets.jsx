import styled from "styled-components";

export const FlexBetweenBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: ${(props) => props.direction || "row"};
`;

export const FlexCenterBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const IconButton = styled.button`
  position: relative;
  border: none;
  background: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  &:active {
    transform: scale(0.9);
  }
`;

export const Text = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: ${(props) => props.fontSize || "inherit"};
  font-weight: ${(props) => props.fontWeight || 600};
  color: ${(props) => props.color || props.theme.text};
  margin: 0;
`;

export const CourtTitle = styled.h3`
  font-family: "Nunito", sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => props.theme.courtTitleColor};
  margin: 0;
`;

export const CourtImg = styled.img`
  width: 100%;
  max-height: 180px;
  object-fit: cover;
`;
