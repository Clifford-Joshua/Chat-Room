import styled from "styled-components";
import { type ChangeEvent } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../../Store";

import { setSearchFilter } from "../../../../Feature/userSlice";

const SearchBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchFilter } = useSelector((store: RootState) => store.user);
  return (
    <Wrapper>
      <div className="px-[0.6rem] md:px-4">
        <div className="flex items-center justify-between px-4 h-[7vh] bg-gray-900 rounded-[23px] md:rounded-[40px] overflow-hidden text-gray-500">
          <div className="text-[1.3rem] md:text-[1.5rem]">
            <FaSearch />
          </div>

          <input
            type="text"
            placeholder="Search for chat...."
            name="search"
            id="search"
            value={searchFilter}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              dispatch(setSearchFilter(e.target.value));
            }}
            className="text-[1.1rem] md:text-[1.3rem] w-[90%]  md:w-[93%] border-none outline-none h-full focus:text-white"
          />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default SearchBar;
