import styled from "styled-components";

import {
  Nav,
  Options,
  SearchBar,
  ActiveChat,
  RecentMessage,
  GroupRecentMessage,
} from "./components";
import { useSelector } from "react-redux";
import type { RootState } from "../../../Store";

const Chats = () => {
  const { privateChat, isGroupActive } = useSelector(
    (store: RootState) => store.user
  );
  return (
    <Wrapper className="w-screen h-screen overflow-hidden">
      <div className="relative">
        <Nav />
        <SearchBar />
        <Options />

        {privateChat && <RecentMessage />}
        {isGroupActive && <GroupRecentMessage />}

        <ActiveChat />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Chats;
