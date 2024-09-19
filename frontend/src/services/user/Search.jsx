import axiosInstance from "../../utilities/AxiosInstance";

const search = async (language) => {
  try {
    // Log the data to check its structure
    console.log("Sending data:", language);
    
    // // Ensure `data` is a plain object or primitive
    // if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    //   throw new Error("Invalid data type for search");
    // }

    const response = await axiosInstance.post("/search",{ language});
    console.log("Search response:", response);

    return response;
  } catch (error) {
    console.error("Error in search function:", error);
    throw error; // Re-throw the error after logging
  }
};

export default search;
