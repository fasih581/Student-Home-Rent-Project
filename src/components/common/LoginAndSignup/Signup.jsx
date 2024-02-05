import React from "react";
import LoginCss from "./UserLogSign.module.css";
// validation schema and fromik
import { useFormik } from "formik";
import { AddUserSchema } from "../../../validation/validation";
// Bootstarp
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// redaux
import { useDispatch } from "react-redux";
import { createUser } from "../../../ReduxToolkit/Features/user.Slice";
// navigayion
import { useNavigate } from "react-router-dom";

// const onSubmit = () => {
//   console.log(sumbimted);
// };

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const AddUser = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
    },
    validationSchema: AddUserSchema,
    onSubmit: async (data, actions) => {
      handleSumbitt(data, actions);
      actions.resetForm();
    },
  });

  const handleSumbitt = async (data) => {
    try {
      await dispatch(createUser(data));
      navigate("/login");
    } catch (error) {
      console.error("Error occurred while creating user:", error);
    }
  };

  return (
    <div className={LoginCss.userlogSig}>
      <div className={LoginCss.box}>
        <div className={LoginCss.box_left}>
          <div className={LoginCss.box_leftall}>
            <h1>Get Started Now!</h1>
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
                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Phone Number"
                    name="phone"
                    onChange={AddUser.handleChange}
                    onBlur={AddUser.handleBlur}
                    value={AddUser.values.phoneNo}
                    className={
                      AddUser.errors.phone && AddUser.touched.phone
                        ? "formInput form-control is-invalid"
                        : "formInput form-control"
                    }
                  />
                  {AddUser.errors.phone && AddUser.touched.phone && (
                    <div className="invalid-feedback">
                      {AddUser.errors.phone}
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
                  <Form.Label>Password</Form.Label>
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
                  Signup
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
                Have an account?<a href="/login"> Login</a>
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
  );
};

export default Signup;
