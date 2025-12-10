import styled from "styled-components";
import { Background, Form } from "./components";

const Login = () => {
  return (
    <Wrapper>
      <div className="flex min-h-screen">
        <Form />
        <Background />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Login;
