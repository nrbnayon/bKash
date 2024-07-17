import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/Reducers/User/userSlice";

const axiosSecure = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use((req) => {
      return req;
    });

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      async (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          dispatch(logout());
          navigate("/login");
          toast.warn("Unauthorized Action");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [dispatch, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
