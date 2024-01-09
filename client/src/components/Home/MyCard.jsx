import React, { useState, useEffect } from "react";

const MyCard = ({ userType, userInfo, setUserInformation }) => {
  const [editable, setEditable] = useState(false);
  const [updatedInfo, setUpdatedInfo] = useState({ ...userInfo });
  const [averageRating, setAverageRating] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (userType === "doctor") {
      fetchDoctorAverageRating();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType, userInfo._id]);


  const toggleEdit = () => {
    setEditable(!editable);
  };

  const fetchDoctorAverageRating = () => {
    // Fetch average rating for doctor here
    fetch(`http://localhost:5000/feedback/get-doc-avg`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ d_id: userInfo._id }), // Assuming userInfo has the doctor's ID
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Average Rating:", data.data);
        setAverageRating(data.data);
      })
      .catch((error) => {
        console.error("Error fetching average rating:", error);
      });
  };
  

  const handleSave = () => {
    fetch(`http://localhost:5000/${userType}/update-info`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedInfo),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Updated data:", data);
        setUserInformation(updatedInfo);
        toggleEdit();
      })
      .catch((error) => {
        console.error("There was an error updating the data:", error);
      });
  };

  const renderUserInfo = () => {
    if (!editable) {
      return (
        <>
          <h3 className="card-title">
            {userType === "doctor"
              ? "Doctor"
              : userType.charAt(0).toUpperCase() + userType.slice(1)}
          </h3>
          <div className="card-text">
            <p>Name: {userInfo.name}</p>
            <p>Email: {userInfo.email}</p>
            {userType === "doctor" && (
              <>
                <p>Speciality: {userInfo.speciality}</p>
                <p>Experience: {userInfo.experience}</p>
                <p>Average Rating: {averageRating}</p>
              </>
            )}
          </div>
          <button onClick={toggleEdit} className="btn btn-primary mt-3">
            Update Info
          </button>
        </>
      );
    } else {
      return (
        <>
          <h3 className="card-title">
            {userType === "doctor"
              ? "Doctor"
              : userType.charAt(0).toUpperCase() + userType.slice(1)}
          </h3>
          <div className="card-text">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={updatedInfo.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={updatedInfo.email}
                onChange={handleInputChange}
              />
            </label>
            {userType === "doctor" && (
              <>
                <label>
                  Speciality:
                  <input
                    type="text"
                    name="speciality"
                    value={updatedInfo.speciality}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Experience:
                  <input
                    type="text"
                    name="experience"
                    value={updatedInfo.experience}
                    onChange={handleInputChange}
                  />
                </label>
              </>
            )}
          </div>
          <button onClick={handleSave} className="btn btn-success mt-3 me-2">
            Save
          </button>
          <button onClick={toggleEdit} className="btn btn-secondary mt-3">
            Cancel
          </button>
        </>
      );
    }
  };

  return (
    <div className="card sidebar">
      <div className="card-body">{renderUserInfo()}</div>
    </div>
  );
};

export default MyCard;
