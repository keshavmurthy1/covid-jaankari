import React from 'react';
import styled from 'styled-components';

const Card = ({ children, ...rest }) => {
  return <StyledCard {...rest}>{children}</StyledCard>;
};

export default Card;

const StyledCard = styled.div`
  background-color: #fff;
  color: rgba(0, 0, 0, 0.87);
  margin: 1rem 0;
  padding: 1rem 1.5rem;
  font-size: 0.875rem;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  cursor: pointer;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover {
    transform: scale(1.01);
    transition: transform 0.5s ease-out;
  }
`;
