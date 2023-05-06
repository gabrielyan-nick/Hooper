import React from "react";
import { TextLineWrapper, Text } from "./microComponets";

const CourtAddInfo = ({ data }) => {
  return (
    <TextLineWrapper p="5px 7px" m="0 5px 20px" width="auto">
      <Text>{data}</Text>
    </TextLineWrapper>
  );
};

export default CourtAddInfo;
