import React, { useState } from "react";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import "./Login.css";
import { auth, googleProvider } from "../../firebase";

function Login() {
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const loginHandler = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        // console.log(auth)
      })
      .catch((err) => {
        if (
          err.message ===
          "The password is invalid or the user does not have a password."
        ) {
          alert("Please check your email and password");
        }
        if (
          err.message ===
          "There is no user record corresponding to this indentifier. The user may have been deleted."
        ) {
          alert("Create a account");
        } else {
          alert(err.message);
        }
      });
    setEmail("");
    setPassword("");
  };

  const registerHandler = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        // console.log(auth)
        if (auth.user) {
          auth.user.updateProfile({
            displayName: firstName + "" + lastName,
          });
        }
      })
      .catch((err) => {
        alert(err.message);
      });
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };

  const googleSignInHandler = (e) => {
    e.preventDefault();
    auth
      .signInWithPopup(googleProvider)
      .then((auth) => {
        // console.log(auth)
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Quora_logo_2015.svg/250px-Quora_logo_2015.svg.png"
            alt=""
          />
        </div>
        <div className="login__desc">
          <p>A Place to Share knowledge and better understand the world</p>
        </div>
        <div className="login__auth">
          {!register ? (
            <div className="login__authOptions">
              <div className="login__authOption" onClick={googleSignInHandler}>
                <img
                  className="login__googleAuth"
                  src="https://media-public.canva.com/MADnBiAubGA/3/screen.svg"
                  alt=""
                />
                <p>Continue With Google</p>
              </div>
              <div className="login__authOption">
                <img
                  className="login__googleAuth"
                  src="https://1000logos.net/wp-content/uploads/2016/11/Facebook-logo-500x350.png"
                  alt=""
                />
                <span>Continue With Facebook</span>
              </div>
              <div className="login__authDesc">
                <p>
                  <span
                    style={{ color: "#3E78AD", cursor: "pointer" }}
                    onClick={() => setRegister(!register)}
                  >
                    Sign Up With Email
                  </span>
                  . By continuing you indicate that you have read and agree to
                  Quora's
                  <span style={{ color: "#3E78AD", cursor: "pointer" }}>
                    Terms of Service{" "}
                  </span>
                  and{" "}
                  <span style={{ color: "#3E78AD", cursor: "pointer" }}>
                    Privacy Policy
                  </span>
                  .
                </p>
              </div>
            </div>
          ) : (
            <div className="login__authOptions register__option">
              <div className="login__emailPass">
                <div className="login__label">
                  <h4>Sign Up</h4>
                </div>
                <div className="login__inputFields">
                  <div className="name" style={{ display: "flex" }}>
                    <div className="login__inputField">
                      <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>

                    <div className="login__inputField">
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="login__inputField">
                    <input
                      type="text"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="login__inputField">
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="login__authDesc">
                  <p>
                    {" "}
                    By continuing you indicate that you have read and agree to
                    Quora's{" "}
                    <span style={{ color: "#3E78AD", cursor: "pointer" }}>
                      Terms of Service{" "}
                    </span>
                    and{" "}
                    <span style={{ color: "#3E78AD", cursor: "pointer" }}>
                      Privacy Policy
                    </span>
                    .
                  </p>
                </div>
                <div className="register__actions">
                  <p onClick={() => setRegister(false)}>Cancel</p>
                  <button type="submit" onClick={registerHandler}>
                    Register
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="login__emailPass">
            <div className="login__label">
              <h4>Login</h4>
            </div>
            <div className="login__inputFields">
              <div className="login__inputField">
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="login__inputField">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="login__forgButt">
              <small>Forgot Password?</small>
              <button type="submit" onClick={loginHandler}>
                Login
              </button>
            </div>
          </div>
        </div>
        <div className="login__lang">
          <p>हिन्दी</p>
          <ArrowForwardIosIcon
            fontSize="small"
            style={{ marginRight: "20px" }}
          />
          <p>मराठी</p>
          <ArrowForwardIosIcon fontSize="small" />
        </div>
        <div className="login__footer">
          <p>About</p>
          <p>Languages</p>
          <p>Careers</p>
          <p>Businesses</p>
          <p>Privacy</p>
          <p>Terms</p>
          <p>Contact</p>
          <p>&copy; Quora Fake Inc. 2021</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
