import styled from "styled-components";

export const FooterContainerV = styled.footer`
  display: flex;
  background: green;
  height: 50px;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.secondary};
`;
