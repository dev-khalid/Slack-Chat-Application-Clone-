import {
  SET_USER_REQUEST,
  SET_USER_SUCCESS,
  REMOVE_USER,
} from '../constants/authConstants';
import '../Firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const setUserInfo = () => async (dispatch) => {
  try {
    dispatch({ type: SET_USER_REQUEST });
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      dispatch({
        type: SET_USER_SUCCESS,
        payload: {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        },
      });
    });
  } catch (error) {}
};
