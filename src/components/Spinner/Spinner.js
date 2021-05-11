import styled from 'styled-components';

const Loader = () => {
  return (
    <Spinner>
      <span>Loading...</span>
    </Spinner>
  );
};

export default Loader;

const Spinner = styled.div`
  padding: 10px;
  text-align: center;
`;
