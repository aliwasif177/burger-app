import * as actionTypes from "../Actions/actionTypes";
import { updateObject } from "../utility";
const initialState = {
  token: null,
  userId: null,
  loading: false,
  error: null,
  signIn: false,
  signUp: false
};
const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      // let kind = action.kind.includes("Verify");
      return updateObject(state, {
        loading: true,
        error: null,
        signIn: false,
        signUp: false
      });
    case actionTypes.AUTH_SUCCESS:
      let kind = null;
      let signUp = null;
      if (action.kind) {
        kind = action.kind.includes("Verify");
        signUp = action.kind.includes("Signup");
      } else {
        kind = false;
        signUp = false;
      }

      return updateObject(state, {
        loading: false,
        token: action.token,
        userId: action.userId,
        error: null,
        signIn: kind,
        signUp: signUp
      });
    case actionTypes.AUTH_FAIL:
      // kind = action.kind.includes("Verify");
      return updateObject(state, {
        loading: false,
        error: action.error,
        signIn: false,
        signUp: false
      });
    case actionTypes.LOG_OUT:
      return updateObject(state, {
        userId: null,
        token: null,
        signIn: false,
        signUp: false
      });
    case actionTypes.LOG_OUT_INTENTIONALLY:
      return updateObject(state, {
        token: null,
        userId: null,
        signIn: false,
        signUp: false
      });
    case actionTypes.INIT_AUTH:
      return updateObject(state, { token: localStorage.getItem("Token") });
  }
  return state;
};
export default auth;
