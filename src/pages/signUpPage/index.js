import React, { useState, useContext } from "react";
import css from "./style.module.css";
import Button from "../../General/Button";
import Spinner from "../../General/spinner";
import { Redirect } from "react-router-dom";
import UserContext from "../../context/UserContext";
const Signup = (props) => {
  const ctx = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const Signup = () => {
    if (password1 === password2) {
      ctx.signupUser(email, password1);
    } else {
      setError("nuuts ug taaraxq bn");
    }
  };

  return (
    <div className={css.signUp}>
      {password2}
      {ctx.state.userId && <Redirect to="/orders" />}
      <h1>Бүртгэлийн форм</h1>
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="e-mail хаяг"
      />
      <input
        onChange={(e) => setPassword1(e.target.value)}
        type="password"
        placeholder="password"
      />
      <input
        onChange={(e) => setPassword2(e.target.value)}
        type="password"
        placeholder="password давтан оруул"
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
      {ctx.state.errorCode && (
        <div style={{ color: "red" }}>{ctx.state.errorCode}</div>
      )}
      {ctx.state.saving && <Spinner />}
      <Button text="Sign Up" buttonType="Success" clicked={Signup} />
    </div>
  );
};

export default Signup;
