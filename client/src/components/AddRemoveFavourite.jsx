import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { IconBtnBg, BtnSpinnerWrapper } from "./microComponets";
import { FavouriteIcon } from "./svgIcons";
import { useAddRemoveFavMutation } from "../api/userApi";
import { setFavCourts } from "../store/storageSlice";
import { lightTheme } from "../styles/themes";

const AddRemoveFavourite = ({ courtId }) => {
  const { user = {} } = useSelector((state) => state.storage);
  const dispatch = useDispatch();
  const isFavCourt = user?.favouriteCourts.some((item) => courtId === item._id);
  const [addRemoveFav, result] = useAddRemoveFavMutation();
  const navigate = useNavigate();
  const theme = useTheme();

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
    } else navigate("/login");
  };
  return (
    <AddFavBtn onClick={onAddRemoveFav}>
      {result.isLoading ? (
        <BtnSpinnerWrapper style={{ width: "27px", height: "27px" }}>
          <FavouriteIcon size={27} color="#ff6600" />
        </BtnSpinnerWrapper>
      ) : isFavCourt ? (
        <FavouriteIcon size={27} color="#ff6600" />
      ) : (
        <FavouriteIcon size={27} color={theme.favIconDisabled} />
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
  background: ${(props) => props.theme.iconBtn};
  &:hover {
    background: ${(props) => props.theme.iconBtnHover};
  }
`;

AddRemoveFavourite.propTypes = {
  courtId: PropTypes.string,
};
