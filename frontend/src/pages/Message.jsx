import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

const socket = io("http://localhost:5000"); // Connect to your backend

const Message = () => {
  const { id } = useParams(); // Receiver ID
  const user = useSelector((state) => state.user); 
  
  const [messages, setMessages] = useState([]); // Messages state
  const [input, setInput] = useState(""); // Input state

  // Function to send message
  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/messages/${user.id}/${id}`
      );
      console.log("response",response)
      setMessages(response.data); // Set messages from API response
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  fetchMessages(); 
  
  useEffect(() => {
    fetchMessages(); // Fetch messages when the component mounts
    socket.emit("joinRoom", id); // Join the room for the conversation

    // Listen for real-time messages
    socket.on("messageReceived", (message) => {

      setMessages((prevMessages) => [...prevMessages, message]); // Add new message to the state
    });

    return () => {
      socket.off("messageReceived"); // Clean up socket listener when component unmounts
    };
  }, [id]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (input.trim()) {
      const messageData = {
        senderId: user.id,
        receiverId: id,
        text: input,
      };
      fetchMessages()

      socket.emit("sendMessage", messageData); // Emit message to socket server
      setInput(""); // Clear the input field after sending
    }
  };

  // Fetch existing messages when the component mounts



  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "90vh",
        width: "40vw",
        margin: "0 auto",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <Box sx={{ padding: "16px", backgroundColor: "green", color: "#fff" }}>
        <Typography variant="h6" align="center">Chat Room</Typography>
      </Box>

      {/* Display the messages */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          padding: "16px",
          backgroundColor: "#f4f6f8",
        }}
      >
        <List>
          {messages.map((message, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={message.senderId === user.id ? "You" : `User ${message.senderId}`}
                secondary={message.message}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider />

      {/* Input box for typing a new message */}
      <Box
        component="form"
        onSubmit={sendMessage}
        sx={{ display: "flex", padding: "8px", alignItems: "center" }}
      >
        <TextField
          fullWidth
          variant="outlined"
          value={input}
          placeholder="Type a message..."
          onChange={(e) => setInput(e.target.value)}
          sx={{ marginRight: "8px" }}
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Message;
