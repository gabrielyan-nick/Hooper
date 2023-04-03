import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useGetCourtQuery } from "../api/courtsApi";
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
} from "./microComponets";
import {
  FavouriteIcon,
  CloseIcon,
  BasketballCourtIcon,
  ShowHideIcon,
  BackIcon,
} from "./svgIcons";
import { CourtInfo, CourtPlayers, CourtChat, CourtPhotosSlider } from "./index";
import { useAddRemoveFavMutation } from "../api/userApi";
import { setFavCourts } from "../store/storageSlice";
import {
  setUserIdForNav,
  setCourtIdForNav,
  setModalTypeForNav,
} from "../store/navigateSlice";
import { lightTheme } from "../styles/themes";

const AddRemoveFavourite = ({ courtId, changeModalType }) => {
  const { user = {} } = useSelector((state) => state.storage);
  const dispatch = useDispatch();
  const isFavCourt = user?.favouriteCourts.some((item) => courtId === item._id);
  const [addRemoveFav, result] = useAddRemoveFavMutation();

  const onAddRemoveFav = async () => {
    if (user !== null) {
      const res = await addRemoveFav({
        _id: user._id,
        courtId,
        token: user.token,
      });
      if (!res.error && res.data) {
        dispatch(setFavCourts(res.data));
      }
    } else changeModalType({ type: "logReg" });
  };
  return (
    <AddFavBtn onClick={onAddRemoveFav} color={lightTheme.popupBg}>
      {result.isLoading ? (
        <BtnSpinnerWrapper style={{ width: "27px", height: "27px" }}>
          <FavouriteIcon size={27} color="#19665480" />
        </BtnSpinnerWrapper>
      ) : isFavCourt ? (
        <FavouriteIcon size={27} color="#e4c307" />
      ) : (
        <FavouriteIcon size={27} color="#19665480" />
      )}
    </AddFavBtn>
  );
};

export default AddRemoveFavourite;

const AddFavBtn = styled(IconBtnBg)`
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  padding: 2px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
`;

AddRemoveFavourite.propTypes = {
  courtId: PropTypes.string,
  changeModalType: PropTypes.func.isRequired,
};
