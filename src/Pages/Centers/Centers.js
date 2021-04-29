import React, { useState } from 'react';
import styled from 'styled-components';

import centerList from './covidCenters.json';
import Search from '../../components/Search';
import Card from '../../components/Card/Card';
import Cities from '../Cities';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { FaChevronRight } from 'react-icons/fa';
import { Col, Container, Row } from 'react-bootstrap';

function Centers() {
  const [center, setCenter] = useState(null);
  const [searchText, setSearchText] = useState('');
  const filteredCenters = centerList.filter(
    (el) => el.centerName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
  );

  const renderCards = (data) => (
    <Card id={data.center} onClick={() => setCenter(data)}>
      <FlexBox>
        <div>
          <h4>{data.centerName}</h4>
          <p>{data.desc}</p>
        </div>
        <RightIcon />
      </FlexBox>
    </Card>
  );

  if (center) {
    return <Cities center={center} backClick={() => setCenter(null)} />;
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
          {filteredCenters.length ? (
            filteredCenters.map((el) => renderCards(el))
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

export default Centers;

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
