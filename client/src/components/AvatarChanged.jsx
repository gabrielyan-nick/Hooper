import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  Button,
  FlexBetweenBox,
  Text,
  UserWidgetBtn,
  TextLineWrapper,
  FlexCenterBox,
  IconBtnBg,
} from "./microComponets";
import { darkTheme, lightTheme } from "../styles/themes";
import { ChangeAvatarIcon, CloseIcon, SaveIcon } from "./svgIcons";

const AvatarWrapper = styled(FlexCenterBox)`
  position: relative;
  width: 110px;
  height: 110px;
`;

const ChangeBtn = styled(IconBtnBg)`
  position: absolute;
  bottom: -9px;
  right: -10px;
  padding: 7px; ;
`;

const CancelBtn = styled(IconBtnBg)`
  position: absolute;
  top: -9px;
  right: -10px;
  padding: 7px; ;
`;

const SavelBtn = styled(IconBtnBg)`
  position: absolute;
  bottom: -9px;
  left: -10px;
  padding: 7px; ;
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px;
`;

const AvatarChanged = ({ photo }) => {
  const { token } = useSelector((state) => state.storage.user);
  const [changedAvatar, setChangedAvatar] = useState(null);
  const [changedAvatarUrl, setChangedAvatarUrl] = useState(null);
  const [avatarLoadingStatus, setAvatarLoadingStatus] = useState("idle");
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  const openPhotoModal = () => setIsPhotoModalOpen(true);
  const closePhotoModal = () => setIsPhotoModalOpen(false);

  const onChangeAvatar = (e) => {
    const avatar = e.target.files[0];
    if (avatar) {
      const reader = new FileReader();
      reader.readAsDataURL(avatar);
      reader.onload = () => {
        setChangedAvatar(avatar);
        setChangedAvatarUrl(reader.result);
      };
    }
  };

  //   const onSaveChangedAvatar = async () => {
  //     const imageRef = ref(storage, `${loggedInUser._id}/${changedAvatar.name}`);
  //     uploadBytes(imageRef, changedAvatar)
  //       .then(() => {
  //         getDownloadURL(imageRef)
  //           .then((url) => {
  //             const formData = new FormData();
  //             formData.append("picturePath", url);
  //             setAvatarLoadingStatus("loading");
  //             dispatch(
  //               updateUserData({
  //                 id: `${loggedInUser._id}/avatar`,
  //                 formData,
  //                 token,
  //                 initData: loggedInUser,
  //               })
  //             ).then(() => {
  //               setAvatarLoadingStatus("idle");
  //               setChangedAvatar(null);
  //               setChangedAvatarUrl(null);
  //               dispatch(setListFix());
  //               dispatch(setPostsReloadFix());
  //             });
  //           })
  //           .catch((error) => console.log(error));
  //       })
  //       .catch((error) => console.log(error));
  //   };

  const onCancelChangeAvatar = () => {
    setChangedAvatar(null);
    setChangedAvatarUrl(null);
  };

  return (
    <FlexCenterBox>
      <AvatarWrapper>
        <Avatar src={photo || null} />
        <SavelBtn color="green">
          <SaveIcon />
        </SavelBtn>
        <CancelBtn color="orange">
          <CloseIcon />
        </CancelBtn>
        <ChangeBtn color="green">
          <ChangeAvatarIcon />
        </ChangeBtn>
      </AvatarWrapper>
    </FlexCenterBox>
  );
};

export default AvatarChanged;
