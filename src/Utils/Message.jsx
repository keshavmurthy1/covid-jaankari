import styled from 'styled-components';

export const Message = ({ msg = '' } = {}) => {
  if (msg) {
    return (
      <Nomatch>
        no matches for
        <strong>"{msg}"</strong>
      </Nomatch>
    );
  } else {
    return <NoData>No data available</NoData>;
  }
};

const Nomatch = styled.div`
  margin: 1rem;
  & strong {
    font-size: 1.5rem;
  }
`;

const NoData = styled.p`
  padding: 10px;
  text-align: center;
`;
