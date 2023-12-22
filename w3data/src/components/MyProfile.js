import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useProfileEffect from '../api-services/profile_service';
import SideNavBar from '../global-components/SideNavBar';
import TopNavBar from '../global-components/TopNavBar';
import '../styles/Profile.css';

const MyProfile = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const {
    userProfile,
    loading,
    error,
    editedUserProfile,
    setEditedUserProfile,
    handleFormSubmit,
  } = useProfileEffect(username);

  // Check for the presence of the token on component mount
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      // Redirect to the login page if the token is not present
      navigate('/login');
    }
  }, [navigate]);





  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setEditedUserProfile((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

 

  return (



    <div style={{width:'100%',height:'100vh',justifyContent:'center'}}>
    <TopNavBar /> {/* Include your SideNavBar component here */}
  <SideNavBar /> {/* Include your SideNavBar component here */}
<div style={{width:'80%',height:'fit-content',display:'flex',marginLeft:'15%'}} >
    

      <div  className="Edit_profile_form" style={{}}>



      
      {loading ? (
        <p>Loading user profile...</p>
      ) : error ? (
        <p>{error}</p>
      ) : userProfile ? (
        <>
          <h2>Edit Profile</h2>
          <form onSubmit={handleFormSubmit} className="profile-form">
  <div className="row">
    <div className="col">
      <label htmlFor="teamname">Team Name:</label>
      <input
        type="text"
        id="teamname"
        name="teamname"
        value={editedUserProfile.teamname}
        onChange={handleInputChange}
      />
    </div>
    <div className="col">
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={editedUserProfile.username}
        readOnly
      />
    </div>
    <div className="col">
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={editedUserProfile.email}
        onChange={handleInputChange}
      />
    </div>
  </div>
  <div className="row">
    <div className="col">
      <label htmlFor="firstname">First Name:</label>
      <input
        type="text"
        id="firstname"
        name="firstname"
        value={editedUserProfile.firstname}
        onChange={handleInputChange}
      />
    </div>
    <div className="col">
      <label htmlFor="lastname">Last Name:</label>
      <input
        type="text"
        id="lastname"
        name="lastname"
        value={editedUserProfile.lastname}
        onChange={handleInputChange}
      />
    </div>
  </div>
  <div className="row">
    <div className="col user-address">
      <label htmlFor="Address">Address:</label>
      <input style={{width:'90%'}}
      className='User_Address'
        type="text"
        id="Address"
        name="Address"
        value={editedUserProfile.Address}
        onChange={handleInputChange}
      />
    </div>
  </div>
  <div className="row">
    <div className="col">
      <label htmlFor="city">City:</label>
      <input
        type="text"
        id="city"
        name="city"
        value={editedUserProfile.city}
        onChange={handleInputChange}
      />
    </div>
    <div className="col">
      <label htmlFor="country">Country:</label>
      <input
        type="text"
        id="country"
        name="country"
        value={editedUserProfile.country}
        onChange={handleInputChange}
      />
    </div>
  </div>
  <div className="row">
    <div className="col">
      <label htmlFor="aboutme">About Me:</label>
      <textarea
        id="aboutme"
        name="aboutme"
        value={editedUserProfile.aboutme}
        onChange={handleInputChange}
      ></textarea>
    </div>
  </div>
  <div className="row">
    <button type="submit">Save Changes</button>
  </div>
</form>

       
      
        </>
      ) : (
        <p></p>
      )}
</div>
{userProfile ? (
      <div className='Profile_pic'>

            <div>
              
              {userProfile.profile_picture ? (
                <img
                  src={`data:image/jpeg;base64,${userProfile.profile_picture}`}
                  alt="Profile"
                  style={{ maxWidth: '300px', maxHeight: '300px' }}
                />
              ) : (
                <p>No profile picture available</p>
              )}
</div>
            <div>
              <strong></strong> <p> {userProfile.username} </p> 
            </div>
            <div>
              <strong></strong> <p>{userProfile.teamname|| 'N/A'}</p> 
            </div>
     <div>
              <strong></strong> <p>{userProfile.aboutme || 'N/A'}</p> 
            </div>

    </div>
    ) : (
      <p>No user profile found</p>
    )}
    </div>
    </div>
  );
};

export default MyProfile;