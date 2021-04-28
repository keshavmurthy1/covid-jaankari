import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import styled from 'styled-components';

const Header = ({ isBackClick, children }) => {
  return (
    <HeaderStyle>
      {isBackClick && <BackIcon onClick={isBackClick} />}
      {children}
    </HeaderStyle>
  );
};

export default Header;

const HeaderStyle = styled.div`
  width: 70%;
  padding: 2rem 0;
`;

const BackIcon = styled(BsArrowLeft)`
  font-size: 2rem;
  margin-bottom: 1rem;
  cursor: pointer;
  &:hover {
    transform: scale(1.01);
    transition: transform 0.5s ease-out;
  }
`;
