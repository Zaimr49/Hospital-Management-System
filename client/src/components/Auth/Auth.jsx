import { useEffect, useState } from "react";
import styles from "./Auth.module.css";
import { useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const Auth = () => {
  const [formstate, setformstate] = useState(false);
  const location = useLocation();
  const [userState, setUserState] = useState("");

  return (
    <div className={`container-fluid ${styles.outercontainer}`}>
      <h1 className="text-center display-1 mb-5 text-white">Hospital Management System</h1>
      <div className="row">
        <div className={`col-12 ${styles.innercontainer}`}>
          <div className="row">
            {userState === "" ? (
              <div
                className="btn-group"
                role="group"
                aria-label="Basic example"
              >
                <div className="col-4">
                  <div className="row">
                    <div>
                      <img
                        className="card-img-top"
                        src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?w=740&t=st=1701360222~exp=1701360822~hmac=818dar8Hz2AosDaKwEVVeDMgAnkrYndkQPb842cd2518d39bf6a1132d0f28a1ee"
                        alt="Card image"
                        style={{ width: "50%" }}
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        className="btn btn-success mb-3"
                        style={{ width: "80%" }}
                        onClick={() => {
                          setUserState("patient");
                        }}
                      >
                        Patient
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="row">
                    <div>
                      <img
                        className="card-img-top"
                        src="https://img.freepik.com/premium-vector/avatar-female-doctor-with-black-hair-doctor-with-stethoscope-vector-illustrationxa_276184-33.jpg?w=740"
                        alt="Card image"
                        style={{ width: "50%" }}
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        className="btn btn-success mb-3"
                        style={{ width: "80%" }}
                        onClick={() => {
                          setUserState("doctor");
                        }}
                      >
                        Doctor
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="row">
                    <div>
                      <img
                        className="card-img-top"
                        src="https://img.freepik.com/premium-vector/businessman-flat-icon-man-business-suit-avatar-businessman-flat-internet-icon-rounded-shape-web-mobile-design-element-male-profile-vector-colored-illustration_263753-2878.jpg?w=740"
                        alt="Card image"
                        style={{ width: "50%" }}
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        className="btn btn-success mb-3"
                        style={{ width: "80%" }}
                        onClick={() => {
                          setUserState("staff");
                        }}
                      >
                        Staff
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : formstate === true ? (
              <SignupForm statefun={setformstate} userState={userState} />
            ) : (
              <LoginForm statefun={setformstate} userState={userState} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
