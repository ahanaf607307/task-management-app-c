import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Firebase/Authentication/useAuth";


const axiosSecure = axios.create({
    baseURL : `${import.meta.env.VITE_URL}`
})

function useAxiosSecure() {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();

  useEffect(()=> {
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        return Promise.reject(error);
    });
  
  
  
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
       
        if (status === 401 || status === 403) {
            await logoutUser();
            navigate('/login');
        }
        return Promise.reject(error);
    })
  
  } , [logoutUser,navigate])

  return axiosSecure
}

export default useAxiosSecure
