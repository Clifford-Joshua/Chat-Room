import Title from "./Title";
import { toast } from "react-toastify";
import styled from "styled-components";
import { FaEye } from "react-icons/fa6";
import axios, { AxiosError } from "axios";
import { GoEyeClosed } from "react-icons/go";
import { socket } from "../../../components/socket";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

//import API url from .env
const API_URL = import.meta.env.VITE_API_URL;
// ========================================================================

const Form = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });

  const handleOnChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;

    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!userDetails.email || !userDetails.password) {
      toast.error("Please provide all values");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/auth/login`, userDetails, {
        headers: { "Content-Type": "application/json" },
      });

      const {
        msg,
        token,
        user: { username, email, userId },
      } = response.data;

      // ✅ Handle "remember me"
      if (rememberMe) {
        localStorage.setItem("user", "true");
      } else {
        localStorage.setItem("user", "false");
      }

      sessionStorage.setItem("user", "true");

      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      localStorage.setItem("userId", userId);
      toast.success(msg || "Login successful");
      localStorage.setItem("username", username);

      // ====================================================================
      // set connection to socket server after login
      socket.auth = { token };
      socket.connect();

      socket.on("connect_error", (err) => {
        console.error("❌ Socket connection error:", err.message);
        return;
      });

      // ====================================================================

      // Reset form
      setUserDetails({
        email: "",
        password: "",
      });

      // =====================================
      // navigate to chat room after successful login
      navigate("/");
      // =====================================
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      // ✅ Error handling
      if (error.response) {
        toast.error(error.response.data.message || "Invalid credentials");
      } else if (error.request) {
        toast.error("No response from server. Please try again.");
      } else {
        toast.error("Network error. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper className="w-full lg:w-[50%] py-8 ">
      <div className="h-full w-full  flex flex-col justify-center items-center gap-4 px-4">
        <Title />

        <form
          className="w-full md:w-[70%] flex flex-col gap-[1.2rem]"
          onSubmit={handleSubmit}
        >
          {/* =========================================================================== */}
          {/* username */}
          <div className="flex flex-col gap-2">
            <label htmlFor="taskName" className="font-bold capitalize">
              email :
            </label>
            <div className="bg-gray-200 border-gray-200  rounded-[10px] overflow-hidden">
              <input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleOnChange}
                className="focus:outline-hidden p-[0.6rem]  text-black w-full"
              />
            </div>
          </div>

          {/* =========================================================================== */}
          {/* password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="taskName" className="font-bold capitalize">
              password:
            </label>
            <div className="flex items-center  bg-gray-200 rounded-[10px] overflow-hidden border-gray-200">
              <input
                type={`${showPassword ? "text" : "password"}`}
                name="password"
                value={userDetails.password}
                onChange={handleOnChange}
                className="focus:outline-none  p-[0.6rem] w-[90%] text-black"
              />
              {showPassword ? (
                <FaEye
                  className="text-gray-600 text-[1.3rem] cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <GoEyeClosed
                  className="text-gray-600 text-[1.3rem] cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
          </div>

          {/* =========================================================================== */}
          {/*Remember me */}
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="size-[1.2rem] accent-black"
                onClick={(e) => {
                  const target = e.target as HTMLInputElement;

                  setRememberMe(target.checked);
                }}
              />
              <h3 className="font-bold cursor-pointer">Remember me</h3>
            </div>

            <Link to={"/forgotten-password"} className="hover:text-gray-500 ">
              Forgotten Password ?
            </Link>
          </div>

          {/* =========================================================================== */}
          {/*submit btn */}
          <button
            className="border py-2 mt-4 font-bold text-4 rounded-[5px] bg-blue-600 text-white hover:bg-blue-700 cursor-pointer transition duration-300 ease-in-out capitalize"
            type="submit"
          >
            {isLoading ? "Loading............." : "Login"}
          </button>

          {/* =========================================================================== */}
          {/*create account*/}
          <div className="text-center mt-4">
            <p className="text-gray-600">Don't have an account ? </p>
            <Link to={"/signup"} className="text-blue-600 font-bold">
              Create account
            </Link>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Form;
