import React, { useCallback, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';

import Header from '../../components/Header';
import Search from '../../components/Search';
import Footer from '../../components/Footer';
import Spinner from '../../components/Spinner';
import Categories from '../Categories';

import { CardData } from '../../Utils/CardData';
import { Message } from '../../Utils/Message';

const Cities = ({ backClick, state = '' }) => {
  const [spinner, setSpinner] = useState(true);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [city, setCity] = useState(null);

  useEffect(() => {
    const data = new FormData();
    data.append('key', `${process.env.REACT_APP_API_KEY}`);
    data.append('State', `${state}`);

    axios
      .post(`${process.env.REACT_APP_API_URL}`, data)
      .then(({ data = [] }) => {
        setCities(data || []);
        setFilteredCities(data || []);
        setSpinner(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (cities.length) {
      const filteredItems = cities.filter(
        ({ city = '' }) => city.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
      );
      setFilteredCities(filteredItems);
    }
  }, [searchText]);

  const renderCards = useCallback(() => {
    if (filteredCities.length) {
      return (
        <Row>
          {filteredCities.map(({ city = '' }) => (
            <CardData data={city} onClick={() => setCity(city)} />
          ))}
        </Row>
      );
    } else {
      return <Message msg={searchText} />;
    }
  }, [filteredCities]);

  if (city) {
    return <Categories state={state} city={city} backClick={() => setCity(null)} />;
  }

  return (
    <Container>
      <StyledRow>
        <Col sm={12}>
          <Header isBackClick={backClick}>
            <h2>which city in {state}?</h2>
          </Header>
          <Search placeholder='Search city' onChange={(e) => setSearchText(e.target.value)} autoFocus />
          {spinner && <Spinner />}
          {!spinner && renderCards()}
          <Footer />
        </Col>
      </StyledRow>
    </Container>
  );
};

export default Cities;

const StyledRow = styled(Row)`
  display: block;
  width: 100%;
  margin: auto;
  padding: 15px 0;
`;
