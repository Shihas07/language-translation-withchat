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


const socket = io("http://localhost:5000");

const Message = () => {
  const { id } = useParams(); 
  const user = useSelector((state) => state.user); 

  const [messages, setMessages] = useState([]);
  console.log(messages);
  // Messages state
  const [input, setInput] = useState(""); 
  const [name, setName] = useState(""); // Receiver's name


  // Function to fetch messages
 
  const sendMessage = async (e) => {
    e.preventDefault();

    if (input.trim()) {
      const messageData = {
        senderId: user.id,
        receiverId: id,
        text: input,
      };

      // Emit message to socket server
      socket.emit("sendMessage", messageData);
      await  fetchMessages();

      setInput(""); // Clear the input field after sending

      // Fetch messages immediately after sending to update chat
      
    }
  };
  let fetchMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/messages/${user.id}/${id}`
      );
      setMessages(response.data.messages); // Set messages from API response
      setName(response.data.receiverName); // Set receiver's name
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  fetchMessages();

  useEffect(() => {
    fetchMessages();
    // sendMessage()

    socket.emit("joinRoom", id);

    // Listen for real-time messages
    socket.on("messageReceived", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]); // Add new message to the state
    });

    // Clean up the socket listener when the component unmounts
    return () => {
      socket.off("messageReceived",id);
    };
  }, [ messages,id]);

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
        <Typography variant="h6" align="center">
          Chat with {name}
        </Typography>
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
                primary={message.senderId === user.id ? "You" : `${name}`}
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
