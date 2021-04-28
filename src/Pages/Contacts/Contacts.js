import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import Header from '../../components/Header';
import Tabs from '../../components/Tabs/Tabs';

const Contacts = ({ backClick, center, selectedCity }) => {
  return (
    <React.Fragment>
      <Container>
        <StyledRow>
          <Col sm={12}>
            <Header isBackClick={backClick}>
              <p>
                {`<count>`} contacts in {selectedCity.city} for
              </p>
              <h2>{center.centerName}</h2>
            </Header>
          </Col>
        </StyledRow>
      </Container>
      <Tabs />
    </React.Fragment>
  );
};

export default Contacts;

const StyledRow = styled(Row)`
  display: block;
  width: 100%;
  margin: auto;
  padding: 15px 0;
`;
