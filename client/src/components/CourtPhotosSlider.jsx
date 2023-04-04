import React, { forwardRef, useState, useRef } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useSwipeable } from "react-swipeable";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { CourtImg, IconBtnBg, IconSpinnerWrapper } from "./microComponets";
import { CloseIcon, AddPhotoIcon, SaveIcon, PrevNextArrow } from "./svgIcons";
import { AddRemoveFavourite } from "./index";
import { useUpdateCourtInfoMutation } from "../api/courtsApi";
import { BasketballMarker, PhotoWindow } from "./index";
import { lightTheme } from "../styles/themes";

const CourtPhotosSlider = ({ courtId, photos, sport }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const token = useSelector((state) => state.storage.user?.token);
  const [addedPhoto, setAddedPhoto] = useState(null);
  const [addedPhotoUrl, setAddedPhotoUrl] = useState(null);
  const [addPhoto, result] = useUpdateCourtInfoMutation();
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const addRef = useRef(null);
  const saveCloseRef = useRef(null);
  const nodeRef = addedPhoto ? saveCloseRef : addRef;
  const navigate = useNavigate();

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    swipeDuration: 300,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const handlePrev = () => {
    if (slideIndex > 0) {
      setSlideIndex((slideIndex) => slideIndex - 1);
    }
  };

  const handleNext = () => {
    if (slideIndex < photos?.length - 1) {
      setSlideIndex((slideIndex) => slideIndex + 1);
    }
  };

  const onSetPhoto = (e) => {
    const photo = e.target.files[0];
    if (photo) {
      const reader = new FileReader();
      reader.readAsDataURL(photo);
      reader.onload = () => {
        setAddedPhoto(photo);
        setAddedPhotoUrl(reader.result);
      };
    }
  };

  const onCancelAddedphoto = () => {
    setAddedPhoto(null);
    setAddedPhotoUrl(null);
  };

  const onSavePhoto = () => {
    if (addedPhoto) {
      const imageRef = ref(storage, `courts/${courtId}`);
      uploadBytes(imageRef, addedPhoto)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              const formData = {
                photos: url,
              };
              addPhoto({ courtId, formData, token }).then((res) => {
                console.log(res);
                if (res.data) onCancelAddedphoto();
              });
            })
            .catch((e) => console.log(e));
        })
        .catch((e) => console.log(e));
    }
  };

  const checkAuth = () => {
    !token && navigate("/login");
  };

  const openPhotoModal = () => setIsPhotoModalOpen(true);
  const closePhotoModal = () => setIsPhotoModalOpen(false);

  return (
    <>
      <Wrapper>
        {photos?.length === 1 || addedPhoto ? (
          <CourtImage src={addedPhotoUrl || photos} onClick={openPhotoModal} />
        ) : (
          <div {...handlers}>
            <SliderWrapper>
              <SliderTrack slides={photos?.length}>
                {photos?.map((photo, i) => (
                  <SliderImg
                    key={i}
                    src={photo}
                    slideIndex={slideIndex}
                    onClick={openPhotoModal}
                  />
                ))}
              </SliderTrack>
            </SliderWrapper>
            <PrevBtn
              onClick={handlePrev}
              disabled={slideIndex === 0 || addedPhoto}
            >
              <PrevNextArrow />
            </PrevBtn>
            <NextBtn
              onClick={handleNext}
              disabled={slideIndex === photos?.length - 1 || addedPhoto}
            >
              <PrevNextArrow dir="next" />
            </NextBtn>
          </div>
        )}
        <FavBtn>
          <AddRemoveFavourite courtId={courtId} />
        </FavBtn>
        <SwitchTransition mode="out-in">
          <CSSTransition
            timeout={100}
            key={addedPhoto}
            classNames="icons-switch"
            nodeRef={nodeRef}
          >
            {addedPhoto ? (
              <div ref={saveCloseRef}>
                <CancelBtn
                  color="orange"
                  onClick={onCancelAddedphoto}
                  disabled={result.isLoading}
                >
                  <CloseIcon />
                </CancelBtn>
                <SaveBtn
                  color="green"
                  disabled={result.isLoading}
                  onClick={onSavePhoto}
                >
                  {result.isLoading ? (
                    <IconSpinnerWrapper>
                      <BasketballMarker size={23} />
                    </IconSpinnerWrapper>
                  ) : (
                    <SaveIcon />
                  )}
                </SaveBtn>
              </div>
            ) : (
              <AddPhotoBtn color={lightTheme.popupBg} onClick={checkAuth}>
                <label>
                  <AddPhotoIcon />
                  <input
                    id="photos"
                    type="file"
                    name="photo"
                    hidden
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={onSetPhoto}
                    disabled={!token}
                  />
                </label>
              </AddPhotoBtn>
            )}
          </CSSTransition>
        </SwitchTransition>
      </Wrapper>

      <PhotoWindow
        image={photos && photos[slideIndex]}
        opened={isPhotoModalOpen}
        closeModal={closePhotoModal}
      />
    </>
  );
};

export default CourtPhotosSlider;

const PrevNextBtn = styled(IconBtnBg)`
  position: absolute;
  background: transparent;
  box-shadow: none;
  top: 45%;
  &:disabled {
    cursor: default;
    opacity: 0.2;
  }
`;

const PrevBtn = styled(PrevNextBtn)`
  left: 5px;
`;

const NextBtn = styled(PrevNextBtn)`
  right: 5px;
`;

const CourtImage = styled(CourtImg)`
  width: 100%;
  object-fit: cover;
  cursor: pointer;
`;

const SliderImg = styled(CourtImage)`
  transform: translateX(-${(props) => props.slideIndex * 100}%);
  transition: all 0.3s;
  width: 100%;
  cursor: pointer;
`;

const SliderTrack = styled.div`
  display: flex;
  width: ${(props) => props.slides * 100}%;
`;

const SliderWrapper = styled.div`
  overflow-x: hidden;
`;

const IconBtn = styled(IconBtnBg)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  border-radius: 7px;
`;

const AddPhotoBtn = styled(IconBtn)`
  bottom: 9px;
  right: 5px;
  height: 31px;
  cursor: pointer;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
`;

const CancelBtn = styled(IconBtn)`
  bottom: 45px;
  right: 5px;
`;

const SaveBtn = styled(IconBtn)`
  bottom: 9px;
  right: 5px;
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 5px;
`;

const FavBtn = styled.div`
  position: absolute;
  bottom: 9px;
  left: 5px;
`;
