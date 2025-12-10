import Title from "./Title";
import { toast } from "react-toastify";
import styled from "styled-components";
import { FaEye } from "react-icons/fa6";
import axios, { AxiosError } from "axios";
import { GoEyeClosed } from "react-icons/go";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

// ========================================================================

//import API url from .env
const API_URL = import.meta.env.VITE_API_URL;
// ========================================================================

const Form = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [userImage, setUserImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [userInfo, setUserInfo] = useState<{
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({ username: "", email: "", password: "", confirmPassword: "" });

  const handleOnchange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;

    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const uploadImage = async (e: FormEvent) => {
    const target = e.target as HTMLInputElement;

    if (!target.files) {
      toast.error("image is null");
      return;
    }

    const imageFile = target.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post(`${API_URL}/auth/upload`, formData);

      const { userImage } = response.data;

      setUserImage(userImage);
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      // ✅ Error handling
      console.log(error.response);
      if (error.response) {
        toast.error(error.response.data.message || "No file uploaded");
      } else if (error.request) {
        toast.error("No response from server. Please try again.");
      } else {
        toast.error("Network error. Please try again.");
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      userInfo.username === "" ||
      userInfo.email === "" ||
      userInfo.password === "" ||
      userInfo.confirmPassword === ""
    ) {
      toast.error("Please provide all values");
      return;
    }

    if (userInfo.password !== userInfo.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/auth/register`,
        {
          username: userInfo.username,
          email: userInfo.email,
          password: userInfo.password,
          userImage,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = response.data;
      toast.success(data.msg);

      setUserInfo({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/login");
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      // ✅ Error handling
      console.log(error.response);
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
          onSubmit={handleSubmit}
          className="w-full md:w-[70%] flex flex-col gap-[1.2rem]"
        >
          {/* =========================================================================== */}
          {/* username */}
          <div className="flex flex-col gap-2">
            <label htmlFor="taskName" className="font-bold capitalize">
              username :
            </label>
            <div className="bg-gray-200 border-gray-200  rounded-[10px] overflow-hidden">
              <input
                type="text"
                name="username"
                value={userInfo.username}
                onChange={handleOnchange}
                className="focus:outline-hidden p-[0.6rem]  text-black w-full"
              />
            </div>
          </div>

          {/* =========================================================================== */}
          {/* email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="taskName" className="font-bold capitalize">
              Email:
            </label>
            <div className="flex items-center  bg-gray-200 rounded-[10px] overflow-hidden border-gray-200">
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleOnchange}
                placeholder="email@gmail.com"
                className="focus:outline-none  p-[0.6rem] w-full text-black"
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
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleOnchange}
                value={userInfo.password}
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
          {/*confirm password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="taskName" className="font-bold capitalize">
              Confirm password:
            </label>
            <div className="flex items-center  bg-gray-200 rounded-[10px] overflow-hidden border-gray-200">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                onChange={handleOnchange}
                value={userInfo.confirmPassword}
                className="focus:outline-none  p-[0.6rem] w-[90%] text-black"
              />

              {showConfirmPassword ? (
                <FaEye
                  className="text-gray-600 text-[1.3rem] cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              ) : (
                <GoEyeClosed
                  className="text-gray-600 text-[1.3rem] cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              )}
            </div>
          </div>

          {/* =========================================================================== */}
          {/*confirm password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="taskName" className="font-bold capitalize">
              Profile Picture:
            </label>
            <div className="flex items-center  bg-gray-200 rounded-[10px] overflow-hidden border-gray-200">
              <input
                type="file"
                name="confirmPassword"
                onChange={uploadImage}
                className="focus:outline-none  p-[0.6rem] w-[90%] text-black"
              />
            </div>
          </div>

          {/* =========================================================================== */}
          {/*submit btn */}
          <button
            className="border py-2 mt-4 font-bold text-4 rounded-[5px] bg-blue-600 text-white hover:bg-blue-700 cursor-pointer transition duration-300 ease-in-out capitalize"
            type="submit"
          >
            {isLoading ? "Registering new user.........." : "Sign Up"}
          </button>

          {/* =========================================================================== */}
          {/*create account*/}
          <div className="text-center mt-4">
            <p className="text-gray-600">Already have an account ? </p>
            <Link to={"/login"} className="text-blue-600 font-bold">
              Login
            </Link>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Form;
