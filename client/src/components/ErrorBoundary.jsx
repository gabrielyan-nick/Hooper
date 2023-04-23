import React, { Component } from "react";
import { ErrorIcon, CloseIcon } from "./svgIcons";
import styled, { css } from "styled-components";
import { ModalHeader, Text, CloseBtn } from "./microComponets";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }

  static defaultProps = {
    inModal: false,
  };

  componentDidCatch(error, info) {
    console.log(error, info);
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      return (
        <>
          {this.props.inModal && (
            <ModalHeader empty>
              <CloseBtn onClick={this.props.closeModal}>
                <CloseIcon />
              </CloseBtn>
            </ModalHeader>
          )}

          <Wrapper inModal={this.props.inModal}>
            <ErrorIcon />
            <Text m="20px auto 0" fW="600" fS="20px" centred>
              Упс...щось пішло не так
              <br />
              Перезавантажте сторінку або спробуйте пізніше
            </Text>
          </Wrapper>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

const Wrapper = styled.div`
  margin: ${(props) => (props.inModal ? "20px 0" : 0)};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.popupBg};
`;
