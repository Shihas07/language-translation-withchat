import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Link } from 'react-router-dom';
import ProfileModal from './profileModal';
import { useSelector } from 'react-redux';

export default function Navbar({
  searchQuery,
  setSearchQuery,
  handleSearchClick,
  handleModalOpen, 
  openModal,
  handleModalClose
}) {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <AppBar position="sticky" sx={{ backgroundColor: 'green' }}>
        <Toolbar className="flex flex-col sm:flex-row justify-between">
          <Typography variant="h6" className="text-white mb-2 sm:mb-0">
            Language Exchange
          </Typography>

          <div className="w-full sm:w-auto sm:ml-4 order-1 sm:order-none">
            <TextField
              fullWidth
              placeholder="Search language....."
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                backgroundColor: 'white',
                borderRadius: '5px',
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearchClick}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div className="flex space-x-4 order-2 sm:order-none">
            <Link to="/">
              <IconButton className="text-white">
                <HomeIcon />
              </IconButton>
            </Link>

            <IconButton className="text-white" onClick={handleModalOpen}>
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <div className="w-full h-40 bg-cover bg-center bg-bannerImage sm:h-60 md:h-80">
        <div className="h-full w-full flex items-center justify-center bg-black bg-opacity-40">
          <Typography
            variant="h3"
            className="text-white text-center text-xl sm:text-2xl md:text-4xl"
          >
            Welcome {user.name} to Language Exchange Platform
          </Typography>
        </div>
      </div>

      <ProfileModal open={openModal} handleClose={handleModalClose} />
    </div>
  );
}
