import React, { useContext, useEffect, useState } from "react";
import styles from "./Auth.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import validationSchema from "../../schema/loginvalidation";
import LoginFormInitialVals from "../../constants/loginFormConstants";
import axios from "axios";

function LoginForm({ statefun, userState }) {
  const navigate = useNavigate();
  const [fetchedUser, setfetchedUser] = useState(null);

  const handleSubmit = async (values) => {
    try {
      const res = await axios.post(`http://localhost:5000/${userState}/login`, {
        email: values.email,
        password: values.password,
      });
      if (res) {
        localStorage.setItem("user", JSON.stringify(res?.data?.data[0]));
        localStorage.setItem("type", JSON.stringify(userState));
        setfetchedUser(res?.data?.data[0]);
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    if (fetchedUser != null) {
      navigate("/home");
    }
  }, [fetchedUser]);

  const formik = useFormik({
    initialValues: { LoginFormInitialVals },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className={`col-8 ${styles.formside}`}>
        <h1 className={styles.headingtext}>
          {userState.toUpperCase()} Login to your Account
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="row pt-4">
            <input
              className="form-control"
              type="text"
              placeholder="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="row pt-3 pb-3">
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div>
          <button className={`btn ${styles.formbtn}`} type="submit">
            Login
          </button>
        </form>
      </div>
      <div
        className={`col-4 ${styles.imgside} px-5`}
        style={{ alignItems: "center", textAlign: "center" }}
      >
        <h1 className="pb-3 fs-1 fw-bold">Hey There!</h1>
        <h3 className="pb-4 fw-light">Create a new Account to Sign In</h3>
        <button
          className="btn btn-outline-light mt-2 px-5"
          onClick={() => statefun(true)}
        >
          Sign Up
        </button>
      </div>
    </>
  );
}

export default LoginForm;
