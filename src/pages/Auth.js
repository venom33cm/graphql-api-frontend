import React, { useState } from "react";
import { GetTokenContext } from "../StateManagement/TokenProvider";
function Auth() {
  const [email, setemail] = useState("");
  const [isLogin, setisLogin] = useState(true);
  const [password, setpassword] = useState("");

  const [{ token, userId }, dispatch] = GetTokenContext();

  const changelogin = () => {
    if (isLogin) setisLogin(false);
    else setisLogin(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim().length === 0 || password.trim().length === 0) {
      alert("email/password field is missing");
      return;
    }

    let reqbody = {
      query: `
        query{
          login(email:"${email}",password:"${password}"){
            userId
            token
            tokenExpiry
          }
        }`,
    };

    if (!isLogin) {
      reqbody = {
        query: `
          mutation{
             createUser(userInput:{email:"${email}",password:"${password}"}){
               _id
               email
             }
          }`,
      };
    }
    fetch("http://localhost:4000/graphql", {
      method: "POST",
      body: JSON.stringify(reqbody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("login failed");
        }
        return res.json();
      })
      .then((resdata) => {
        // console.log(resdata);
        if (isLogin) {
          dispatch({
            type: "LOGIN",
            token: resdata.data.login.token,
            userId: resdata.data.login.userId,
          });
        } else {
          setisLogin(true);
          setemail("");
          setpassword("");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="auth">
      <div className="authcontainer">
        <h4>{isLogin ? "Login" : "SignUp"}</h4>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <label htmlFor="password">password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <div className="buttons">
            <button type="submit" className="btn">
              submit
            </button>
            <button type="button" className="btn" onClick={changelogin}>
              {isLogin ? "SignUp" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Auth;
