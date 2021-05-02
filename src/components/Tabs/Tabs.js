import React, { useState } from 'react';
import { Badge, Tab, Tabs } from 'react-bootstrap';
import styled from 'styled-components';
import Card from '../Card/Card';
import Call from '../../asserts/call.svg';

const MyTabs = ({ contactList = [] }) => {
  console.log('MyTabs ~ contactList', contactList);
  const [key, setKey] = useState('contacts');

  const renderTabContent = (passed) => {
    return <TabContent>{`< ${passed} >`}</TabContent>;
  };

  const call = (phoneNumber) => {
    window.open(`tel:${phoneNumber}`);
  };

  return (
    <TabsStyle id='controlled-tab' activeKey={key} onSelect={(k) => setKey(k)}>
      <Tab eventKey='contacts' title='CONTACTS'>
        <TabContent>
          {contactList.length ? (
            contactList.map((el) => (
              <Card>
                <h4>{el.supplier_name}</h4>
                <p>
                  <BadgeStyle variant='secondary'>{el.status}</BadgeStyle>{' '}
                  Updated {new Date(el.time_stamp).toLocaleString()}
                </p>
                <FlexBox>
                  <div>
                    <h5>{el.person_name}</h5>
                    <h6>{el.phone_number}</h6>
                  </div>
                  <Image
                    src={Call}
                    alt='call icon'
                    onClick={() => call(el.phone_number)}
                  />
                </FlexBox>
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
  width: 100%;
`;

const Image = styled.img`
  display: block;
`;
