import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";

const Sidebar = () => {
  return (
    <Wrapper>
      <div>
        <BsThreeDotsVertical className="text-[1.5rem] md:text-[1.9rem]" />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Sidebar;
