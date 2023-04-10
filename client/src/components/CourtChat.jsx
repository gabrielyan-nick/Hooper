import React, { forwardRef, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import io from "socket.io-client";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  useGetChatMessagesQuery,
  usePostChatMessageMutation,
} from "../api/courtsApi";
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
  EnterIcon,
} from "./svgIcons";
import { formatDate } from "./utils";

const CourtChat = ({ closeModal, goBack, openedCourt, socket }) => {
  const _id = useSelector((s) => s.storage?.user?._id);
  const picturePath = useSelector((s) => s.storage?.user?.picturePath);
  const token = useSelector((s) => s.storage?.user?.token);
  const username = useSelector((s) => s.storage?.user?.username);

  const [message, setMessage] = useState("");
  const { courtId, chatId } = useParams();
  const {
    data: messages = [],
    isLoading,
    isSuccess,
  } = useGetChatMessagesQuery({ courtId, chatId });
  const [postMessage, result] = usePostChatMessageMutation();
  const [messagesRecieved, setMessagesReceived] = useState([]);

  useEffect(() => {
    setMessagesReceived(messages);
  }, [isSuccess]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessagesReceived((state) => [data, ...state]);
      return () => socket.off("receive_message");
    });
  }, [socket]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message !== "") {
      const formData = new FormData();
      formData.append("userId", _id);
      formData.append("text", message);
      postMessage({ courtId, chatId, formData, token })
        .then((result) => {
          console.log(result);
          socket.emit("send_message", {
            sender: { _id, picturePath },
            text: message,
            createdAt: new Date(),
            chatId,
          });
          setMessage("");
        })
        .catch((e) => console.log(e));
    }
  };

  const leaveChat = () => {
    socket.emit("leave_chat", chatId);
  };

  const onCloseModal = () => {
    leaveChat();
    closeModal();
  };

  const onGoBack = () => {
    leaveChat();
    goBack();
  };

  return (
    <div>
      <ModalHeader>
        <BackBtn onClick={onGoBack}>
          <BackIcon />
        </BackBtn>
        <Title>{openedCourt}</Title>
        <CloseBtn onClick={onCloseModal}>
          <CloseIcon />
        </CloseBtn>
      </ModalHeader>

      <MessagesWrapper>
        {messagesRecieved?.map((message, i) => (
          <ChatMessage key={i} message={message} />
        ))}
      </MessagesWrapper>

      <Form onSubmit={sendMessage}>
        <label htmlFor="message">
          <Input
            name="message"
            p="7px 10px"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <SendMessageBtn color="green" type="submit">
          <EnterIcon size={27} />
        </SendMessageBtn>
      </Form>
    </div>
  );
};

export default CourtChat;

const ChatMessage = ({ message }) => {
  const [isEdited, setIsEdited] = useState(false);
  const id = useSelector((s) => s.storage?.user?._id);
  const isMyMessage = id === message.sender._id;
  const date = formatDate(message.createdAt);
  const editDelRef = useRef(null);
  const saveCloseRef = useRef(null);
  const nodeRef = isEdited ? saveCloseRef : editDelRef;

  const onEditMessage = () => setIsEdited(true);
  const onCancelEditMessage = () => setIsEdited(false);

  return (
    <li>
      <MainLine>
        <Avatar src={message.sender.picturePath} />
        <Text style={{ width: "100%" }}>{message.text}</Text>
      </MainLine>
      <BottomLine isMyMessage={isMyMessage}>
        {isMyMessage && (
          <SwitchTransition mode="out-in">
            <CSSTransition
              timeout={100}
              key={isEdited}
              classNames="icons-switch"
              nodeRef={nodeRef}
            >
              {!isEdited ? (
                <BtnsWrapper ref={editDelRef}>
                  <Btn color="green" onClick={onEditMessage}>
                    <EditIcon size={14} color="#f1e8e4" />
                  </Btn>
                  <Btn color="orange">
                    <DeleteIcon size={14} color="#f1e8e4" />
                  </Btn>
                </BtnsWrapper>
              ) : (
                <BtnsWrapper ref={saveCloseRef}>
                  <Btn color="green">
                    <SaveIcon size={14} />
                  </Btn>
                  <Btn color="#e02504" onClick={onCancelEditMessage}>
                    <CloseIcon size={14} />
                  </Btn>
                </BtnsWrapper>
              )}
            </CSSTransition>
          </SwitchTransition>
        )}
        <DateText color="secondary" fS="14px">
          {date}
        </DateText>
      </BottomLine>
    </li>
  );
};

const Form = styled.form`
  margin: 5px 5px 0 5px;
  display: grid;
  column-gap: 5px;
  grid-template-columns: auto 32px;
`;

const SendMessageBtn = styled(IconBtnBg)`
  padding: 3px;
  width: 32;
  height: 32px;
  border-radius: 7px;
`;

const BtnsWrapper = styled(FlexBetweenBox)`
  gap: 10px;
  margin-left: 50px;
`;

const Btn = styled(IconBtnBg)`
  border-radius: 5px;
  padding: 2px;
`;

const DateText = styled(Text)`
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
  height: 450px;
  display: flex;
  flex-direction: column-reverse;
  gap: 10px;
  border-radius: 7px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 5px;
  margin: 5px;
  scrollbar-width: auto;
  background: ${(props) => props.bg || props.theme.textWrapperBg};
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px;
  &::-webkit-scrollbar {
    display: initial;
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.scrollbar};
    border-radius: 10px;
  }
`;
