import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';

import Card from '../../components/Card/Card';
import Header from '../../components/Header';
import Search from '../../components/Search';
import Contacts from '../Contacts';
import Delhi from '../../asserts/Delhi.svg';
import Footer from '../../components/Footer';
import axios from 'axios';

const Cities = ({ backClick, category }) => {
  const [city, setCity] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [cities, setCities] = useState([]);
  const filteredcities = cities.filter(
    (el) => el.city.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
  );

  const fetchCities = () => {
    const data = new FormData();
    data.append('key', `${process.env.REACT_APP_API_KEY}`);
    data.append('Category', `${category.facility}`);

    axios
      .post(`${process.env.REACT_APP_API_URL}`, data)
      .then(({ data = [] }) => {
        setCities(data || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const renderCards = (el) => (
    <ColStyle key={el.city} xs={6} sm={3}>
      <Card onClick={() => setCity(el.city)}>
        <Image src={Delhi} alt='city picture' />
        <p>{el.city}</p>
      </Card>
    </ColStyle>
  );

  if (city) {
    return (
      <Contacts
        category={category}
        selectedCity={city}
        backClick={() => setCity(null)}
      />
    );
  }

  return (
    <Container>
      <StyledRow>
        <Col sm={12}>
          <Header isBackClick={backClick}>
            <p>You need "{category.facility}"</p>
            <h2>In which City?</h2>
          </Header>
          <Search
            placeholder='Search city'
            onChange={(e) => setSearchText(e.target.value)}
            autoFocus
          />
          {filteredcities.length ? (
            <Row>{filteredcities.map((el) => renderCards(el))}</Row>
          ) : (
            <Nomatch>
              no matches for
              <strong>"{searchText}"</strong>
            </Nomatch>
          )}
          <Footer />
        </Col>
      </StyledRow>
    </Container>
  );
};

export default Cities;

const Nomatch = styled.div`
  margin: 1rem;
  & strong {
    font-size: 1.5rem;
  }
`;

const ColStyle = styled(Col)`
  text-align: center;
`;

const StyledRow = styled(Row)`
  display: block;
  width: 100%;
  margin: auto;
  padding: 15px 0;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 0.5rem;
`;
