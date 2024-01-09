import { useEffect, useState } from "react";
import styles from "../Home.module.css";
import axios from "axios";

function StaffDisplayContainer({ user, userState, searchState }) {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const fetchPatients = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/patient/get-all-patients`
      );
      if (res && res.data.status === "success") {
        setPatients(res.data.data);
      } else {
        console.log("No Patients found");
      }
    } catch (err) {
      console.error("Error fetching Patients:", err);
    }
  };
  const fetchDoctors = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/doctor/get-all-doctors`
      );
      if (res && res.data.status === "success") {
        setDoctors(res.data.data);
      } else {
        console.log("No Patients found");
      }
    } catch (err) {
      console.error("Error fetching Patients:", err);
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchPatients();
  }, []);

  return (
    <>
      {searchState ? (
        <>
          {patients.map((patient) => (
            <div
              key={patient._id}
              className={`card mt-3 mb-3 ${styles.cardrow}`}
            >
              <h5 className="card-header">Name: {patient?.name}</h5>
              <div className="card-body">
                <h5 className="card-title">ID: {patient?._id}</h5>
                <h5 className="card-title">
                  Email:
                  {patient?.email}
                </h5>
                <h5 className="card-title">Password: {patient?.password}</h5>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className={`card mb-5 pb-5 ${styles.cardrow}`}>
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className={`card mt-3 mb-3 ${styles.cardrow}`}
            >
              <h5 className="card-header">Name: {doctor?.name}</h5>
              <div className="card-body">
                <h5 className="card-title">ID: {doctor?._id}</h5>
                <h5 className="card-title">email: {doctor?.email}</h5>
                <h5 className="card-title">password: {doctor?.password}</h5>
                <h5 className="card-title">
                  Speciality:
                  {doctor?.speciality}
                </h5>
                <h5 className="card-title">
                  Experience: {doctor?.experience} Years
                </h5>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default StaffDisplayContainer;
