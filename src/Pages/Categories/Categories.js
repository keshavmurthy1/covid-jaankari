import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Search from '../../components/Search';
import Card from '../../components/Card/Card';
import Cities from '../Cities';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Spinner from '../../components/Spinner';
import Contacts from '../Contacts';

import { FaChevronRight } from 'react-icons/fa';
import { Col, Container, Row } from 'react-bootstrap';
import { Message } from '../../Utils/Message';

function Categories({ backClick, state = '', city = '' } = {}) {
  const [spinner, setSpinner] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  const [category, setCategory] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const data = new FormData();
    data.append('key', `${process.env.REACT_APP_API_KEY}`);
    data.append('State', `${state}`);
    data.append('City', `${city}`);

    setSpinner(true);

    axios
      .post(`${process.env.REACT_APP_API_URL}`, data)
      .then(({ data = [] }) => {
        setCategories(data || []);
        setFilteredCategories(data || []);
        setSpinner(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (categories.length) {
      const filteredItems = categories.filter(
        ({ facility = '' }) => facility.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
      );
      setFilteredCategories(filteredItems);
    }
  }, [searchText]);

  const renderCardData = (category = {}) => (
    <Card key={category.facility} onClick={() => setCategory(category)}>
      <FlexBox>
        <div>
          <h4>{category.facility}</h4>
          <p>{category.description}</p>
        </div>
        <RightIcon />
      </FlexBox>
    </Card>
  );

  const renderCards = useCallback(() => {
    if (filteredCategories.length) {
      return filteredCategories.map((el) => renderCardData(el));
    } else {
      return <Message msg={searchText} />;
    }
  }, [filteredCategories]);

  if (category) {
    return <Contacts state={state} city={city} category={category} backClick={() => setCategory(null)} />;
  }

  return (
    <Container>
      <StyledRow>
        <Col sm={12}>
          <Header isBackClick={backClick}>
            <p>Select any COVID jaankari</p>
            <h2>What are you looking for?</h2>
          </Header>
          <Search placeholder='Search Service' onChange={(e) => setSearchText(e.target.value)} autoFocus />
          {spinner && <Spinner />}
          {!spinner && renderCards()}
          <Footer />
        </Col>
      </StyledRow>
    </Container>
  );
}

export default Categories;

const RightIcon = styled(FaChevronRight)`
  display: block;
  font-size: 1rem;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Nomatch = styled.div`
  margin: 1rem;
  & strong {
    font-size: 1.5rem;
  }
`;

const StyledRow = styled(Row)`
  display: block;
  width: 100%;
  margin: auto;
  padding: 15px 0;
`;
