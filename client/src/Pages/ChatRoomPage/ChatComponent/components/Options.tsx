import styled from "styled-components";
import { FaPlus } from "react-icons/fa";
import type { RootState } from "../../../../Store";
import { useDispatch, useSelector } from "react-redux";
import { setCreateGroup, setOpenGroup } from "../../../../Feature/userSlice";

const Options = () => {
  const dispatch = useDispatch();
  const { privateChat, isGroupActive } = useSelector(
    (store: RootState) => store.user
  );

  return (
    <Wrapper>
      <div className="flex gap-2 md:gap-4 items-center h-[9vh] px-[0.7rem] md:px-4">
        <h2
          className={`text-[0.95rem] md:text-[1rem] ${
            privateChat && "bg-orange-700 text-white"
          }  font-bold   shadow shadow-gray-200  px-4 py-[0.3rem] rounded-[15px] border-gray-400 transition duration-300  cursor-pointer`}
          onClick={() =>
            dispatch(
              setOpenGroup({
                private: true,
                group: false,
              })
            )
          }
        >
          Private
        </h2>
        <h2
          className={`text-[0.95rem] md:text-[1rem] ${
            isGroupActive && "bg-orange-700 text-white"
          }  text-gray-400 font-bold  shadow shadow-gray-200  px-4 py-[0.3rem] rounded-[15px] border-gray-400 transition duration-300  cursor-pointer`}
          onClick={() =>
            dispatch(
              setOpenGroup({
                private: false,
                group: true,
              })
            )
          }
        >
          Groups
        </h2>
        <div
          className="text-[0.95rem] md:text-[1rem] text-gray-400 font-bold  shadow shadow-gray-200  p-[0.8rem]  rounded-full border-gray-400 transition duration-300  cursor-pointer"
          onClick={() => dispatch(setCreateGroup())}
        >
          <FaPlus />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Options;
