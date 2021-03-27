import React, { useState } from "react";
import axios from "../axios-orders";

const UserContext = React.createContext();
const initialState = {
  saving: false,
  logginIn: false,
  error: null,
  errorCode: null,
  token: null,
  userId: null,
  expireDate: null,
};

export const UserStore = (props) => {
  const [state, setState] = useState(initialState);
  const loginUserSuccess = (token, userId, expireDate, refreshToken) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("expireDate", expireDate);
    localStorage.setItem("refreshToken", refreshToken);
    setState({
      ...state,
      logginIn: false,
      error: null,
      errorCode: null,
      token,
      userId,
      expireDate,
    });
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expireDate");
    localStorage.removeItem("refreshToken");
    setState({ initialState });
  };
  const autologoutAfter = (ms) => {
    return function (dispatch) {
      setTimeout(() => {
        dispatch(logout);
      }, ms);
    };
  };

  const loginUser = (email, password) => {
    setState({ ...state, logginIn: true });
    const data = {
      email,
      password,
      returnSecureToken: true,
    };
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCg4mENTR_WrHtTDJJ5oRrPpOUCd3pQ0FU",
        data
      )
      .then((result) => {
        //localstoraged xadgalna
        const token = result.data.idToken;
        const userId = result.data.localId;
        const expiresIn = result.data.expiresIn;
        const expireDate = new Date(new Date().getTime() + expiresIn * 1000);
        const refreshToken = result.data.refreshToken;
        loginUserSuccess(token, userId, expireDate, refreshToken);

        // dispatch(actions.autologoutAfter(expiresIn * 1000));
      })
      .catch((err) => {
        setState({
          ...state,
          logginIn: false,
          error: err.message,
          errorCode: err.code,
          token: null,
          userId: null,
          expireDate: null,
        });
      });
    //
  };

  const signupUser = (email, password) => {
    setState({ ...state, saving: true });
    const data = {
      email,
      password,
      returnSecureToken: true,
    };
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCg4mENTR_WrHtTDJJ5oRrPpOUCd3pQ0FU",
        data
      )
      .then((result) => {
        const token = result.data.idToken;
        const userId = result.data.localId;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        setState({
          ...state,
          saving: false,
          token,
          userId,
          error: null,
          errorCode: null,
        });
      })
      .catch((err) => {
        setState({
          ...state,
          saving: false,
          error: err.message,
          token: null,
          userId: null,
          errorCode: err.code,
        });
      });
    //
  };

  return (
    <UserContext.Provider
      value={{
        state,
        signupUser,
        loginUser,
        logout,
        loginUserSuccess,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserContext;
