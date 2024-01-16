import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register(props) {
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    username: "",
    password: ""
  });

  const navigate = useNavigate();

  function btnRegister(event) {
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/signup",
      data: {
        name: registerForm.name,
        email: registerForm.email,
        username: registerForm.username,
        password: registerForm.password
      }
    })
      .then((response) => {
        console.log(response);
        props.setToken(response.data.access_token);
        alert("Successfully Registered");
        localStorage.setItem('email', registerForm.email);
        navigate('/profile');
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
          if (error.response.status === 401) {
            alert("Registration failed");
          }
        }
      });

    setRegisterForm({
      name: "",
      email: "",
      username: "",
      password: ""
    });

    event.preventDefault();
  }

  function handleChange(event) {
    const { value, name } = event.target;
    setRegisterForm(prevNote => ({
      ...prevNote, [name]: value
    }));
  }

  let imgs = [
    'https://as1.ftcdn.net/v2/jpg/03/39/70/90/1000_F_339709048_ZITR4wrVsOXCKdjHncdtabSNWpIhiaR7.jpg',
  ];

  return (
    <div>
      <div className="container h-50">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-50">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src={imgs[0]} className="img-fluid" alt="Register" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3">Create Your Account</p>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    value={registerForm.name}
                    onChange={handleChange}
                    name="name"
                    id="form3Example1"
                    className="form-control form-control-lg"
                    placeholder="Enter your name"
                  />
                  <label className="form-label" htmlFor="form3Example1">Name</label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    value={registerForm.email}
                    onChange={handleChange}
                    name="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                  />
                  <label className="form-label" htmlFor="form3Example3">Email address</label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    value={registerForm.username}
                    onChange={handleChange}
                    name="username"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter your username"
                  />
                  <label className="form-label" htmlFor="form3Example4">Username</label>
                </div>

                <div className="form-outline mb-3">
                  <input
                    type="password"
                    value={registerForm.password}
                    onChange={handleChange}
                    name="password"
                    id="form3Example5"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                  />
                  <label className="form-label" htmlFor="form3Example5">Password</label>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-check mb-0">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="form2Example3"
                    />
                    <label className="form-check-label" htmlFor="form2Example3">
                      Remember me
                    </label>
                  </div>
                  <a href="#!" className="text-body">Already have an account? <a href="/login" className="link-danger">Login</a></a>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button type="button" className="btn btn-primary btn-lg" onClick={btnRegister}>Register</button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account? <a href="/login" className="link-danger">Login</a></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
