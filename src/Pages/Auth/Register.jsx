import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const RegisterPage = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.email = data.email.toLowerCase().trim();
    data.number = data.number.trim();
    data.password = data.password.trim();
    data.role = "User";
    data.balance = 40;

    try {
      const response = await axiosPublic.post("/api/auth/register", data);
      if (response.status === 201) {
        toast.success("Registration successful!");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message || "Registration failed");
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Register
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              {...register("username", {
                required: "Username is required",
                minLength: { value: 3, message: "Minimum length is 3" },
                maxLength: { value: 20, message: "Maximum length is 20" },
                validate: (value) =>
                  !/\s/.test(value) || "Username cannot contain spaces",
              })}
              className="input input-bordered w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Invalid email address",
                },
                setValueAs: (value) => value.toLowerCase().trim(),
                validate: (value) =>
                  !/\s/.test(value) || "Email cannot contain spaces",
              })}
              className="input input-bordered w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              {...register("number", {
                required: "Phone number is required",
                minLength: { value: 11, message: "Minimum length is 11" },
                maxLength: { value: 14, message: "Maximum length is 14" },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Only numbers are allowed",
                },
                validate: (value) =>
                  !/\s/.test(value) || "Phone number cannot contain spaces",
                setValueAs: (value) => value.trim(),
              })}
              className="input input-bordered w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.number && (
              <p className="text-red-500 text-sm mt-1">
                {errors.number.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">
              Password (5-digit PIN)
            </label>
            <input
              type="password"
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
              className="input input-bordered w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="btn btn-primary w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
