import styled from "styled-components";
const Title = () => {
  return (
    <Wrapper>
      <div>
        <h3 className="text-[0.95rem] md:text-[1.05rem] text-gray-400">
          Active users on ChatRoom
        </h3>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Title;
