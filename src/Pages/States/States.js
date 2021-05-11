import React, { useCallback, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';

import Header from '../../components/Header';
import Search from '../../components/Search';
import Footer from '../../components/Footer';
import Spinner from '../../components/Spinner';
import Cities from '../Cities';

import { CardData } from '../../Utils/CardData';
import { Message } from '../../Utils/Message';

const States = () => {
  const [spinner, setSpinner] = useState(true);
  const [states, setStates] = useState([]);
  const [filteredstates, setFilteredStates] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [state, setState] = useState(null);

  useEffect(() => {
    const data = new FormData();
    data.append('key', `${process.env.REACT_APP_API_KEY}`);
    axios
      .post(`${process.env.REACT_APP_API_URL}`, data)
      .then(({ data = [] }) => {
        setStates(data || []);
        setFilteredStates(data || []);
        setSpinner(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (states.length) {
      const filteredItems = states.filter(
        ({ state = '' }) => state.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
      );
      setFilteredStates(filteredItems);
    }
  }, [searchText]);

  const renderCards = useCallback(() => {
    if (filteredstates.length) {
      return (
        <Row>
          {filteredstates.map((el) => (
            <CardData data={el.state} onClick={() => setState(el.state)} />
          ))}
        </Row>
      );
    } else {
      return <Message msg={searchText} />;
    }
  }, [filteredstates]);

  if (state) {
    return <Cities state={state} backClick={() => setState(null)} />;
  }

  return (
    <Container>
      <StyledRow>
        <Col sm={12}>
          <Header>
            <p>Welcome to COVID jaankari</p>
            <h2>Select your State</h2>
          </Header>
          <Search
            placeholder='Search State'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            autoFocus
          />
          {spinner && <Spinner />}
          {!spinner && renderCards()}
          <Footer />
        </Col>
      </StyledRow>
    </Container>
  );
};

export default States;

const StyledRow = styled(Row)`
  display: block;
  width: 100%;
  margin: auto;
  padding: 15px 0;
`;
