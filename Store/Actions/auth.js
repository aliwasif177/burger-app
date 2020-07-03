import axios from "axios";

import * as actionTypes from "./actionTypes";
import { store } from "../../index";
export const auth = (email, password, isSignUp, history) => {
  let storage = null;
  storage = store.getState();

  return (dispatch) => {
    dispatch(authStart());
    const authenticationCredentials = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    let URL =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAB1pJ_mgrBoDWSnjtVk1lOGp0SWu9bUag";
    if (!isSignUp) {
      URL =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAB1pJ_mgrBoDWSnjtVk1lOGp0SWu9bUag";
    }
    axios
      .post(URL, authenticationCredentials)
      .then((response) => {
        console.log(response);
        const expirationTime = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("Token", response.data.idToken);
        localStorage.setItem("expireTime", expirationTime);
        localStorage.setItem("kind", response.data.kind);
        localStorage.setItem("localId", response.data.localId);

        dispatch(
          authSuccess(
            localStorage.getItem("Token"),
            localStorage.getItem("localId"),
            localStorage.getItem("kind")
          )
        );

        if (response.data.kind.includes("Verify")) {
          if (!storage.ing.ingredients) {
            history.push("/");
          } else {
            const sum = Object.keys(storage.ing.ingredients)
              .map((igKey) => {
                return storage.ing.ingredients[igKey];
              })
              .reduce((sum, el) => {
                return sum + el;
              }, 0);
            sum > 0 ? history.push("/checkout") : history.push("/");
          }
        }

        dispatch(checkAuthTimeOut(response.data.expiresIn));
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.error));
      });
  };
};
// export const onInitAuth = () => {
//   return {
//     type: actionTypes.INIT_AUTH
//   };
// };
export const initAuth = () => {
  return (dispatch) => {
    // const token = localStorage.getItem("Token");

    if (!localStorage.getItem("Token")) {
      dispatch(logOut());
    } else {
      const expireDate = new Date(localStorage.getItem("expireTime"));

      if (expireDate <= new Date()) {
        dispatch(logOut());
      } else {
        dispatch(
          authSuccess(
            localStorage.getItem("Token"),
            localStorage.getItem("localId"),
            localStorage.getItem("kind")
          )
        );
        dispatch(
          checkAuthTimeOut((expireDate.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
};
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};
export const authSuccess = (token, userId, kind) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
    kind: kind,
  };
};
export const logOut = () => {
  localStorage.removeItem("Token");
  localStorage.removeItem("expireTime");
  localStorage.removeItem("localId");
  localStorage.removeItem("kind");
  return {
    type: actionTypes.LOG_OUT,
  };
};

export const checkAuthTimeOut = (expireTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logOut());
    }, expireTime * 1000);
  };
};

export const resetAll = () => {
  return {
    type: actionTypes.RESET_ALL,
  };
};

export const logOutConfirm = () => {
  localStorage.removeItem("Token");
  localStorage.removeItem("expireTime");
  localStorage.removeItem("localId");
  localStorage.removeItem("kind");
  return {
    type: actionTypes.LOG_OUT_INTENTIONALLY,
  };
};

export const logOutIntentionally = () => {
  // localStorage.removeItem("token");
  // localStorage.removeItem("expireTime");
  return (dispatch) => {
    dispatch(logOutConfirm());
    dispatch(resetAll());
  };
};
