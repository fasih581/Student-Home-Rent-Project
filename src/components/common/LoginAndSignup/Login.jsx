import React from "react";
import LoginCss from "./UserLogSign.module.css";
// validation schema and fromik
import { useFormik } from "formik";
import { LoginUserSchema } from "../../../validation/validation";
// Bootstarp
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// redaux
import { useDispatch } from "react-redux";
import { LoginUser } from "../../../ReduxToolkit/Features/user.Slice";
// navigayion
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const AddUser = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: LoginUserSchema,
    onSubmit: async (data, actions) => {
      await handleSumbitt(data, actions);
      actions.resetForm();
    },
  });

  const handleSumbitt = async (data) => {
    try {
      await dispatch(LoginUser(data));
      navigate("/");
    } catch (error) {
      // console.log("Error occurred while creating user:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "User Not Found!",
      });
    }
  };

  return (
    <>
      <div className={LoginCss.userlogSig}>
        <div className={LoginCss.box}>
          <div className={LoginCss.box_left}>
            <div className={LoginCss.box_leftall}>
              <h1>Welcome back!</h1>
              <p>Enter your Credentials to access your account</p>
              <Form onSubmit={AddUser.handleSubmit}>
                <div className={LoginCss.box_input}>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your Name"
                      name="name"
                      onBlur={AddUser.handleBlur}
                      onChange={AddUser.handleChange}
                      value={AddUser.values.name}
                      className={
                        AddUser.errors.name && AddUser.touched.name
                          ? "formInput form-control is-invalid"
                          : "formInput form-control"
                      }
                    />
                    {AddUser.errors.name && AddUser.touched.name && (
                      <div className="invalid-feedback">
                        {AddUser.errors.name}
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      name="email"
                      onBlur={AddUser.handleBlur}
                      onChange={AddUser.handleChange}
                      value={AddUser.values.email}
                      className={
                        AddUser.errors.email && AddUser.touched.email
                          ? "formInput form-control is-invalid"
                          : "formInput form-control"
                      }
                    />
                    {AddUser.errors.email && AddUser.touched.email && (
                      <div className="invalid-feedback">
                        {AddUser.errors.email}
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label className={LoginCss.pass}>
                      Password{" "}
                      <span>
                        <a href="#">forgot password</a>
                      </span>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      name="password"
                      onBlur={AddUser.handleBlur}
                      onChange={AddUser.handleChange}
                      value={AddUser.values.password}
                      className={
                        AddUser.errors.password && AddUser.touched.password
                          ? "formInput form-control is-invalid"
                          : "formInput form-control"
                      }
                    />
                    {AddUser.errors.password && AddUser.touched.password && (
                      <div className="invalid-feedback">
                        {AddUser.errors.password}
                      </div>
                    )}
                  </Form.Group>
                  <Button type="submit" className={LoginCss.login}>
                    Login
                  </Button>{" "}
                </div>
              </Form>
              <div className={LoginCss.line} id="line"></div>
              <div className={LoginCss.authentication}>
                <div className={LoginCss.auth}>
                  <img
                    width="48"
                    height="48"
                    src="https://img.icons8.com/color/48/google-logo.png"
                    alt="google-logo"
                  />
                  <h5>Sign in with Google</h5>
                </div>
                <div className={LoginCss.auth}>
                  <img
                    width="48"
                    height="48"
                    src="https://img.icons8.com/fluency/48/facebook-new.png"
                    alt="facebook-new"
                  />
                  <h5>Sign in with Facebook</h5>
                </div>
              </div>
              <div className={LoginCss.sign}>
                <p>
                  Don’t have an account?<a href="/signup"> Sign Up</a>
                </p>
              </div>
            </div>
          </div>
          <div className={LoginCss.box_right}>
            <img
              src="/src/assets/img/business-meeting-brainstorming-team-people-working-office-corporate-communication-men-women-sitting-negotiating-studying_575670-2062.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
