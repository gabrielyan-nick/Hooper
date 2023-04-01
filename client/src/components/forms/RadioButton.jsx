import React, { useState, forwardRef } from "react";
import styled from "styled-components";
import { Text } from "../microComponets";
import { lightTheme } from "../../styles/themes";

const RadioText = styled(Text)`
  font-family: "Golos Text", sans-serif;
  display: inline-block;
  padding-left: 10px;
  cursor: pointer;
  user-select: none;
`;

const RadioBox = styled.div`
  position: relative;
`;

const RadioInput = styled.input`
  opacity: 0;
  position: absolute;
  cursor: pointer;
  width: 100%;
  height: 100%;
  &:focus + label {
    outline: 1px solid #04833d;
    border: none;
  }
  &:checked + label {
    background-color: ${(props) => props.color || lightTheme.green};
    border: none;
  }
  &:checked + label:after {
    opacity: 1;
  }
`;

const RadioLabel = styled.label`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
  height: 28px;
  width: 28px;
  display: block;
  transition: all 0.2s;
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
    rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
    rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px;
  &:after {
    border: 2px solid #fff;
    border-top: none;
    border-right: none;
    content: "";
    height: 6px;
    left: 8px;
    opacity: 0;
    position: absolute;
    top: 9px;
    transform: rotate(-45deg);
    width: 12px;
  }
`;

const RadioWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const RadioButton = forwardRef(
  ({ label, name, value, onChange, register, color }, ref) => {
    return (
      <RadioWrapper>
        <RadioBox>
          <RadioInput
            type="radio"
            name={name}
            id={value}
            value={value}
            {...register}
            onChange={onChange}
            ref={ref}
            color={color}
          />
          <RadioLabel htmlFor={value} />
        </RadioBox>
        <label htmlFor={value}>
          <RadioText>{label}</RadioText>
        </label>
      </RadioWrapper>
    );
  }
);

export default RadioButton;
