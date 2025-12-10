import styled from "styled-components";
import { Link } from "react-router-dom";
import { ImUsers } from "react-icons/im";
import { ImUserPlus } from "react-icons/im";
import { useDispatch } from "react-redux";

import { setCreateGroup } from "../../../../Feature/userSlice";

const Options = () => {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <div className="flex flex-col gap-2">
        <div
          className="flex items-center gap-4 py-2 cursor-pointer group"
          onClick={() => dispatch(setCreateGroup())}
        >
          <div className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-full flex items-center justify-center bg-amber-600 transition duration-500 group-hover:bg-amber-800">
            <ImUsers className="text-[1.35rem]" />
          </div>
          <h2 className="text-[1.1rem] md:text-[1.2rem] font-bold transition duration-500 group-hover:text-gray-400">
            New group
          </h2>
        </div>

        <Link to={"/signup"} className="flex items-center gap-4 py-2 group">
          <div className="w-[50px] h-[50px] md:w-[60px] md:h-[60px]  rounded-full flex items-center justify-center bg-amber-600 transition duration-500 group-hover:bg-amber-800">
            <ImUserPlus className="text-[1.35rem]" />
          </div>
          <h2 className="text-[1.1rem] md:text-[1.2rem] font-bold transition duration-500 group-hover:text-gray-400">
            Create new user
          </h2>
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Options;
