import React, { useState, useContext } from "react";
import css from "./style.module.css";
import Spinner from "../../General/spinner";
import Button from "../../General/Button";
import { Redirect } from "react-router-dom";
import UserContext from "../../context/UserContext";
const Login = (props) => {
  const ctx = useContext(UserContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const changeEmail = (event) => {
    const newEmail = event.target.value;
    setForm((formBefore) => ({
      email: newEmail,
      password: formBefore.password,
    }));
  };
  const passwordlogin = (event) => {
    const newPassword = event.target.value;
    setForm((formBefore) => ({
      email: formBefore.email,
      password: newPassword,
    }));
  };
  const login = () => {
    ctx.loginUser(form.email, form.password);
  };

  return (
    <div className={css.Login}>
      {ctx.state.userId && <Redirect to="orders" />}
      <input onChange={changeEmail} type="text" placeholder="e-mail хаяг" />
      <input onChange={passwordlogin} type="password" placeholder="password" />
      {ctx.state.logginIn && <Spinner />}
      {ctx.state.firebaseError && (
        <div style={{ color: "red" }}>
          {ctx.state.firebaseError} kod: {ctx.state.firebaseErrorCode}
        </div>
      )}
      <Button text="Login" buttonType="Success" clicked={login} />
    </div>
  );
};

export default Login;
