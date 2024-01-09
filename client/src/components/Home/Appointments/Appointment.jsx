import React, { useContext, useEffect, useState } from "react";
import styles from "../Home.module.css";
import axios from "axios";

function Appointment({ a_id, name, disease, confirmation }) {
  const [feedback, setFeedback] = useState([]);
  const [d_rating, setD_rating] = useState(0);
  const [s_rating, setS_rating] = useState(0);

  const fetchFeedback = async (values) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/feedback/get-feedback-by-app`,
        {
          a_id: a_id,
        }
      );
      if (res) {
        console.log(res?.data?.data);
        setFeedback(res?.data?.data);
      }
    } catch (err) {}
  };

  const createFeedback = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5000/feedback/create-feedback`,
        {
          a_id: a_id,
          doctor_rating: d_rating,
          stay_rating: s_rating,
        }
      );
      if (res) {
        alert("Feedback Made");
        fetchFeedback();
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <>
      <div key={a_id} className={`card mt-3 mb-3 ${styles.cardrow}`}>
        <h5 className="card-header">Appointment for {disease}</h5>
        <div className="card-body">
          <h5 className="card-title">Doctor: {name}</h5>
          <h5 className="card-title">
            Confirmation:
            {confirmation ? " Confirmed" : "Not Confirmed"}
          </h5>
          {feedback.map((feedb) => (
            <div key={feedb._id} className={`card mt-3 mb-3 ${styles.cardrow}`}>
              <h5 className="card-header">Feedback</h5>
              <div className="card-body">
                <h5 className="card-title">
                  Doctor Rating: {feedb.doctor_rating}
                </h5>
                <h5 className="card-title">Stay Rating: {feedb.stay_rating}</h5>
              </div>
            </div>
          ))}
          {feedback.length ? (
            false
          ) : (
            <div className={`card mt-3 mb-3 ${styles.cardrow}`}>
              <h5 className="card-header">Give Feedback</h5>
              <div className="card-body">
                <form onSubmit={createFeedback}>
                  <div className="p-3">
                    <label htmlFor="doctorId" className="form-label">
                      Enter Doctor Rating
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="doctorId"
                      placeholder="(1-5)"
                      value={d_rating}
                      onChange={(e) => setD_rating(e.target.value)}
                    />
                  </div>
                  <div className="p-3">
                    <label htmlFor="disease" className="form-label">
                      Enter Stay Rating
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="disease"
                      placeholder="(1-5)"
                      value={s_rating}
                      onChange={(e) => setS_rating(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg m-3">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Appointment;
