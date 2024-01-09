import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import AppointmentContainer from "./Appointments/AppointmentContainer";
import DoctorAppointmentsContainer from "./Doctor/DoctorAppointmentContainer";
import MyCard from "./MyCard";
import StaffDisplayContainer from "./Staff/StaffDisplayContainer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [userState, setUserState] = useState("");
  const [user, setUser] = useState("");
  const [searchState, setSearchState] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load User from local store if present
    const user = JSON.parse(localStorage.getItem("user"));
    const userType = JSON.parse(localStorage.getItem("type"));

    if (userType) {
      setUserState(userType);
    }
    if (user) {
      setUser(user);
    }
  }, []);

  const updateUserInformation = (updatedUserInfo) => {
    // Update user state after saving changes
    setUser(updatedUserInfo);

    // Update user info in local storage if needed
    localStorage.setItem("user", JSON.stringify(updatedUserInfo));
  };
  const handleSignOut = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className={`container-fluid ${styles.outercontainer}`}>
      <div className="row pb-4">
        {userState === "" ? (
          <div className={`col-12 ${styles.innercontainer}`}>
            <h1>UnAuthorized Access !!! X X X X Please Login to Continue</h1>
          </div>
        ) : (
          <>
            <div className={`col-4 ${styles.leftcont}`}>
              <div className="row p-4">
              
          <button className="btn btn-danger me-3 col-12" onClick={handleSignOut}>
            Sign Out
          </button>
       
              </div>
              <div className="row p-4">
                <MyCard
                  userType={userState}
                  userInfo={user}
                  setUserInformation={updateUserInformation} // Pass the function as a prop
                />
              </div>
              <div className="row">
                {userState === "patient" ? (
                  <>
                    <div
                      className="btn-group mt-5 mb-5"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          setSearchState(true);
                        }}
                      >
                        Search Doctors
                      </button>
                    </div>
                    <div
                      className="btn-group mt-5 mb-5"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          setSearchState(false);
                        }}
                      >
                        Appointments
                      </button>
                    </div>
                  </>
                ) : userState === "staff" ? (
                  <>
                    <div
                      className="btn-group mt-5 mb-5"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          setSearchState(true);
                        }}
                      >
                        Patients
                      </button>
                    </div>
                    <div
                      className="btn-group mt-5 mb-5"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          setSearchState(false);
                        }}
                      >
                        Doctors
                      </button>
                    </div>
                  </>
                ) : (
                  true
                )}
              </div>
            </div>
            <div className={`col-8 ${styles.rightcont}`}>
              <div className="row p-4">
                {userState === "patient" ? (
                  <>
                    <AppointmentContainer
                      user={user}
                      userState={userState}
                      searchState={searchState}
                    />
                  </>
                ) : userState === "doctor" ? (
                  <>
                    <DoctorAppointmentsContainer user={user} />
                  </>
                ) : (
                  <StaffDisplayContainer
                    user={user}
                    userState={userState}
                    searchState={searchState}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
