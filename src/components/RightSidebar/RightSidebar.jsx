import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RightSidebar.css';
import assets from '../../assets/assets';
import { logout } from '../../config/firebase';

const RightSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login'); // Redirect to the login page or any other route after logout
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div className="rs">
      <div className="rs-profile">
        <img src={assets.profile_img} alt="Profile" />
        <h3>
          Richard Sanford <img src={assets.green_dot} className="dot" alt="Online status" />
        </h3>
        <p>Hey, there! I am Richard Sanford using a chat app.</p>
      </div>
      <hr />
      <div className="rs-media">
        <p>Media</p>
        <div className="rs-media-grid">
          <img src={assets.pic1} alt="Media 1" />
          <img src={assets.pic2} alt="Media 2" />
          <img src={assets.pic3} alt="Media 3" />
          <img src={assets.pic4} alt="Media 4" />
          <img src={assets.pic1} alt="Media 5" />
          <img src={assets.pic2} alt="Media 6" />
        </div>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default RightSidebar;
