import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "react-toastify";

const Sidebar = () => {
  return (
    <Wrapper>
      <div onClick={() => toast.success("coming soon")}>
        <BsThreeDotsVertical className="text-[1.5rem] md:text-[1.9rem]" />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Sidebar;
