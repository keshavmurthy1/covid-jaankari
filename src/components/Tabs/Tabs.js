import React, { useState } from 'react';
import { Badge, Tab, Tabs } from 'react-bootstrap';
import styled from 'styled-components';
import Card from '../Card/Card';
import Call from '../../asserts/call.svg';

const MyTabs = ({ contactList = [] }) => {
  const [key, setKey] = useState('contacts');

  const renderTabContent = (passed) => {
    return <TabContent>{`< ${passed} >`}</TabContent>;
  };

  const call = (phoneNumber) => {
    window.open(`tel:${phoneNumber}`);
  };

  const updatedDetails = (el) => {
    var d = new Date(el.time_stamp);
    d.setMinutes(d.getMinutes() - 330);

    return d.toLocaleString();
  };

  return (
    <TabsStyle id='controlled-tab' activeKey={key} onSelect={(k) => setKey(k)}>
      <Tab eventKey='contacts' title='CONTACTS'>
        <TabContent>
          {contactList.length ? (
            contactList.map((el) => (
              <Card>
                <h4>Supplier: {el.supplier_name}</h4>
                <p>
                  <BadgeStyle variant='secondary'>{el.status}</BadgeStyle>{' '}
                  Updated {updatedDetails(el)}
                </p>
                <FlexBox>
                  <div>
                    <h5>Name : {el.person_name}</h5>
                    <h5>Address : {el.address} </h5>
                  </div>
                  <div>
                    <div>
                      <FlexBox>
                        <h6>
                          <strong>{el.phone_number}</strong>
                        </h6>
                        <Image
                          src={Call}
                          alt='call icon'
                          onClick={() => call(el.phone_number)}
                        />
                      </FlexBox>
                    </div>
                    <h5>Website : {el.website}</h5>
                  </div>
                </FlexBox>
                <div>{el.description}</div>
              </Card>
            ))
          ) : (
            <p>No contacts found</p>
          )}
        </TabContent>
      </Tab>
      <Tab eventKey='chat groups' title='CHAT GROUPS'>
        {renderTabContent('CHAT GROUPS')}
      </Tab>
    </TabsStyle>
  );
};

export default MyTabs;

const TabsStyle = styled(Tabs)`
  background: #fff;
  border: none;
  margin: 0;
  padding: 0;
  > .nav-link {
    border: none !important;
    margin: 0 !important;
    color: grey;
    font-weight: bold !important;
    transistion: 1s ease-out;
    position: relative;

    &: hover {
      color: grey;
      opacity: 0.5;
    }

    &.active {
      color: blue;
      &::after {
        position: absolute;
        content: '';
        width: 100%;
        height: 2px;
        left: 0;
        bottom: 0;
        background-color: blue;
      }
    }
  }
`;

const TabContent = styled.div`
  padding: 1rem;
`;

const BadgeStyle = styled(Badge)`
  display: inline-block;
  padding: 0.5rem;
  margin-right: 0.5rem;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Image = styled.img`
  display: block;
`;
