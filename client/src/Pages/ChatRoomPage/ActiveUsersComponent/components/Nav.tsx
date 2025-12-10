import { useState, type ChangeEvent } from "react";
import styled from "styled-components";
import Sidebar from "../../../../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import type { RootState, AppDispatch } from "../../../../Store";

import {
  setSearchFilter,
  showActiveUserPage,
} from "../../../../Feature/userSlice";

const Nav = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState<boolean>();
  const { searchFilter, totalUsers } = useSelector(
    (store: RootState) => store.user
  );

  return (
    <Wrapper>
      <div className="flex items-center justify-between gap-4 py-[0.6rem] md:py-[0.9rem] relative">
        {/* ============================================================== */}
        {/* icon */}
        <div onClick={() => dispatch(showActiveUserPage())}>
          <FaArrowLeft className="text-[1.3rem] md:text-[1.6rem] cursor-pointer" />
        </div>

        {/* ================================================================ */}
        {/* header */}
        <div className="w-[60%] md:w-[70%] lg:w-[85%] ">
          <h3 className="text-[1.15rem] md:text-[1.3rem]">Select user</h3>
          <p className="text-[0.95rem] md:text-[1rem]">
            {totalUsers === 0
              ? "No active users"
              : totalUsers + " users online"}
          </p>
        </div>

        {/* =================================================================== */}
        {/* search icon */}
        <div
          className="cursor-pointer transition duration-500 hover:text-gray-400"
          onClick={() => setSearch(true)}
        >
          <FaSearch className="text-[1.3rem] md:text-[1.4rem]" />
        </div>

        {/* =================================================================== */}
        {/* search bar */}
        <div
          className={`w-full  h-[65%] bg-gray-800 absolute rounded-full overflow-hidden  items-center justify-between px-4 ${
            search ? "flex" : "hidden"
          }`}
        >
          <div
            onClick={() => {
              setSearch(false);
              dispatch(setSearchFilter(""));
            }}
          >
            <FaArrowLeft className="text-[1.2rem] md:text-[1.5rem] cursor-pointer transition duration-500 hover:text-gray-400 " />
          </div>
          <input
            type="text"
            name="search"
            value={searchFilter}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              dispatch(setSearchFilter(e.target.value));
            }}
            className="w-[90%] h-[90%] md:w-[95%] text-gray-500 focus:text-white outline-none border-none focus"
            placeholder="Search name or email.........."
          />
        </div>

        {/* ================================================================= */}
        {/* sidebar icon (bar icon) */}
        <Sidebar />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Nav;
