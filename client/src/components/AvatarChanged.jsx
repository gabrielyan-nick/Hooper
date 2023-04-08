import React, { useState, useRef } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useUpdateUserInfoMutation } from "../api/userApi";
import { FlexCenterBox, IconBtnBg, IconSpinnerWrapper } from "./microComponets";
import { ChangeAvatarIcon, CloseIcon, SaveIcon } from "./svgIcons";
import { setLogin } from "../store/storageSlice";
import { BasketballMarker, PhotoWindow } from "./index";

const AvatarChanged = ({ photo, openPhoto }) => {
  const { token, _id } = useSelector((state) => state.storage.user);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [changedAvatar, setChangedAvatar] = useState(null);
  const [changedAvatarUrl, setChangedAvatarUrl] = useState(null);
  const changeRef = useRef(null);
  const saveCloseRef = useRef(null);
  const nodeRef = changedAvatar === null ? changeRef : saveCloseRef;
  const [updateAvatar, result] = useUpdateUserInfoMutation();
  const dispatch = useDispatch();

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

  const onSaveChangedAvatar = async () => {
    const imageRef = ref(storage, `${_id}/${changedAvatar.name}`);
    uploadBytes(imageRef, changedAvatar)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            const formData = new FormData();
            formData.append("picturePath", url);
            updateAvatar({ _id, token, formData }).then((result) => {
              result.data && dispatch(setLogin(result.data));
              setChangedAvatar(null);
              setChangedAvatarUrl(null);
            });
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  const onCancelChangeAvatar = () => {
    setChangedAvatar(null);
    setChangedAvatarUrl(null);
  };

  const openPhotoModal = () => setIsPhotoModalOpen(true);
  const closePhotoModal = () => setIsPhotoModalOpen(false);

  return (
    <>
      <FlexCenterBox>
        <AvatarWrapper>
          <Avatar
            onClick={openPhotoModal}
            src={`${changedAvatar === null ? photo : changedAvatarUrl} `}
            alt="avatar"
            disableClick={changedAvatar !== null}
          />
          <SwitchTransition mode="out-in">
            <CSSTransition
              timeout={100}
              key={changedAvatar}
              classNames="icons-switch"
              nodeRef={nodeRef}
            >
              {changedAvatar === null ? (
                <ChangeBtn color="green" ref={changeRef}>
                  <label htmlFor="avatar" style={{ height: "23px" }}>
                    <ChangeAvatarIcon />
                    <input
                      id="avatar"
                      type="file"
                      hidden
                      accept="image/png, image/jpg, image/jpeg"
                      onChange={onChangeAvatar}
                    />
                  </label>
                </ChangeBtn>
              ) : (
                <>
                  <CancelBtn
                    color="orange"
                    ref={saveCloseRef}
                    onClick={onCancelChangeAvatar}
                  >
                    <CloseIcon />
                  </CancelBtn>
                  <SaveBtn
                    color="green"
                    ref={saveCloseRef}
                    onClick={onSaveChangedAvatar}
                  >
                    {result.isLoading ? (
                      <IconSpinnerWrapper>
                        <BasketballMarker size={23} />
                      </IconSpinnerWrapper>
                    ) : (
                      <SaveIcon />
                    )}
                  </SaveBtn>
                </>
              )}
            </CSSTransition>
          </SwitchTransition>
        </AvatarWrapper>
      </FlexCenterBox>

      <PhotoWindow
        image={photo}
        opened={isPhotoModalOpen}
        closeModal={closePhotoModal}
      />
    </>
  );
};

export default AvatarChanged;

const AvatarWrapper = styled(FlexCenterBox)`
  position: relative;
  width: 110px;
  height: 110px;
  margin-left: 10px;
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

const SaveBtn = styled(IconBtnBg)`
  position: absolute;
  top: -8px;
  left: -12px;
  padding: 7px; ;
`;

const Avatar = styled.img`
  pointer-events: ${(props) => (props.disableClick ? "none" : "auto")};
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px;
`;
