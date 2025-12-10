import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
const SearchBar = () => {
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
            className="text-[1.1rem] md:text-[1.3rem] w-[90%]  md:w-[93%] border-none outline-none h-full focus:text-white"
          />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default SearchBar;
