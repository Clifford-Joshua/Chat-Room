import styled from "styled-components";
import { useSelector } from "react-redux";
import type { RootState } from "../../../Store";
import { Nav, Title, Users, Options, UserGroups } from "./components";

const ActiveUsers = () => {
  const { activeUserPage } = useSelector((store: RootState) => store.user);
  return (
    <Wrapper
      className={`w-screen h-screen bg-black absolute top-0 left-0 transition duration-300 transform px-[0.7rem] md:px-4 ${
        activeUserPage ? "translate-x-0 " : "translate-x-full"
      }`}
    >
      <div>
        {/* ========================================================================== */}
        {/* nav */}
        <Nav />

        <div className="flex flex-col gap-4 pb-12 overflow-scroll h-[88vh]">
          {/* ========================================================================== */}
          {/* Options to create new group or user */}
          <Options />

          {/* ========================================================================== */}
          {/* Title*/}
          <Title />

          {/* ========================================================================== */}
          {/* Active users component */}
          <Users />

          {/* ========================================================================== */}
          {/* Active user groups component */}
          <UserGroups />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default ActiveUsers;
