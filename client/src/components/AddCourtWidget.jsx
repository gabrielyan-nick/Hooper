import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Button, UserWidgetBtn, IconBtnBg } from "./microComponets";
import { ModalWindow, LoginRegisterScreen, UserWidget } from "./index";
import { AddCourtIcon } from "./svgIcons";

const Wrapper = styled.div`
  position: absolute;
  bottom: 70px;
  right: 20px;
`;

const AddCourtBtn = styled(IconBtnBg)`
padding: 10px 20px 10px 15px;
border-radius: 30px;
`

const AddCourtWidget = () => {
  return (
    <Wrapper>
<AddCourtBtn color='orange'>
    <AddCourtIcon/>
</AddCourtBtn>
    </Wrapper>
  );
};

export default AddCourtWidget;
