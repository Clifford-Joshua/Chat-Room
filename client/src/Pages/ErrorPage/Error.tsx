import styled from "styled-components";
import { Link } from "react-router-dom";
import ErrorImage from "../../assets/undraw_winter-magic_r5xp.svg";
const Error = () => {
  return (
    <Wrapper className=" h-screen bg-slate-200">
      <div
        className=" h-full flex flex-col items-center justify-center gap-8"
        style={{
          background: `url(${ErrorImage}) center/cover no-repeat`,
        }}
      >
        <h1 className="font-bold text-[2rem] md:text-[2.5rem] flex items-center justify-center text-center capitalize">
          {" "}
          404 Page not found
        </h1>
        <Link
          to={"/"}
          className="bg-cyan-500 shadow-lg shadow-cyan-500/50 font-bold py-2 px-4 md:text-[1.2rem] rounded cursor-pointer hover:bg-cyan-300"
        >
          Back home
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Error;
