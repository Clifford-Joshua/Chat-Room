import styled from "styled-components";
import { Nav, TextBox, ChatBody } from "./component";
const Private = () => {
  return (
    <Wrapper>
      <div>
        <Nav />
        <ChatBody />
        <TextBox />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Private;
