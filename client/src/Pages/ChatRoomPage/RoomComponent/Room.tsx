import styled from "styled-components";
import { useSelector } from "react-redux";
import Private from "./PrivateRoom/Private";
import Group from "./GroupRoom/Group";
import type { RootState } from "../../../Store";

const Room = () => {
  const { activeRoom, privateChat, isGroupActive } = useSelector(
    (store: RootState) => store.user
  );

  return (
    <Wrapper
      className={`w-screen h-screen bg-black absolute top-0 left-0 transition duration-300 transform ${
        activeRoom ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div>
        {privateChat && <Private />}
        {isGroupActive && <Group />}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Room;
