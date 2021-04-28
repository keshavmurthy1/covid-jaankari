import React from 'react';
import styled from 'styled-components';

import { FaSearch } from 'react-icons/fa';

const Search = (props) => {
  return (
    <InputWrapper>
      <SearchIcon />
      <Input {...props} />
    </InputWrapper>
  );
};

export default Search;

const InputWrapper = styled.div`
  background: #fff;
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid grey;
  padding: 0.5rem 1rem;
  border-radius: 25px;
`;

const Input = styled.input`
  display: block;
  width: 90%;
  border: none !important;
  outline: none !important;&:
  box-shadow: none;
`;

const SearchIcon = styled(FaSearch)`
  display: block;
  font-size: 1rem;
  margin-right: 1rem;
  color: grey;
`;
