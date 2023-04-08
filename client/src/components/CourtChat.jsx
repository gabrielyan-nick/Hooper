import React, { forwardRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useGetChatMessagesQuery } from "../api/courtsApi";
import {
  FlexBetweenBox,
  FlexCenterBox,
  IconButton,
  Title,
  CourtImg,
  CloseBtn,
  IconBtnBg,
  BackBtn,
  Button,
  BtnSpinnerWrapper,
  ModalHeader,
  ChatWrapper,
  Input,
  Text,
} from "./microComponets";
import {
  FavouriteIcon,
  CloseIcon,
  BasketballCourtIcon,
  ShowHideIcon,
  BackIcon,
  EditIcon,
  SaveIcon,
  DeleteIcon,
} from "./svgIcons";
import { formatDate } from "./utils";

const CourtChat = ({ closeModal, goBack }) => {
  const { courtId, chatId } = useParams();
  const {
    data: messages = {},
    isLoading,
    isSuccess,
  } = useGetChatMessagesQuery({ courtId, chatId });

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <div>
      <ModalHeader>
        <BackBtn onClick={goBack}>
          <BackIcon />
        </BackBtn>
        <Title>Чат</Title>
        <CloseBtn onClick={closeModal}>
          <CloseIcon />
        </CloseBtn>
      </ModalHeader>
      <ChatWrap>
        <MessagesWrapper>
          {Array.isArray(messages) &&
            messages.map((message) => (
              <ChatMessage key={message._id} message={message} />
            ))}
        </MessagesWrapper>
      </ChatWrap>
      <form style={{ margin: "0 5px" }}>
        <label htmlFor="message">
          <MessageInput name="message"></MessageInput>
        </label>
      </form>
    </div>
  );
};

export default CourtChat;

const ChatMessage = ({ message }) => {
  const [isEdited, setIsEdited] = useState(false);
  const id = useSelector((s) => s.storage?.user?._id);
  const isMyMessage = id === message.sender._id;
  const date = formatDate(message.createdAt);

  const onEditMessage = () => setIsEdited(true);
  const onCancelEditMessage = () => setIsEdited(false);

  return (
    <li>
      <MainLine>
        <Avatar src={message.sender.picturePath} />
        <Text style={{ width: "100%" }}>{message.text}</Text>
      </MainLine>
      <BottomLine isMyMessage={isMyMessage}>
        {isMyMessage &&
          (!isEdited ? (
            <BtnsWrapper>
              <Btn color="green">
                <EditIcon size={14} color="#f1e8e4" />
              </Btn>
              <Btn color="orange">
                <DeleteIcon size={14} color="#f1e8e4" />
              </Btn>
            </BtnsWrapper>
          ) : (
            <BtnsWrapper>
              <Btn color="green">
                <SaveIcon size={14} />
              </Btn>
              <Btn color="#e02504">
                <CloseIcon size={14} />
              </Btn>
            </BtnsWrapper>
          ))}
        <Date color="secondary" fS="14px">
          {date}
        </Date>
      </BottomLine>
    </li>
  );
};

const BtnsWrapper = styled(FlexBetweenBox)`
  gap: 8px;
`;

const Btn = styled(IconBtnBg)`
  border-radius: 5px;
  padding: 2px;
`;

const Date = styled(Text)`
  font-family: "Play", sans-serif;
`;

const MainLine = styled.div`
  display: flex;
  width: 100%;
  gap: 15px;
`;

const BottomLine = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.isMyMessage ? "space-between" : "flex-end"};
  margin-top: ${(props) => (props.isMyMessage ? "3px" : 0)};
  align-items: flex-end;
`;

const Avatar = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

const MessagesWrapper = styled.ul`
  display: flex;
  flex-direction: column-reverse;
  gap: 10px;
  flex: 1;
`;

const ChatWrap = styled(ChatWrapper)`
  height: 400px;
  margin: 5px;
  width: auto;
  display: flex;
`;

const MessageInput = styled(Input)`
  padding: 7px 10px;
`;
