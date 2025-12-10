import Title from "./Title";
import styled from "styled-components";
import { type FormEvent } from "react";
import { Link } from "react-router-dom";

const Form = () => {
  const handleChange = (e: FormEvent) => {
    console.log(e.target);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
                value=""
                onChange={handleChange}
                className="focus:outline-hidden p-[0.6rem]  text-black w-full"
              />
            </div>
          </div>

          {/* =========================================================================== */}
          {/*submit btn */}
          <button
            className="border py-2 mt-4 font-bold text-[1rem] rounded-[5px] bg-blue-600 text-white hover:bg-blue-700 cursor-pointer transition duration-300 ease-in-out capitalize"
            type="submit"
          >
            Login
          </button>

          {/* =========================================================================== */}
          {/*create account*/}
          <div className="text-center mt-4">
            <p className="text-gray-600">Don't have an account ? </p>
            <Link to={"/signup"} className="text-blue-600 font-bold">
              Create a new account
            </Link>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Form;
