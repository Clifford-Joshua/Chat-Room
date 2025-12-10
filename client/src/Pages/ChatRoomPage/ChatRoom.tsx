import styled from "styled-components";
import { useSelector } from "react-redux";
import Modal from "../../components/Modal";
import type { RootState } from "../../Store";
import { ActiveUsers, Room, Chats } from "./main";

const ChatRoom = () => {
  const { createGroup } = useSelector((state: RootState) => state.user);

  return (
    <Wrapper>
      <div className="flex text-white w-screen h-screen bg-black relative overflow-hidden">
        <div>
          <Chats />
        </div>

        <div>
          <Room />
        </div>

        <div>
          <ActiveUsers />
        </div>

        {createGroup && (
          <div>
            <Modal />
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default ChatRoom;
