import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile(props) {
  const [profileData, setProfileData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});

  useEffect(() => {
    getUsers();// eslint-disable-next-line
  }, []);

  const email = localStorage.getItem("email");

  function getUsers() {
    axios({
      method: "GET",
      url: `http://127.0.0.1:5000/profile/${email}`,
      headers: {
        Authorization: "Bearer " + props.token,
      },
    })
      .then((response) => {
        console.log(response);
        const res = response.data;
        res.access_token && props.setToken(res.access_token);
        setProfileData({
          profile_name: res.name,
          profile_email: res.email,
          phone: res.phone, // Add phone to profileData
          about_me: res.about,
        });
        setUpdatedProfile({
          profile_name: res.name,
          profile_email: res.email,
          phone: res.phone,
          about_me: res.about,
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    // Perform an API call to update the user's profile
    axios({
      method: "PUT",
      url: `http://127.0.0.1:5000/update-profile`,
      headers: {
        Authorization: "Bearer " + props.token,
      },
      data: updatedProfile,
    })
      .then((response) => {
        console.log(response);
        const res = response.data;
        res.access_token && props.setToken(res.access_token);
        setEditing(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  let imgs = [
    "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp",
  ];

  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center h-50">
        <div className="col col-lg-12">
          <div className="card mb-3">
            {profileData && (
              <div className="row g-0">
                <div className="col-md-4 bg-c-lite-green text-center text-white">
                  <img
                    src={imgs[0]}
                    className="img-fluid my-5"
                    width="150"
                    alt="Profile"
                  />
                  <h5>{profileData.profile_name}</h5>
                  <p>Coder</p>
                  {editing ? (
                    <i
                      className="far fa-save mb-5"
                      onClick={handleSave}
                      style={{ cursor: "pointer" }}
                    ></i>
                  ) : (
                    <i
                      className="far fa-edit mb-5"
                      onClick={handleEdit}
                      style={{ cursor: "pointer" }}
                    ></i>
                  )}
                </div>

                <div className="col-md-8">
                  <div className="card-body p-4">
                    <h6>Your profile details:</h6>

                    {editing ? (
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Email</h6>
                          <input
                            type="text"
                            name="profile_email"
                            value={updatedProfile.profile_email}
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Phone</h6>
                          <input
                            type="text"
                            name="phone"
                            value={updatedProfile.phone}
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Email</h6>
                          <p className="text-muted">
                            {profileData.profile_email}
                          </p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Phone</h6>
                          <p className="text-muted">{profileData.phone}</p>
                        </div>
                      </div>
                    )}
                    <h6>About</h6>
                    <div className="d-flex justify-content-start">
                      {editing ? (
                        <textarea
                          name="about_me"
                          value={updatedProfile.about_me}
                          onChange={handleChange}
                          className="form-control"
                        />
                      ) : (
                        <p>{profileData.about_me}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
