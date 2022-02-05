import { REMOVE_USER, SET_USER } from '../constants/authConstants';

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
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
