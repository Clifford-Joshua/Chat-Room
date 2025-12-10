import styled from "styled-components";
const Title = () => {
  return (
    <Wrapper className="w-full md:w-[70%] flex flex-col gap-2 items-center ">
      {/* ================================================================================ */}
      {/* Logo */}
      <div className="flex gap-2 items-center">
        <h2 className="p-[0.4rem] border rounded-[10px] font-extrabold text-white bg-blue-600 text-[0.9rem]">
          TM
        </h2>
        <h2 className="font-bold">Task Manager</h2>
      </div>

      {/* ======================================================================== */}
      {/* Login */}
      <div className="flex flex-col gap-[0.3rem] text-center">
        <h2 className="font-bold text-[1.6rem]">Input Your Email</h2>
        <p className="text-gray-600">Seems you forgot your password..</p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Title;
