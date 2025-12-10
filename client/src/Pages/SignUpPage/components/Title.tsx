import styled from "styled-components";
import chatLogo from "../../../assets/chatRoom.jpg";
const Title = () => {
  return (
    <Wrapper className="w-full md:w-[70%] flex flex-col gap-2 items-center ">
      {/* ================================================================================ */}
      {/* Logo */}
      <div className="flex gap-2 items-center">
        <img
          src={chatLogo}
          alt="chat-room-logo"
          className="w-[150px] h-[65px] rounded-2xl"
        />
      </div>

      {/* ======================================================================== */}
      {/* Login */}
      <div className="flex flex-col gap-[0.3rem] text-center">
        <h2 className="font-bold text-[1.6rem]">Create A New Account</h2>
        <p className="text-gray-600 text-[0.9rem] md:text-[1rem]">
          Create an account to stay organized, stay focused, and get things done
          — by turning your to-dos into achievements.
        </p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Title;
