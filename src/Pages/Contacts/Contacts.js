import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import Header from '../../components/Header';
import Tabs from '../../components/Tabs/Tabs';
import Footer from '../../components/Footer';

const Contacts = ({ backClick, center, selectedCity }) => {
  const [contactList, setContactList] = useState([]);
  useEffect(() => {
    axios
      .get(
        'https://spreadsheets.google.com/feeds/list/1CrkdbTO6y_n6IDfK0Q12qZOF8_b-3WUq7NgjB1NpoHg/od6/public/values?alt=json'
      )
      .then((res) => {
        const { data: { feed: { entry = [] } = {} } = {} } = res;
        const formattedList =
          entry.length &&
          entry.map((el) => ({
            center: el.gsx$vamanpharmapvtltddirectsuppl.$t,
            contact: el.gsx$_ciyn3,
            updated: new Date(el.updated.$t)
          }));
        setContactList(formattedList || []);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <React.Fragment>
      <Container>
        <StyledRow>
          <Col sm={12}>
            <Header isBackClick={backClick}>
              <p>
                {contactList && contactList.length} contacts in{' '}
                {selectedCity.city} for
              </p>
              <h2>{center.centerName}</h2>
            </Header>
          </Col>
        </StyledRow>
      </Container>
      <Tabs contactList={contactList} />
      <Footer />
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
