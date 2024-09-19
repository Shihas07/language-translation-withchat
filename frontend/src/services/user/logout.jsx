import axiosInstance from "../../utilities/AxiosInstance";

const logout = async (id) => {
  try {
    const response = await axiosInstance.post(
      "/logout",
      { id },
      {
        headers: {
          "Content-Type": "application/json",
          // Add any other headers if needed, like Authorization
        },
        withCredentials: true, // Ensures cookies are sent and cleared properly
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return error.response;
  }
};

export default logout;
