import {
  REMOVE_USER,
  SET_USER_REQUEST,
  SET_USER_SUCCESS,
} from '../constants/authConstants';

export const authReducer = (state = {  }, action) => {
  switch (action.type) {
    case SET_USER_REQUEST:
      return {
        loading: true,
      };
    case SET_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case REMOVE_USER:
      state = {};
      return {};
    default:
      return state;
  }
};
