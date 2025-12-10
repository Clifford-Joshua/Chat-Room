import SideBar from "./SideBar";
import styled from "styled-components";
const Nav = () => {
  return (
    <Wrapper>
      <div className="flex items-center justify-between p-[0.7rem] md:px-4 h-[8vh]">
        <h2
          className="text-[1.4rem] md:text-[1.75rem] font-bold transition duration-300 hover:text-gray-500
         cursor-pointer"
        >
          ChatRoom
        </h2>
        <SideBar />
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div``;

export default Nav;
