import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import Header from '../../components/Header';
import Tabs from '../../components/Tabs/Tabs';
import Footer from '../../components/Footer';

const Contacts = ({ backClick, state = '', city = '', category = {} } = {}) => {
  const [contactList, setContactList] = useState([]);

  // const fetchfromGoogleSheets = () => {
  //   axios
  //     .post('https://covidjaankari.herokuapp.com/categorySearch/', {
  //       key: 'a995168c-ff0d-454d-bdc5-5f0e669c169b',
  //       City: 'Jaipur',
  //       Category: 'Homecare & Nursing'
  //     })
  //     .then((res) => {
  //       console.log('.then ~ res', res);
  //       const { data: { feed: { entry = [] } = {} } = {} } = res;
  //       const formattedList =
  //         entry.length &&
  //         entry.map((el) => ({
  //           center: el.gsx$vamanpharmapvtltddirectsuppl.$t,
  //           contact: el.gsx$_ciyn3,
  //           updated: new Date(el.updated.$t)
  //         }));
  //       setContactList(formattedList || []);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  const fetchContacts = () => {
    const data = new FormData();
    data.append('key', 'a995168c-ff0d-454d-bdc5-5f0e669c169b');
    data.append('State', `${state}`);
    data.append('City', city);
    data.append('Category', category.facility);

    axios
      .post('https://covidjaankari.herokuapp.com/categorySearch/', data)
      .then(({ data = [] }) => {
        setContactList(data || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <React.Fragment>
      <Container>
        <StyledRow>
          <Col sm={12}>
            <Header isBackClick={backClick}>
              <p>
                {contactList && contactList.length} contacts in <span>{city}</span> for
              </p>
              <h2>{category.facility}</h2>
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
  p > span {
    font-size: 1.2rem;
    font-weight: bold;
    letter-spacing: 0.15rem;
  }
`;
