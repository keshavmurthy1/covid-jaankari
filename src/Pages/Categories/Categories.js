import React, { useState } from 'react';
import styled from 'styled-components';

import categories from './Categories.json';
import Search from '../../components/Search';
import Card from '../../components/Card/Card';
import Cities from '../Cities';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { FaChevronRight } from 'react-icons/fa';
import { Col, Container, Row } from 'react-bootstrap';

function Categories() {
  const [category, setCategory] = useState(null);
  const [searchText, setSearchText] = useState('');
  const filteredCategories = categories.filter(
    (el) => el.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
  );

  const renderCards = (category) => (
    <Card key={category.name} onClick={() => setCategory(category)}>
      <FlexBox>
        <div>
          <h4>{category.name}</h4>
          <p>{category.desc}</p>
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
          {filteredCategories.length ? (
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
