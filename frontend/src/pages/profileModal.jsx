import React, { useState } from 'react';
import { Avatar, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import logout from '../services/user/logout';
import localStorage from 'redux-persist/es/storage';
import { logoutAction } from '../redux/slice';
import profile from '../services/user/profileSave';
import { Navigate, useNavigate } from 'react-router-dom';

export default function ProfileModal({ open, handleClose }) {
  const navigate=useNavigate()
  const userId = useSelector((state) => state.user.id);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [language, setLanguage] = useState('');
  const [rating, setRating] = useState('');


  const handleSave = () => {
    // Access the user ID from Redux
    
  
    if (!userId) {
      console.error("User ID is not available");
      return;
    }
  
    // Prepare the data object with name, language, rating, and userId
    const data = { 
    
      language, 
      rating, 
      userId // Include the userId from Redux
    };
    console.log("profileee",data)
  
    try {
      // Call the profile API to save the user profile details
      const response = profile(data);
  
      console.log("Profile saved:", response);
  
      // Optionally close the modal after saving
      handleClose();
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleLogout = async (id) => {

  
    try {
      // Call the API to log out
      const response = await logout(id);
  
      if (response) {

          navigate("/logout")
        console.log("Logout successful", id);
  
        // Dispatch the logout action to clear Redux state
        dispatch(logoutAction());
  
        // Optionally clear persisted state from localStorage (if using redux-persist)
        localStorage.removeItem('persist:root'); // This depends on how you have set up redux-persist
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <Box display="flex" justifyContent="center" mb={2}>
          {/* Avatar */}
          <Avatar alt="User Avatar" src="/profile-pic.jpg" sx={{ width: 100, height: 100 }} />
        </Box>

        {/* Input Fields */}
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          value={user.name}
          onChange={(e) => setName(e.target.value)}
          margin="dense"
        />

        <TextField
          fullWidth
          label="Language to Learn"
          variant="outlined"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          margin="dense"
        />

        {/* Dropdown for Rating */}
        <TextField
          fullWidth
          select
          label="Current Rating"
          variant="outlined"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          margin="dense"
        >
          <MenuItem value="Beginner">Beginner</MenuItem>
          <MenuItem value="Intermediate">Intermediate</MenuItem>
          <MenuItem value="Advanced">Advanced</MenuItem>
        </TextField>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
        <Button onClick={()=>handleLogout(user.id) } variant="outlined" color="secondary">
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
}
