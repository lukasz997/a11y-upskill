import styled from "@emotion/styled";

export const Form = styled.form`
  padding-top: 32px;
  display: grid;
  gap: 16px;
  grid-auto-flow: row;
  max-width: 600px;
  margin: auto;
`;

Form.defaultProps = { noValidate: true };
