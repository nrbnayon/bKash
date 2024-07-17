import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import useAxiosSecure from "./useAxiosSecure";

export const useRole = () => {
  const { currentUser } = useSelector((state) => state.user);
  const axiosSecure = useAxiosSecure();

  const {
    data: role,
    isLoading: roleLoading,
    error,
  } = useQuery({
    queryKey: [currentUser?.user?.email, "role"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/user/getRole");
      return res.data?.role;
    },
    enabled: !!currentUser?.user?.email,
  });

  return { role, roleLoading, error };
};
