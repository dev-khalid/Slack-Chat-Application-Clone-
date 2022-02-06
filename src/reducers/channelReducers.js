import { SET_CURRENT_CHANNEL } from '../constants/channelConstants';

export const channelReducer = (state = { currentChannel: null }, action) => {
  switch (action.type) {
    case SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload,
      };
    default:
      return state;
  }
};
