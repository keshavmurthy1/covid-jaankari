import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Search from '../../components/Search';
import Card from '../../components/Card/Card';
import Cities from '../Cities';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { FaChevronRight } from 'react-icons/fa';
import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import Loader from '../../components/Loader/loader';

function Categories() {
  const [category, setCategory] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [categories, setCategories] = useState([]);
  const [isSpninner, setSpinner] = useState(false);

  const filteredCategories = categories.filter(
    (el) => el.facility.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
  );

  const fetchCategories = () => {
    const data = new FormData();
    data.append('key', `${process.env.REACT_APP_API_KEY}`);

    setSpinner(true)

    axios
      .post(`${process.env.REACT_APP_API_URL}`, data)
      .then(({ data = [] }) => {
        setCategories(data || []);
        setSpinner(false)

      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const renderCards = (category) => (
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

  if (category) {
    return <Cities category={category} backClick={() => setCategory(null)} />;
  }

  return (
    <Container>
      <StyledRow>
        <Col sm={12}>
          <Header>
            <p>Select any COVID jaankari</p>
            <h2>What are you looking for?</h2>
          </Header>
          <Search
            placeholder='Search Service'
            onChange={(e) => setSearchText(e.target.value)}
            autoFocus
          />
          {
            isSpninner ? <Loader></Loader> :

              filteredCategories.length ? (
                filteredCategories.map((el) => renderCards(el))
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
