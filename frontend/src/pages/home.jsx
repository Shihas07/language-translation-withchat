import React, { useState } from "react";
import { useSelector } from "react-redux";
import search from "../services/user/Search";
import Navbar from "./navabr";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Button,
  Typography,
} from "@mui/material";
import Footer from "./footer";
import DetailsPage from "./body";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const user = useSelector((state) => state.user);
  // const [click,setClick]=useState(false)
  const navigate = useNavigate();

  const handleSearchClick = async () => {
    try {
      const response = await search({ language: searchQuery });
      if (response) {
        setUsers(response.data); // Assuming response.data contains the users
      }
      console.log("Search response:", response);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const Message = (id) => {
    console.log("id", id);

    navigate(`/message/${id}`, { state: { id } });
  };

  return (
    <div>
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearchClick={handleSearchClick}
        handleModalOpen={handleModalOpen}
        openModal={openModal}
        handleModalClose={handleModalClose}
      />

      {/* Display search results */}
      {users.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {users.map((user) => (
            <Card key={user._id} sx={{ maxWidth: 345, mb: 2 }}>
              <CardHeader
                avatar={<Avatar alt={user.name} src={user.avatarUrl} />}
                title={
                  <Typography
                    variant="h6"
                    sx={{ color: "blue", fontWeight: "bold" }}
                  >
                    {user.name}
                  </Typography>
                }
                subheader={user.language}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {user.description || "Hello learner, please connect."}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                color="success"
                sx={{ m: 2 }}
                onClick={() => Message(user._id)}
              >
                Message
              </Button>
            </Card>
          ))}
        </div>
      ) : (
        <DetailsPage />
      )}

      <Footer />
    </div>
  );
}
