import React, { useEffect, useState } from "react";
import styles from "../Home.module.css";
import axios from "axios";

function DoctorAppointmentsContainer({ user }) {
  const [doctorAppointments, setDoctorAppointments] = useState([]);
  const [searchDisease, setSearchDisease] = useState("");

  const fetchDoctorAppointments = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/app/get-doc-app`,
        {
          d_id: user?._id,
        }
      );
      if (res && res.data.status === "success") {
        setDoctorAppointments(res.data.data);
      } else {
        console.log("No appointments found for this doctor");
      }
    } catch (err) {
      console.error("Error fetching doctor appointments:", err);
    }
  };

  const confirmAppointment = async (appointmentId) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/app/update-app`,
        {
          a_id: appointmentId,
          confirmation: true,
        }
      );
      if (res && res.data.status === "success") {
        fetchDoctorAppointments();
      } else {
        console.log("Appointment confirmation failed");
      }
    } catch (err) {
      console.error("Error confirming appointment:", err);
    }
  };

  const fetchAppointmentsByDisease = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/app/get-app-by-disease`,
        {
          disease: searchDisease,
        }
      );
      if (res && res.data.status === "success") {
        setDoctorAppointments(res.data.data);
      } else {
        console.log("No appointments found for this disease");
      }
    } catch (err) {
      alert("No Appointments for Disease")
      console.error("Error fetching appointments by disease:", err);
    }
  };

  useEffect(() => {
    fetchDoctorAppointments();
  }, [user]);

  return (
    <div className={`card mb-5 pb-5 ${styles.cardrow}`}>
      <h2 className="mt-3 mb-5" style={{ textAlign: 'center' }}>Doctor Appointments</h2>
      <div className={`d-flex align-items-center mb-3 ${styles.inputGroup}`}>
        <input
          type="search"
          className="form-control ms-3 me-2"
          placeholder="Search by Disease"
          value={searchDisease}
          onChange={(e) => setSearchDisease(e.target.value)}
        />
        <button
          className="btn btn-outline-success me-3"
          onClick={fetchAppointmentsByDisease}
        >
          Search
        </button>
      </div>
      {doctorAppointments.map((appointment) => (
        <div
          key={appointment._id}
          className={`card mt-3 mb-3 ${styles.cardrow}`}
        >
          <h5 className="card-header">
            Appointment for {appointment.disease}
          </h5>
          <div className="card-body">
            <h5 className="card-title">
              Patient: {appointment?.p_id?.name}
            </h5>
            <h5 className="card-title">
              Confirmation:
              {appointment.confirmation ? " Confirmed" : " Not Confirmed"}
            </h5>
            {!appointment.confirmation && (
              <button
                onClick={() => confirmAppointment(appointment._id)}
                className="btn btn-success"
              >
                Confirm Appointment
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DoctorAppointmentsContainer;