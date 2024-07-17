import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../Redux/Reducers/User/userSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    dispatch(signInStart());
    const value = data.identifier.trim();
    if (value.includes("@")) {
      data.email = value.toLowerCase();
      data.number = undefined;
    } else {
      data.number = value;
      data.email = undefined;
    }
    data.password = data.password.trim();

    try {
      const response = await axiosPublic.post("/api/auth/signin", data);
      if (response.status === 200) {
        toast.success("Login successful!");
        dispatch(signInSuccess(response.data));
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message || "Login failed");
      dispatch(signInFailure(error.response.data.message || "Login failed"));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-pink-500 to-red-600">
      <div className="w-full max-w-xl p-8 space-y-8 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          bKash Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">
              Email or Phone Number
            </label>
            <input
              type="text"
              placeholder="Enter email or number"
              {...register("identifier", {
                required: "Email or phone number is required",
                validate: (value) => {
                  const trimmedValue = value.trim();
                  if (trimmedValue.includes("@")) {
                    return (
                      /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/.test(trimmedValue) ||
                      "Invalid email address"
                    );
                  } else {
                    return (
                      (/^[0-9]+$/.test(trimmedValue) &&
                        trimmedValue.length === 11) ||
                      "Invalid phone number"
                    );
                  }
                },
              })}
              className="input input-bordered w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {errors.identifier && (
              <p className="text-red-500 text-sm mt-1">
                {errors.identifier.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">
              Password (5-digit PIN)
            </label>
            <input
              type="password"
              placeholder="*****"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Password must be exactly 5 digits",
                },
                maxLength: {
                  value: 5,
                  message: "Password must be exactly 5 digits",
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Only numbers are allowed",
                },
                validate: (value) =>
                  !/\s/.test(value) || "Password cannot contain spaces",
                setValueAs: (value) => value.trim(),
              })}
              className="input input-bordered w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary w-full py-2 px-4 bg-pink-600 text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              disabled={loading} // Disable button when loading
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
