import React from 'react';
import styled from 'styled-components';
import Logo from '../../asserts/EdisonJobs_Logo.svg';

const Footer = () => {
  return (
    <FooterWrapper>
      Powered by <Image src={Logo} alt='footer icon' />
      <span>care.in</span>
    </FooterWrapper>
  );
};

export default Footer;

const Image = styled.img`
  height: 2rem;
  position: absolute;
  clip: rect(0px, 63px, 2rem, 0px);
`;

const FooterWrapper = styled.div`
  width: 100%;
  color: blsck;
  text-align: center;
  padding: 0.5rem 0;
  font-weight: bold;
  span {
    display: inline-black;
    margin-left: 75px;
  }
`;
