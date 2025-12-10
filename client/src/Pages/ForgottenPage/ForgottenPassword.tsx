import { Form, Background } from "./component";
import styled from "styled-components";
const ForgottenPassword = () => {
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

export default ForgottenPassword;
