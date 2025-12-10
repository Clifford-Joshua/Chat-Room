import styled from "styled-components";
import { FaFolderPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./../../../../Store";
import {
  showActiveUserPage,
  setIsActiveUserPage,
} from "../../../../Feature/userSlice";
const ActiveChat = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Wrapper className="absolute bottom-[10%] right-[5%]">
      <div
        className="w-[50px] h-[50px] md:w-[65px] md:h-[65px] bg-orange-700 rounded-[10px] flex items-center justify-center text-[1.4rem] cursor-pointer text-black transition hover:bg-orange-900"
        onClick={() => {
          dispatch(showActiveUserPage());
          dispatch(setIsActiveUserPage(true));
        }}
      >
        <FaFolderPlus />
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div``;

export default ActiveChat;
