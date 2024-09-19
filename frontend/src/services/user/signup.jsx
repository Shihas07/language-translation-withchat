
import axiosInstance from "../../utilities/AxiosInstance";

const signup=async(data)=>{
   const response=await axiosInstance.post("/signup",data)

    
}

 export default signup;