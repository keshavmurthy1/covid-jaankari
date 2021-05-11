import styled from 'styled-components';
import { Col } from 'react-bootstrap';

import Delhi from '../asserts/Delhi.svg';
import Card from '../components/Card';

export const CardData = ({ data = '', ...rest } = {}) => (
  <ColStyle key={data} xs={6} sm={3}>
    <Card {...rest}>
      <Image src={Delhi} alt='city picture' />
      <p>{data}</p>
    </Card>
  </ColStyle>
);

const ColStyle = styled(Col)`
  text-align: center;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 0.5rem;
`;
