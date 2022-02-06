import { SET_CURRENT_CHANNEL } from '../constants/channelConstants';

export const setCurrentChannelAction = (channel) => {
  return {
    type: SET_CURRENT_CHANNEL,
    payload: channel,
  };
};
