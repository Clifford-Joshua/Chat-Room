import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../../Store";
import { showActiveRoom } from "../../../../../Feature/userSlice";

const Nav = () => {
  const { chatUserName, chatUserImage } = useSelector(
    (store: RootState) => store.user
  );
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Wrapper className="bg-black">
      <div className="flex p-2 gap-[0.6rem] items-center justify-between lg:p-[0.6rem]">
        <div
          className="text-[1.2rem] md:text-[1.5rem] cursor-pointer"
          onClick={() => dispatch(showActiveRoom())}
        >
          <FaArrowLeft />
        </div>
        <div className="w-[90%] flex gap-[0.6rem]">
          <div className="w-10 h-10 md:w-[70px] md:h-[70px] bg-amber-800 rounded-full flex items-center justify-center overflow-hidden text-white font-bold text-[1.5rem] md:text-[2.5rem]">
            {chatUserImage ? (
              <img
                src={chatUserImage}
                alt={chatUserName}
                className="object-cover w-full h-full"
              />
            ) : (
              <h2>U</h2>
            )}
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-[0.8em] md:text-[1.1rem] font-bold">
              {chatUserName ? chatUserName : "Username"}
            </h2>
          </div>
        </div>
        <div className="text-[1.3rem] md:text-[1.6rem]">
          <BsThreeDotsVertical />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Nav;
