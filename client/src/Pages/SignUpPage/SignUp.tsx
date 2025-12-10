import styled from "styled-components";
import { Background, Form } from "./components";
const SignUp = () => {
  return (
    <Wrapper>
      <div className="flex min-h-screen">
        <Background />
        <Form />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default SignUp;
