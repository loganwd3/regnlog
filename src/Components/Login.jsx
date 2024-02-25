import React from "react";
import "./Login.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../App";
import loginImage from "../assets/1.jpg";

export const Login = () => {
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState({
    type: "",
    message: "",
  });

  // const [password, setPassword] = useState(true);
  const [email, setEmail] = useState(true);

  const context = useContext(userContext);
  const navigate = useNavigate();

  function handleForm(e) {
    setLoginUser((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });

    // console.log(user);
  }

  function handleClick() {
    if (loginUser.email.length) {
      setEmail(true);
    } else {
      setEmail(false);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:8000/login", {
      method: "POST",
      body: JSON.stringify(loginUser),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        console.log(data);
        if (data.status === 404) {
          setMessage({
            type: "wrong",
            message: "Incorrect email or password",
          });
        } else if (data.status === 200) {
          setMessage({ type: "success", message: "login" });

          localStorage.setItem("logindata", JSON.stringify(data.status));
          context.setLoggedUser(JSON.parse(localStorage.getItem("logindata")));
          navigate("/home");
        }
        return data.json();
      })
      .then((data) => {
        console.log(context.loggedUser);
        console.log(data);
        if (data.passwordMessage !== undefined) {
          setLoginUser({ ...loginUser, password: "" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="login-container">
      <div className="left-img">
        <div className="box"></div>
        <img src={loginImage} alt="" />
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>LOGIN</h2>
        <input
          type="email"
          placeholder="Enter your Email"
          name="email"
          className={email ? "inp" : "inp wrong-email"}
          onChange={handleForm}
          value={loginUser.email}
          required
        />

        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          className="inp"
          value={loginUser.password}
          required
          onChange={handleForm}
        />

        <div className="login-bottom">
          <button onClick={handleClick} className="submit-btn">
            Login
          </button>
          <p>
            Dont have an account ? <Link to="/register">Register</Link>
          </p>
        </div>
        <p className={message.type}>{message.message}</p>
      </form>
    </div>
  );
};
