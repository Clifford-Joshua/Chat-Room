import styled from "styled-components";
import { toast } from "react-toastify";
import { BsThreeDotsVertical } from "react-icons/bs";
const SideBar = () => {
  return (
    <Wrapper>
      <div>
        <div
          className="text-[1.5rem] md:text-[1.65rem] transition duration-300 hover:text-gray-500
         cursor-pointer"
          onClick={() => toast.success("coming soon")}
        >
          <BsThreeDotsVertical />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default SideBar;
