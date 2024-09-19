
import axiosInstance from "../../utilities/AxiosInstance";

 const profile=async(data)=>{
     const response=await axiosInstance.post("profile",data)
 }
 export default profile 