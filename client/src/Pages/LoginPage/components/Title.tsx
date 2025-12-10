import styled from "styled-components";
import chatLogo from "../../../assets/chatRoom.jpg";
const Title = () => {
  return (
    <Wrapper className="w-full md:w-[70%] flex flex-col gap-2 items-center ">
      {/* ================================================================================ */}
      {/* Logo */}
      <div className="flex gap-2 items-center">
        {/* <h2 className="p-[0.4rem] border rounded-[10px] font-extrabold text-white bg-blue-600 text-[0.9rem]">
          TM
        </h2> */}
        <img
          src={chatLogo}
          alt="chat-room-logo"
          className="w-[150px] h-[65px] rounded-2xl"
        />
        {/* <h2 className="font-bold">Chat Room</h2> */}
      </div>

      {/* ======================================================================== */}
      {/* Login */}
      <div className="flex flex-col gap-[0.3rem] text-center">
        <h2 className="font-bold text-[1.6rem]">Log in to your Account</h2>
        <p className="text-gray-600">welcome back......................!</p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Title;
