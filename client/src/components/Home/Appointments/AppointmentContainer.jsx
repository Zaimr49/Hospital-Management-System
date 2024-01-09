import React, { useEffect, useState } from "react";
import styles from "../Home.module.css";
import axios from "axios";
import Appointment from "./Appointment";

function AppointmentContainer({ user, userState, searchState }) {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [docId, setDocId] = useState("");
  const [disease, setDisease] = useState("");
  const [search, setSearch] = useState("");

  const fetchAppointments = async (values) => {
    try {
      if (userState === "patient") {
        const res = await axios.post(
          `http://localhost:5000/app/get-patient-app`,
          {
            p_id: user?._id,
          }
        );
        if (res) {
          console.log(res.data.data);
          setAppointments(res?.data?.data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createAppointment = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/app/create-app`, {
        d_id: docId,
        disease: disease,
        p_id: user?._id,
      });
      if (res) {
        alert("Appointment Made");
        fetchAppointments();
      }
    } catch (err) {
      alert(err);
    }
  };

  const fetchDoctorsByName = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5000/doctor/get-doc-by-name`,
        {
          name: search,
        }
      );
      if (res) {
        setDoctors(res.data.data);
      }
    } catch (err) {
      alert(err);
    }
  };

  const fetchDoctors = async (values) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/doctor/get-all-doctors`
      );
      if (res) {
        setDoctors(res.data.data);
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  return (
    <>
      {searchState ? (
        <>
          <form className="d-flex" onSubmit={fetchDoctorsByName}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Enter your Doctor Name"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className={`card mt-3 mb-3 ${styles.cardrow}`}
            >
              <h5 className="card-header">Name: {doctor?.name}</h5>
              <div className="card-body">
                <h5 className="card-title">ID: {doctor?._id}</h5>
                <h5 className="card-title">
                  Speciality:
                  {doctor?.speciality}
                </h5>
                <h5 className="card-title">
                  Experince: {doctor?.experience} Years
                </h5>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className={`card mb-5 pb-5 ${styles.cardrow}`}>
          <form onSubmit={createAppointment}>
            <div className="p-3">
              <h2>Create an appointment</h2>
              <label htmlFor="doctorId" className="form-label">
                Enter Doctor ID
              </label>
              <input
                type="text"
                className="form-control"
                id="doctorId"
                placeholder="ID"
                value={docId}
                onChange={(e) => setDocId(e.target.value)}
              />
            </div>
            <div className="p-3">
              <label htmlFor="disease" className="form-label">
                Enter your Disease
              </label>
              <input
                type="text"
                className="form-control"
                id="disease"
                placeholder="Disease"
                value={disease}
                onChange={(e) => setDisease(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-lg m-3">
              Submit
            </button>
          </form>
          {appointments.map((appointment) => (
            <Appointment
              key={appointment._id}
              a_id={appointment._id}
              name={appointment?.d_id?.name}
              disease={appointment.disease}
              confirmation={appointment.confirmation}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default AppointmentContainer;
