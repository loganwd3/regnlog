import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Registration = () => {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });

  const navigate = useNavigate();
  function handleForm(e) {
    setUser((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });

    // console.log(user);
  }
  function handleSubmit(e) {
    e.preventDefault();

    fetch(
      "mongodb+srv://logandb2:<password>@cluster0.2wc2eqb.mongodb.net:8000/register",
      {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((data) => {
        console.log(data);
        if (data.status === 201) {
          setMessage("Registered successfully");
          setUser({
            name: "",
            email: "",
            password: "",
            age: "",
          });
          navigate("/login");
        }
        return data.json();
      })
      .then((data) => {
        console.log(data);
        if (data.message !== undefined) {
          setMessage("Fill all the fields");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="reg-container">
      <div className="reg">
        <div className="left-reg">
          <div className="overlay"></div>
        </div>
        <div className="right-reg">
          <form onSubmit={handleSubmit}>
            <h2>SIGN UP</h2>
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              className="inp"
              value={user.name}
              onChange={handleForm}
            />

            <input
              type="email"
              placeholder="Enter your Email"
              name="email"
              className="inp"
              value={user.email}
              onChange={handleForm}
            />

            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              className="inp"
              value={user.password}
              onChange={handleForm}
            />

            <input
              type="number"
              placeholder="Enter your age"
              name="age"
              value={user.age}
              max="100"
              min="15"
              className="inp"
              onChange={handleForm}
            />
            <div className="bottom-sec">
              <button>Sign Up</button>
              <p>
                Already registered ? <Link to="/login">LOGIN</Link>{" "}
              </p>
            </div>
            <p>{message}</p>
          </form>
        </div>
      </div>
    </div>
  );
};
