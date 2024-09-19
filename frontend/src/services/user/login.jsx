import axiosInstance from "../../utilities/AxiosInstance";

const login = async (data) => {
  try {
    // Make the login request, pass data and enable credentials
    const response = await axiosInstance.post("/login", data, {
      withCredentials: true, // This ensures cookies (JWT token) are sent back from the server
    });

    // Log the response and return the response data
    console.log(response.data);
    return response;
     
  } catch (error) {
    // Handle error appropriately
    console.error("Error during login:", error);
    throw error; // You can handle this further in your calling function
  }
};

export default login;
